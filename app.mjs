import express from 'express';
import bcrypt from 'bcrypt';
import mysql from 'mysql';

// Create an Express app
const app = express();
import bodyParser from 'body-parser';


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
    res.render("register1", {
    });
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
  res.render("register2")
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
        res.render("index")
      }
    });
  }
  else{
    console.log('Passwords Do Not Match!');
    res.render("register3", { error: "Passwords do not match", highlight: true });
    return false;
  }
});

var user, pass
app.post('/login', async (req, res) => {
  const user_id = req.body.username;
  const password = req.body.password;
  
  // Retrieve the hashed password value from the database based on the entered user ID.
  const query = 'SELECT user_pass FROM user_register WHERE user_id = ?';
  pool.query(query, [user_id], async (error, results, fields) => {
    if (error) {
      console.error('Error while retrieving user password:', error);
      res.status(500).send('Internal Server Error');
    } else {
      if (results.length > 0) {
        const storedPassword = results[0].user_pass;
        
        // Use the retrieved hashed password value and the entered plaintext password to compare them using the bcrypt.compare function.
        const isMatch = await bcrypt.compare(password, storedPassword);
        
        if (isMatch) {
          console.log('Login Success!');
          res.status(200).send('Login Successful!');
        } else {
          console.log('Incorrect Password!');
          res.status(401).send('Incorrect Password!');
        }
      } else {
        console.log('User not found!');
        res.status(404).send('User not found!');
      }
    }
  });
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