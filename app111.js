//imports
import express from 'express';
import bcrypt from 'bcrypt';
import mysql from 'mysql';
import path from 'path';
import url from "url";
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

// Create an Express app
const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false 
}));
app.use(cookieParser());
var Session;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 //Disable browser Cache Memory
 app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'autoauthority.cikjgc7xrldu.ap-south-1.rds.amazonaws.com',
  user: 'admin',
  password: 'adminadmin',
  database: 'AutoAuthority',
});

// Set up the Handlebars view engine
app.set('view engine', 'hbs');

// Parse request bodies as JSON
app.use(express.json());

// Serve static files from the public directory
app.use(express.static('public'));
// Render the index page
app.get("/", (req, res) => {
  res.render("index");
});
app.get('/fine', (req, res) =>{
  res.render('fines', {});
})

app.get("/register",(req,res)=>{
  res.render("register1",{});
})
app.get("/login",(req,res)=>{
  res.render("login1");
});

app.get("/rto_login", (req,res) => {
  res.render("rto_login");
})

app.get("/rto_index", (req,res) =>{
  res.render("rto_index" , {msg: true});
})

//route for vehicle owner to fetch list of his vehicles
app.get('/vehicles', async(req, res) =>{
  if(req.session.loggedin){
    try{
      pool.query('SELECT reg_plate, company, model, color FROM user_vehicle WHERE user_id = ?', [req.session.user], function(err, results){
        if (err) throw err;
        // Render the vehicles view with the results
        res.render('vehicles', {vehicles: results});
      })
    }
    catch(error){
      res.status(500).send(error.message);
    }
  }
  else{
    res.redirect('/');
  }
});

//route for vehicle owner to view all of his pending fines.
app.get('/view_fines', async(req, res)=>{
  if(req.session.loggedin){
    try{
      pool.query('SELECT i.doi, uv.reg_plate, f.offence, f.fine_amount, DATE_FORMAT(i.doi, "%a %b %e %Y %T") AS formatted_doi FROM fines f JOIN impose_fine i ON f.fine_id = i.fine_id JOIN user_vehicle uv ON uv.reg_plate = i.veh_reg_no JOIN user_register ur ON ur.user_id = uv.user_id WHERE ur.user_id = ?', [req.session.user], function(err, result){
        if(err) throw err;
        // Calculate total fine
        let total_fine = 0;
        for(let i = 0; i < result.length; i++) {
          total_fine += result[i].fine_amount;
        }
        res.render('view_fines', { fine: result, total_fine: total_fine });
      })      
    }
    catch(error){
      res.status(500).send(error.message);
    }
  }
  else{
    res.redirect('/');
  }
})

var f_name, l_name, dob, age, gender, formattedDate1, formattedDate2
app.post('/register1', async (req, res) => {
  f_name = req.body.fname
  l_name = req.body.lname
  dob = req.body.dob
  gender = req.body.gender

  //calculating age from dob
  var tempDate = new Date(dob);
  formattedDate2 = [tempDate.getDate(), tempDate.getMonth() + 1, tempDate.getFullYear()].join('/');
  const dobParts = formattedDate2.split("/");
  const dobDay = parseInt(dobParts[0], 10);
  const dobMonth = parseInt(dobParts[1], 10) - 1; // Note: months are 0-indexed in JavaScript
  const dobYear = parseInt(dobParts[2], 10);
  const dobDate = new Date(dobYear, dobMonth, dobDay);

  // Calculate the age in years
  const ageDiffMs = Date.now() - dobDate.getTime();
  const ageDate = new Date(ageDiffMs); // miliseconds from epoch
  age = Math.abs(ageDate.getUTCFullYear() - 1970);
   if(age<18)
   res.render("register1",{msg:true})
   else
  res.render("register2",{});
});

var phone, email, address_p, address_s
app.post('/register2', async (req, res) => {
  phone = req.body.phone
  email = req.body.email
  address_p = req.body.address_p
  address_s = req.body.address_s
  res.render("register3")
});

var user_id, password, c_password, hash
app.post('/register3', async (req, res) => {
  user_id = req.body.userid
  password = req.body.password
  c_password = req.body.cpassword
  if(password === c_password){
    hash = await bcrypt.hash(password, 12)
    const query = 'INSERT INTO user_register (f_name, l_name, dob, age, gender, phone, email, address_p, address_s, user_id, user_pass) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
    pool.query(query, [f_name, l_name, dob, age, gender, phone, email, address_p, address_s, user_id, hash], (error, results, fields) => {
      if (error) {
        console.error('Failed to create user:', error);
        res.status(500).send('Failed to create user');
      } else {
        console.log('User created successfully!');
        res.redirect("/login");
      }
    });
  }
  else{
    console.log('Passwords Do Not Match!');
    res.render("register3",{msg:true});
    return false;
  }
});


var data;
var data2;
var noOfDays;
var displayMarquee;
var expired;

// impose fines route for RTO officer
app.post('/fine', async(req, res) =>{
  if(req.session.loggedin){
    try{
      const vehicle = req.body.regno;
      const fine = req.body.fineid;
      const doi = req.body.doi;

      const query = 'INSERT INTO impose_fine (veh_reg_no, fine_id, doi) VALUES (?,?,?)';

      pool.query(query, [vehicle, fine, doi], (error, results, fields) => {
        if (error) {
          console.error('Failed to Add Fine:', error);
          res.status(500).send('Failed to Add Fine');
        } else {
          console.log('Fine Added Successfully!');
          res.redirect("rto_index");
        }
      })
    }
    catch(error){
      res.status(500).send(error.message);
    }
  }
  else{
    res.redirect('/');
  }  
});

//login route for rto officer
app.post('/rto_login', async(req, res) =>{
  const rto_id = req.body.username;
  const rto_pass = req.body.password;

  // retrieve the password from database for the entered rto_id
  const query = 'SELECT rto_pass FROM rto_login WHERE rto_id = ?';

  pool.query(query, [rto_id], async (error, results, fields) =>{
    if(error){
      console.error('Error while retrieving user password:', error);
      res.status(500).send('Internal Server Error');
    }else{
      if(results.length > 0){
        const pass = results[0].rto_pass;
        Session = req.session;
        Session.rtoid = req.body.username;
        Session.rtopass = req.body.password;
        if(rto_pass == pass && Session.rtoid){
          req.session.loggedin = true;
          req.session.user = rto_id;
          req.session.save();
          console.log("Login Success!");
        }
        else{
          res.render("rto_login", { msg: true });
        }
      }else{
        console.log('User not found!');
        res.render("rto_login", { msg: true });
      }
    }
    const name = 'SELECT f_name,l_name FROM rto_login where rto_id = ?';
          pool.query(name, [rto_id], async (error, results1, fields) => {
            data = JSON.parse(JSON.stringify(results1));
            if(req.session)
            {
              res.redirect('/rto_dashboard');
            }
            else
              res.redirect('/');
          });
  })
});

//login route for vehicle owner
app.post('/login', async (req, res) => {
  const user_id = req.body.username;
  const password = req.body.password;
  // Retrieve the hashed password value from the database based on the entered user ID.
  const fetch_password = 'SELECT user_pass FROM user_register WHERE user_id = ?';
  const fetch_validity = 'SELECT validity from user_license WHERE user_id = ?';
  const fetch_license_details = 'SELECT license, address_p, dob, gender FROM user_register INNER JOIN user_license ON user_register.user_id = user_license.user_id WHERE user_register.user_id = ?';
  const vehicle_count = '';
  pool.query(fetch_password, [user_id], async (error, results1, fields) => {
    if (error) {
      console.error('Error while retrieving user password:', error);
      res.status(500).send('Internal Server Error');
    } else {
      if (results1.length > 0) {
        const storedPassword = results1[0].user_pass;
        // Use the retrieved hashed password value and the entered plaintext password to compare them using the bcrypt.compare function.
        const isMatch = await bcrypt.compare(password, storedPassword);
        Session = req.session;
        Session.userid = req.body.username;
        Session.pass = req.body.password;
        if (isMatch && Session.userid) {
          req.session.loggedin = true;
          req.session.user = user_id;
          req.session.save();
          console.log('Login Success!');
          var date;
          pool.query(fetch_validity, [user_id], async (error, results2, fields) => {
            if (error) {
              console.error('Error while fetching Date:', error);
            res.status(500).send('Internal Server Error');
            } 
            else{
              if(results2.length == 1){
                date = results2[0].validity;
                formattedDate1 = date.toLocaleDateString('en-GB');
                var currentDate = new Date();
                currentDate = currentDate.toLocaleDateString('en-GB');
                function getNumberOfDays(date1, date2) {
                // Convert date strings to mm/dd/yyyy format
                const [day1, month1, year1] = date1.split('/');
                const [day2, month2, year2] = date2.split('/');
                const newDate1 = new Date(`${month1}/${day1}/${year1}`);
                const newDate2 = new Date(`${month2}/${day2}/${year2}`);
            
                // Calculate difference in days
                const diffInTime = newDate2.getTime() - newDate1.getTime();
                const diffInDays = Math.round(diffInTime / oneDay);
                return diffInDays;
              }
          
              noOfDays = getNumberOfDays(currentDate, formattedDate1);
              displayMarquee = false;
              expired = false;
              const fetch_name = 'SELECT f_name,l_name FROM user_register where user_id = ?';
              pool.query(fetch_name, [user_id], async (error, results3, fields) => {
                data = JSON.parse(JSON.stringify(results3));
                if(req.session)
                {
                  if (noOfDays <= 30 && noOfDays >= 1) {
                    displayMarquee = true;
                  }
                  else if(noOfDays < 1){
                    displayMarquee = true;
                    expired = true;
                  }
                  pool.query(fetch_license_details, [user_id], async(error, results4, fields)=>{
                    data2 = JSON.parse(JSON.stringify(results4));
                    function formatDate(dateString) {
                      const date = new Date(dateString);
                      const day = date.getUTCDate().toString().padStart(2, '0'); // get day as string with leading zero if needed
                      const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // get month as string with leading zero if needed (month is zero-indexed)
                      const year = date.getUTCFullYear().toString(); // get year as string
                      return `${day}/${month}/${year}`;
                    }
                    data2[0].dob = formatDate(data2[0].dob);
                    
                    if(req.session){
                      res.redirect('/dashboard');
                    }
                    else{
                      res.redirect('/');
                    }
                  })
                }
                else
                  res.redirect('/');
              });
            }
            else if(Session.userid == ""){
              res.send("Error");
            }
          }
        })
        } else {
          console.log('Incorrect Password!');
          res.render("login1", { msg: true });
        }
      } else {
        console.log('User not found!');
        res.render("login1", { msg: true });
      }
    }
  });
});


//rto dashboard session
app.get('/rto_dashboard', async(req, res) =>{
  if(req.session.loggedin){
    try{
      res.render("rto_index", {fname:data[0].f_name, lname:data[0].l_name});
    }
    catch(error){
      res.status(500).send(error.message);
    }
  }
  else{
    res.redirect('/');
  }
  
});

//rto logout route
app.get('/rto_logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      res.render('index');
    }
  });
});

app.get('/dashboard', async(req, res) => {
  if(req.session.loggedin){
    try{
      res.render("index1", {success: true, noOfDays: noOfDays, displayMarquee: displayMarquee, expired: expired, fname:data[0].f_name, lname:data[0].l_name, validity: formattedDate1, license:data2[0].license, gender:data2[0].gender, dob:data2[0].dob, address:data2[0].address_p});
    }
    catch(error){
      console.error(error);
      res.status(500).send(error.message);
    }
  }
  else{
    // return res.send("Please Login to view this page! <a href='/'>Login Here</a>");
    res.redirect('/');
  }
});

// Check if session is active before rendering index1 page
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      res.render('index');
    }
  });
});


// Start the server
app.listen(3004, () => {
  console.log('Server is running on port 3004');
});