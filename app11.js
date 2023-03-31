import express from 'express';
import bcrypt from 'bcrypt';
import mysql from 'mysql';
import path from 'path';
import url from "url";
import session from "express-session";
import logger from "morgan";
import cookieParser from 'cookie-parser';
// Create an Express app
const app = express();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import bodyParser from 'body-parser';
const oneday= 1000 * 60 * 60 * 24;
app.use(session({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:true,
  cookie: { maxAge: oneday },
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
console.log(__dirname);
// Render the index page
app.get("/", (req, res) => {
     var name='hello';
res.render('index',{msg:"Hello"});
});
app.get("/register",(req,res)=>{
  res.render("register1",{});
})
app.get("/login",(req,res)=>{
  
  res.render("login1");
});
var f_name, l_name, dob, age, gender
app.post('/register1', async (req, res) => {
  f_name = req.body.fname
  l_name = req.body.lname
  dob = req.body.dob
  gender = req.body.gender

  //calculating age from dob
  var tempDate = new Date(dob);
  var formattedDate = [tempDate.getDate(), tempDate.getMonth() + 1, tempDate.getFullYear()].join('/');
  const dobParts = formattedDate.split("/");
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
var userid,pass;
var user_id, password, c_password, hash
var salt = bcrypt.genSaltSync(12)
app.post('/register3', async (req, res) => {
  user_id = req.body.userid
  password = req.body.password
  c_password = req.body.cpassword
  if(password === c_password){
    hash = await bcrypt.hash(password, 12)
    const query = 'INSERT INTO user_register (f_name, l_name, dob, age, gender, phone, email, address_p, address_s, user_id, user_pass) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
    pool.query(query, [f_name, l_name, dob, age, gender, phone, email, address_p, address_s, user_id, hash], (error, results, fields) => {
      if (error) {
        console.error('Failed to create user:', error);
        res.status(500).send('Failed to create user');
      } else {
        console.log('User created successfully!');
        // res.status(200).send('User created successfully!');
        res.render("login1");
      }
    });
  }
  else{
    console.log('Passwords Do Not Match!');
    res.render("register3", { error: "Passwords do not match", highlight: true });
    return false;
  }
});

var user_id, password,isMatch ,data;
let displayMarquee,expired;
app.post('/newuser', async (req, res) => {
    user_id = req.body.username;
    password = req.body.password;

    // Retrieve the hashed password value from the database based on the entered user ID.
    const query = 'SELECT user_pass FROM user_register WHERE user_id = ?';
    const query1 = 'SELECT validity from user_license WHERE user_id = ?';
    pool.query(query, [user_id], async (error, results, fields) => {
      if (error) {
        console.error('Error while retrieving user password:', error);
        res.status(500).send('Internal Server Error');
      } else {
        if (results.length > 0) {
          const storedPassword = results[0].user_pass;

          // Use the retrieved hashed password value and the entered plaintext password to compare them using the bcrypt.compare function.
          isMatch = await bcrypt.compare(password, storedPassword);
          Session = req.session;
          Session.userid = req.body.username;
          Session.pass = req.body.password;
          var noOfDays;
          if (isMatch && Session.userid) {
            pool.query(query1,[user_id],async (error,results)=>{
               var date=results[0].validity;
              console.log(date);
              const formattedDate=date.toLocaleDateString('en-GB');
              console.log("Formatted Date:",formattedDate);
              var currentDate=new Date();
              currentDate=currentDate.toLocaleDateString('en-GB');
              console.log(currentDate);
              function getNumberOfDays(date1,date2)
              {
                const[day1,month1,year1]=date1.split('/');
                const[day2,month2,year2]=date2.split('/');
                const newDate1=new Date(`${month1}/${day1}/${year1}`);
                console.log(newDate1);
                const newDate2=new Date(`${month2}/${day2}/${year2}`);
                console.log(newDate2);
                const oneday=1000*60*60*24;
                const diffInTime=newDate2.getTime()-newDate1.getTime();
                const diffinDays=Math.round(diffInTime/oneday);
                return diffinDays;
              }
              noOfDays=getNumberOfDays(currentDate,formattedDate);
              console.log(noOfDays);
              displayMarquee=false;
              expired=false;
              
            })
            const username = 'SELECT f_name,l_name FROM user_register where user_id = ?';
            pool.query(username, [user_id], async (error, results1, fields) => {
              data = JSON.parse(JSON.stringify(results1));
              console.log(data);
              console.log(Session);
              if(req.session)
              {
                if(noOfDays<=30 && noOfDays>=1)
                {
                  displayMarquee=true;
                }
                else if(noOfDays<1)
                {
                  displayMarquee=true;
                  expired=true;
                }
              res.render("indexafterlogin", {noOfDays:noOfDays,displayMarquee:displayMarquee,expired:expired,msg:data[0].f_name, msg1:data[0].l_name});
              
              }
              else
              res.redirect('/');
            });
          } else if (Session.userid == " ") {
            res.send("Error");
          } else {
            console.log('Incorrect Password!');
            res.render("login1", {msg:true});
          }
        } else {
          console.log('User not found!');
          res.status(404).send('User not found!');
        }
      }
    });
  });
  //After Logout Destroy Session and Call Home Page
app.get('/logout',(req,res)=>{
   
    req.session.destroy();
    //res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    console.log("Huu");
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', 0);
  
    res.redirect('/');
});
app.get('/upload',(req,res)=>{
  if(Session)
  {
  console.log("AAAA");
  res.render('user_credentials');
  }

});
// app.get("/register2", (req, res) => {
//   res.render("register3")

// });

//   try {
//     const f_name = req.body.fname
//     const l_name = req.body.lname
//     const dob = req.body.dob
//     const gender = req.body.gender

    

//   // if () {
//   //       return res.status(400).send('Username or password is missing');
//   //     }
//     // const { username, password } = req.body;

//     // Hash the password using bcrypt
    
//     const salt = bcrypt.genSaltSync(12)
//     console.time("hash")
//     const hash = await bcrypt.hash(user_pass, salt)
//     console.timeEnd("hash")
    
//     //match a password
//     // const isMatch = await bcrypt.compare("helloworld", hash)
//     // console.log(isMatch)


//     // Insert the user data into the MySQL database
//     const query = 'INSERT INTO user_register (f_name, l_name, dob, age, gender, phone, email, address_p, address_s, total_vehicles, user_id, user_pass) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
//     pool.query(query, [f_name, l_name, dob, age, gender, phone, email, address_p, address_s, total_vehicles, user_id, hash], (error, results, fields) => {
//       if (error) {
//         console.error('Failed to create user:', error);
//         res.status(500).send('Failed to create user');
//       } else {
//         console.log('User created successfully!');
//         res.status(200).send('User created successfully!');
//       }
//     });
//   } catch (error) {
//     console.error('Failed to create user:', error);
//     res.status(500).send('Failed to create user');
//   }
// });

// Start the server
app.listen(3004, () => {
  console.log('Server is running on port 3004');
});

