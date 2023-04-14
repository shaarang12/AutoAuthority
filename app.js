// imports
import express from 'express'
import bcrypt from 'bcrypt'
import mysql from 'mysql'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import multer from 'multer';
import fs from 'fs';
import sharp from 'sharp';
import { u } from 'tar'
//creating an express application
const app = express()

//one day
const oneDay = 1000 * 60 * 60 * 24

//using express session
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}))

app.use(cookieParser())

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

//creating mysql connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'autoauthority.cikjgc7xrldu.ap-south-1.rds.amazonaws.com',
    user: 'admin',
    password: 'adminadmin',
    database: 'AutoAuthority',
})

//multer package
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')//uploads directory
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' +Date.now());
    }
});
  
const upload11 = multer({ storage: storage });

//setting default engine to handlebar
app.set('view engine', 'hbs')

//parse request bodies as json
app.use(express.json())

//static files from the public directory
app.use(express.static('public'))

//rendering the main index page
app.get('/', (req, res)=>{
    res.render('index');
})

//rendering the fines page
app.get('/fine', (req, res)=>{
    res.render('fines')
})

//route for signup page
app.get('/register', (req, res)=>{
    res.render('register1')
})

//route for vehicle owner login page
app.get('/login', (req, res)=>{
    res.render('login1')
})

//route for rto officer login page
app.get('/rto_login', (req, res)=>{
    res.render('rto_login')
})

//route for rto officer dashboard
app.get('/rto_index', (req, res)=>{
  if(req.session.loggedin)
    res.render('rto_index', {msg: true})
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
        res.status(500).send(error.message)
      }
    }
    else{
      res.redirect('/')
    }
})

//route for vehicle owner to fetch all of his pending fines.
app.get('/view_fines', async(req, res)=>{
    if(req.session.loggedin){
      try{
        pool.query('SELECT i.doi, uv.reg_plate, f.offence, f.fine_amount, DATE_FORMAT(i.doi, "%a %b %e %Y %T") AS formatted_doi FROM fines f JOIN impose_fine i ON f.fine_id = i.fine_id JOIN user_vehicle uv ON uv.reg_plate = i.veh_reg_no JOIN user_register ur ON ur.user_id = uv.user_id WHERE ur.user_id = ?', [req.session.user], function(err, result){
          if(err) throw err;
          // Calculate total fine
          let total_fine = 0;
          for(let i = 0; i < result.length; i++) {
            total_fine += result[i].fine_amount
          }
          res.render('view_fines', { fine: result, total_fine: total_fine })
        })      
      }
      catch(error){
        res.status(500).send(error.message)
      }
    }
    else{
      res.redirect('/');
    }
})

//variables required for route
var data1, data3
var noOfDays
var displayMarquee = false
var expired = false

//variables for register page 1
var f_name, l_name, dob, age, gender, formattedDate

//route for first register page
app.post('/register1', async(req, res)=>{
    f_name = req.body.fname
    l_name = req.body.lname
    dob = req.body.dob
    gender = req.body.gender

    //calculating age from dob
    var temp_date = new Date(dob)
    formattedDate = [temp_date.getDate(), temp_date.getMonth() + 1, temp_date.getFullYear()].join('/')
    const dobParts = formattedDate.split('/')
    const dobDay = parseInt(dobParts[0], 10)
    const dobMonth = parseInt(dobParts[1], 10) - 1
    const dobYear = parseInt(dobParts[2], 10)
    const dobDate = new Date(dobYear, dobMonth, dobDay)

    //calculating age in years
    const ageDiffs = Date.now() - dobDate.getTime()
    const ageDate = new Date(ageDiffs)
    age = Math.abs(ageDate.getUTCFullYear() - 1970)
    if(age < 18)
        res.render('register1', {msg: true})
    else    
        res.render('register2')
})

//variables for register page 2
var phone, email, address_p, address_s

//route for second register page
app.post('/register2', async(req, res)=>{
    phone = req.body.phone
    email = req.body.email
    address_p = req.body.address_p
    address_s = req.body.address_s
    res.render('register3')
})

//variables for register page 3
var user_id, o_password, password, c_password, hash

//route for third register page
app.post('/register3', async(req, res)=>{
    user_id = req.body.userid
    password = req.body.password
    c_password = req.body.cpassword
    //password validation
    if(password === c_password){
        pool.query('SELECT * FROM user_register WHERE user_id = ?', [user_id], async(request, result)=>{
          if(result.length == 0){
            hash = await bcrypt.hash(password, 12)
            pool.query('INSERT INTO user_register (f_name, l_name, dob, age, gender, phone, email, address_p, address_s, user_id, user_pass) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [f_name, l_name, dob, age, gender, phone, email, address_p, address_s, user_id, hash], (err)=>{
              console.log('User Created Successfully!')
              res.redirect('/')
            })
          }
          else
            res.render('register3', {msg1: true}) 
        })   
    }
    else{
        console.log('Passwords Do Not Match!')
        // res.render('register3', {msg: true})
        return false
    }
})

//route for change password form
app.get('/edit_info', (req, res)=>{
  if(req.session.loggedin)
    res.render('edit_info')
  else
    res.redirect('/')
})

//route to update password
app.post('/edit_info', async(req, res)=>{
  if(req.session.loggedin){
    o_password = req.body.opassword
    password = req.body.password
    c_password = req.body.cpassword
    pool.query('SELECT user_pass FROM user_register WHERE user_id = ?', [req.session.user], async(request, result)=>{
      const e_password = result[0].user_pass
      const isMatch = await bcrypt.compare(o_password, e_password)
        if(isMatch){
          if(password === c_password){
            hash = await bcrypt.hash(password, 12)
            pool.query('UPDATE user_register SET user_pass = ? WHERE user_id = ?', [hash, req.session.user], (err)=>{
              if(err)
                console.log("Error Updating Password!")
              else{
                console.log("Password Changed!")
                res.redirect('/logout')
              }
            })
          }
          else 
            console.log("Passwords Don't Match!")
        }
        else{
          console.log('Old Password is Incorrect!')
          res.render('edit_info', {msg1: true})
        }      
    })
  }
  else
    res.redirect('/')
})

//route for rto officer to impose fines on vehicle
app.post('/fine', async(req, res)=>{
    if(req.session.loggedin){
        const vehicle = req.body.regno;
        const fine = req.body.fineid;
        const doi = req.body.doi;

        //querying the db
        pool.query('SELECT * from user_vehicle WHERE reg_plate = ?', [vehicle], (err, result)=>{
          if(err)
            console.log('Error Retrieving Vehicle Info!')
          else if(result.length == 0)
            res.render('fines', {msg1: true})
          else{
            if(fine >=1 && fine <= 93){
              pool.query('INSERT INTO impose_fine (veh_reg_no, fine_id, doi) VALUES (?,?,?)', [vehicle, fine, doi], (err)=>{
                if(err)
                    console.log('Failed to Add Fine: ', err)
                else{
                    console.log('Fine Added Successfully')
                    res.redirect('/rto_dashboard')
                }
            })
            }
            else
              res.render('fines', {msg: true}) 
          }
        })      
    }
    else
        res.redirect('/')
})

//login route for rto officer
app.post('/rto_login', async(req, res)=>{
    const rto_id = req.body.username
    const rto_pass = req.body.password

    //querying the db
    pool.query('SELECT rto_pass FROM rto_login WHERE rto_id = ?', [rto_id], async(err, result)=>{
        if(err)
            console.log('Error While Retrieving Data!')
        else{
            if(result.length == 1){
                const pass = result[0].rto_pass;
                if(rto_pass == pass){
                    req.session.loggedin = true
                    req.session.user = rto_id
                    req.session.save()
                    console.log('Logged In!')

                    //querying the db for name
                    pool.query('SELECT f_name,l_name FROM rto_login where rto_id = ?', [rto_id], async(err, result)=>{
                        if(err)
                            console.log('Error Retrieving Name!')
                        else if(result.length == 1){
                            data3 = JSON.parse(JSON.stringify(result))
                            if(req.session)
                                res.redirect('/rto_dashboard')
                            else 
                                res.redirect('/')
                        }
                    })
                }
                else
                    res.render('rto_login', {msg: true})
            }
            else
              res.render('rto_login', {msg: true})
        }
    })
})

//variables
var data2,user_id;

//login route for vehicle owner
app.post('/login', async(req, res)=>{
     user_id = req.body.username
    const password = req.body.password
    
    //querying the database for stored password
    pool.query('SELECT user_pass FROM user_register WHERE user_id = ?', [user_id], async(err, result)=>{
        if(err)
            console.log('Error Fetching Password from Database!')
        else if(result.length == 1){
            const storedPassword = result[0].user_pass

            //check if entered and stored password match
            const isMatch = await bcrypt.compare(password, storedPassword)
            if(isMatch){
                req.session.loggedin = true
                req.session.user = user_id
                req.session.save()
                console.log('Logged In!')

                //querying the db to fetch name
                pool.query('SELECT f_name,l_name FROM user_register where user_id = ?', [user_id], async(err, result)=>{
                    if(err)
                        console.log('Error Fetching Name!')
                    else if(result.length == 1)
                        data1 = JSON.parse(JSON.stringify(result))                    

                    //querying the db for license validity
                    pool.query('SELECT validity from user_license WHERE user_id = ?', [user_id], async(err, result)=>{
                        if(err)
                            console.log('Error Fetching License Validity')
                        else if(result.length == 1){
                            console.log("I HAVE LICENSE")
                           var date = result[0].validity
                            formattedDate = date.toLocaleDateString('en-GB')
                            var currentDate = new Date()    
                            currentDate = currentDate.toLocaleDateString('en-GB')
                            
                            //function that converts to mm/dd/yyyy format
                            function getNumberOfDays(date1, date2){
                                const [day1, month1, year1] = date1.split('/');
                                const [day2, month2, year2] = date2.split('/');
                                const newDate1 = new Date(`${month1}/${day1}/${year1}`);
                                const newDate2 = new Date(`${month2}/${day2}/${year2}`);

                                //calculating difference in days
                                const diffInTime = newDate2.getTime() - newDate1.getTime();
                                const diffInDays = Math.round(diffInTime / oneDay);
                                return diffInDays;
                            }
                            noOfDays = getNumberOfDays(currentDate, formattedDate)
                            if(noOfDays <= 30 && noOfDays >= 1){
                                displayMarquee = true
                                // expired = false
                            }
                            else if(noOfDays < 1){
                                displayMarquee = true
                                expired = true
                            }
                            //querying the db for license details
                            pool.query('SELECT license, address_p, dob, gender FROM user_register INNER JOIN user_license ON user_register.user_id = user_license.user_id WHERE user_register.user_id = ?', [user_id], async(err, result)=>{
                                if(err)
                                    console.log("Error Fetching License Details!")
                                else if(result.length == 1){
                                     data2 = JSON.parse(JSON.stringify(result))

                                    //function to format date
                                    function formatDate(dateString) {
                                        const date = new Date(dateString);
                                        const day = date.getUTCDate().toString().padStart(2, '0'); // get day as string with leading zero if needed
                                        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // get month as string with leading zero if needed (month is zero-indexed)
                                        const year = date.getUTCFullYear().toString(); // get year as string
                                        return `${day}/${month}/${year}`;
                                    }

                                    data2[0].dob = formatDate(data2[0].dob)

                                    if(req.session)
                                        res.redirect('/dashboard')
                                    else
                                        res.redirect('/')

                                }
                            })
                        }
                        else{
                            console.log("I HAVE NO LICENSE")
                            res.redirect('/dashboard_no_license')
                        }
                    })
                })
            }
            else{
                console.log('Invalid Credentials!')
                res.render('login1', {msg: true})
            }
        }
        else{
          console.log('Invalid Credentials!')
          res.render('login1', {msg: true})
      }
    })
})

//variable
var count1,count2

//route for rto dashboard
app.get('/rto_dashboard', async(req, res) =>{
      if(req.session.loggedin){
        try{
          const query="SELECT user_id from user_docs_temp";
          pool.query(query,[],(req,result,err)=>{
            var data=JSON.parse(JSON.stringify(result));
            count1=data.length;
            pool.query('SELECT from_license from transfer_temp', (req, result)=>{
              var data = JSON.parse(JSON.stringify(result))
              count2 = data.length
              res.render("rto_index", {count:count1+count2,fname:data3[0].f_name, lname:data3[0].l_name})
            })
          
          });
        }
        catch(error){
          res.status(500).send(error.message);
        }
      }
      else{
        res.redirect('/');
      }
      
})

//route for rto officer logout
app.get('/rto_logout', (req, res)=>{
    req.session.destroy((err)=>{
        if(err)
            console.log('Error Logging Out!')
        else
            res.render('index')
    })
})

//route for vehicle owner dashboard with license details
app.get('/dashboard', async(req, res)=>{
    if(req.session.loggedin){
        res.render('index1', {noOfDays: noOfDays, displayMarquee: displayMarquee, expired: expired, fname:data1[0].f_name, lname:data1[0].l_name, validity: formattedDate, license: data2[0].license, gender: data2[0].gender, dob:data2[0].dob, address:data2[0].address_p})
    }
    else    
        res.redirect('/')
})

//route for vehicle owner without license details
app.get('/dashboard_no_license', async(req, res)=>{
    if(req.session.loggedin){
        res.render('index1', {nolicense: true, fname:data1[0].f_name, lname:data1[0].l_name})
    }
    else
        res.redirect('/')
})

//logout route for both users
app.get('/logout', (req, res)=>{
    req.session.destroy((err)=>{
        if(err)
            console.log('Error Logging Out!')
        else   
            res.render('index')
    })
})

app.get('/upload',(req,res)=>
{
    if(req.session.loggedin){
    res.render('user_credentials.hbs',{username:user_id})
    }
})

//route to redirect to vehicle transfer form
app.get('/transfer', (req, res)=>{
  if(req.session.loggedin)
    res.render('transfer')
  else
    res.redirect('/')
})

//route for vehicle ownership tansfer form submission
app.post('/transfer', (req,res)=>{
  if(req.session.loggedin){
    const regno = req.body.regno
    const license = req.body.license

  const query1='SELECT user_id from user_vehicle where reg_plate=?';
      pool.query(query1,[regno],async(err,result1)=>{
        if(err)
        console.log(err)
        else
        {
          if(result1.length == 0)
            res.render('transfer',{msg1:true})
          else if(result1[0].user_id!=req.session.user)
            res.render('transfer',{msg:true})
          else if(result1[0].user_id==req.session.user)
          {
            pool.query('SELECT user_id from user_license where license = ?', [license], async(err, result)=>{
              if(err)
                console.log("Error Fetching User Details!")
              else{
                if(result.length == 0){
                  res.render('transfer',{msg2:true})
                  console.log('No User Found')
                }
                else{
                  const user_id = result[0].user_id
                  pool.query('INSERT INTO ownership_transfer VALUES (?, ?, ?)', [license, regno, req.session.user], (err)=>{
                    if(err)
                      console.log('Error Inserting Values')
                    else{
                      console.log('Request Submitted Successfully!')
                      res.redirect('/dashboard')
                    }
                  })
                }
              }
            })
          }
        }
      })

    
  }
})

//variable for user doc verification
var User_id,aadhar,voter,pan,license

//route to handle repetitive document verification submissions from vehicle owner
app.post('/afterentry',async(req,res)=>{
  if(req.session.loggedin){
    User_id=req.session.user
     aadhar=req.body.aadhar
     pan=req.body.pan
     voter=req.body.voter
     license=req.body.license
    const query1="SELECT user_id from user_docs_temp where user_id=?"
    pool.query(query1,[user_id],(req,results,err)=>{
      if(results.length>=1)
      res.send({"Status":"Your Request is Pending"})
      
    else{
      const query2="SELECT user_id from user_docs where user_id=?"
      pool.query(query2,[user_id],(requests1,results1,err)=>{
        if(results1.length>=1)
          res.render('user_credentials', {msg: true})
        //res.send({"Status":"Your Request is already accepted"})
        else{
          res.render('usercredentialsproof')
        }
      })
    }
  })
  }
  else  
    res.redirect('/')  
})

//route to convert uploaded file to jpeg/jpg
app.post('/afterproofentry',upload11.single('docs'),async (req,res)=>{
  if(req.session.loggedin){
    const file=req.file;
    const fileBuffer = await sharp(file.path).jpeg().toBuffer() // convert the file to a JPEG buffer
    fs.writeFile(file.path + '.jpg', fileBuffer, async (err) => { // write the buffer to a new file with .jpg extension
      if (err) {
        console.log(err)
      }
      const insertQuery = "INSERT INTO user_docs_proof(user_id, user_doc) VALUES (?, ?)"
      pool.query(insertQuery, [User_id, fileBuffer]);
      const tempInsertQuery = "INSERT INTO user_docs_temp(user_id, license,aadhaar,pan,voter) VALUES (?, ?, ?, ?, ?)"
      pool.query(tempInsertQuery, [User_id, license, aadhar, pan, voter])
      res.redirect('/dashboard')
      // res.send({"Status":"File and user data uploaded successfully"});
    })
  }
  else
    res.redirect('/')   
})

//route for rto officer to view pending approvals
var useridverify;
app.get('/verifyinfo',(req,res)=>{
  if(req.session.loggedin){
    const query="SELECT * from user_docs_temp LIMIT 1"
    pool.query(query,(request,results,err)=>{
      if(results.length == 0)
        res.redirect('/rto_dashboard')
      else{
        var data=JSON.parse(JSON.stringify(results))
        useridverify=data[0].user_id
        var license=data[0].license
        var aadhaar=data[0].aadhaar
        var pan=data[0].pan
        var voter=data[0].voter
        res.render('info_verify',{userid:useridverify,license:license,aadhar:aadhaar,pan:pan,voter:voter})
      }
    })
  } 
  else
    res.redirect('/')
})

//route for rto officer to verify uploaded docs
app.get('/docverify',(req,res)=>{
  if(req.session.loggedin){
    const selectQuery = "SELECT user_doc FROM user_docs_proof WHERE user_id =?"
    pool.query(selectQuery,[useridverify], async (error, results) => {
      if (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
        return;
      }
      const data = results[0].user_doc
      res.writeHead(200, {
        'Content-Type': 'image/jpeg', // set the content type to JPEG
        'Content-Length': data.length
      })
      res.end(data) // send the binary data as the response
    })
  }
  else  
    res.redirect('/')
})

//route for rto officer to accept uploaded user document
app.get('/infoaccept',(req,res)=>{
  if(req.session.loggedin){
    const query="SELECT * from user_docs_temp LIMIT 1"
    pool.query(query,(request,results,err)=>{
      var data=JSON.parse(JSON.stringify(results))
      var userid=data[0].user_id
      var license=data[0].license
      var aadhaar=data[0].aadhaar
      var pan=data[0].pan
      var voter=data[0].voter
      const query1="INSERT into user_docs (user_id,license,aadhaar,pan,voter) VALUES (?,?,?,?,?)";
      pool.query(query1,[userid,license,aadhaar,pan,voter],(requests,results,err)=>{
        if(err)
        console.log(err)
        else
        
        res.redirect('/rto_dashboard')
        const query2="DELETE from user_docs_temp where user_id=?"
        pool.query(query2,[userid],(requests1,results1,err1)=>{
          if(err1)
          console.log(err1)
        })
      
      })  
  })
  }
  else
    res.redirect('/')  
})

//route for rto officer to reject uploaded user document
app.get('/inforeject',(req,res)=>{
  if(req.session.loggedin){
    const query="SELECT * from user_docs_temp LIMIT 1"
    pool.query(query,(request,results,err)=>{
      var data=JSON.parse(JSON.stringify(results))
      var userid=data[0].user_id
      const query1="DELETE FROM user_docs_temp where user_id=?"
      pool.query(query1,[userid],(requests,results,err)=>{
        if(err)
        console.log(err)
        else
       {
          const query2="DELETE FROM user_docs_proof where user_id=?"
          pool.query(query2,[userid],(requests,results,err)=>{
            if(err)
            console.log(err)
            else
            {
              // res.send({"Status":"Data Deleted"});
              res.redirect('/rto_dashboard')
            }
          })
        }
      })
  })
  }
  else
    res.redirect('/')
})

var data, u_license, reg_no, user_id, f_name, l_name, company, model, color
//route for vehicle owner to view list of ownership transfers
app.get('/request',(req, res)=>{
  if(req.session.loggedin){
    pool.query('SELECT license from user_license where user_id = ?', [req.session.user], (request, result)=>{
      u_license = result[0].license
      pool.query('SELECT reg_no, user_id FROM ownership_transfer where license = ? LIMIT 1', [u_license], (request, result)=>{
        if(result.length == 0)
          res.redirect('/dashboard')
        else{
          data = JSON.parse(JSON.stringify(result))
        reg_no = data[0].reg_no
        user_id = data[0].user_id
        pool.query('SELECT f_name, l_name from user_register where user_id = ?', [user_id], (request, result)=>{
          data = JSON.parse(JSON.stringify(result))
          f_name = data[0].f_name
          l_name = data[0].l_name
          pool.query('SELECT company, model, color from user_vehicle where reg_plate = ?', [reg_no], (request, result)=>{
            data = JSON.parse(JSON.stringify(result))
            company = data[0].company
            model = data[0].model
            color = data[0].color
            res.render('pending_request',{fname:f_name,lname:l_name,regno:reg_no,company:company,color:color,model:model})
          })
        })
        }
      })
    })
  }
  else
    res.redirect('/')
})

//route for vehicle owner to accept ownership transfer
app.get('/transferaccept', (req, res)=>{
  if(req.session.loggedin){
    pool.query('SELECT license FROM user_license WHERE user_id = ?', [user_id], (request, result)=>{
      var license = result[0].license
      pool.query('INSERT INTO transfer_temp VALUES (?,?,?)', [license, u_license, reg_no], (err)=>{
        if(err)
          console.log("Error Inserting Values")
        else{
          pool.query('DELETE FROM ownership_transfer where reg_no = ?', [reg_no], (err)=>{
            res.redirect('/dashboard')
          })
        }
      })
    })
  }
  else
    res.redirect('/')
})

//route for vehicle owner to reject ownership transfer
app.get('/transferreject', (req, res)=>{
  if(req.session.loggedin){
    pool.query('DELETE FROM ownership_transfer where reg_no = ?', [reg_no], (err)=>{
      res.redirect('/dashboard')
    })
  }
  else
    res.redirect('/')
})

//variables required for vehicle transfer
var from_l, to_l, company, model, reg_no
var f_fname, f_lname, t_fname, t_lname, u_id

//route to fetch 1 record from transfer table
app.get('/transfer_rto', (req, res)=>{
  if(req.session.loggedin){
    pool.query('SELECT * from transfer_temp LIMIT 1', (req, result)=>{
      if(result.length == 0)
        res.redirect('/rto_dashboard')
      else{
        var data=JSON.parse(JSON.stringify(result))
        from_l = data[0].from_license
        to_l = data[0].to_license
        reg_no = data[0].reg_no
        pool.query('SELECT f_name, l_name FROM user_register INNER JOIN user_license ON user_register.user_id = user_license.user_id WHERE license = ?', [from_l], (req, result)=>{
          var data=JSON.parse(JSON.stringify(result))
          f_fname = data[0].f_name
          f_lname = data[0].l_name
          pool.query('SELECT f_name, l_name FROM user_register INNER JOIN user_license ON user_register.user_id = user_license.user_id WHERE license = ?', [to_l], (req, result)=>{
            var data=JSON.parse(JSON.stringify(result))
            t_fname = data[0].f_name
            t_lname = data[0].l_name
            pool.query('SELECT company, model FROM user_vehicle WHERE reg_plate = ?', [reg_no], (req, result)=>{
              var data=JSON.parse(JSON.stringify(result))
              company = data[0].company
              model = data[0].model
              pool.query('SELECT user_id FROM user_license WHERE license = ?', [to_l], (req, result)=>{
                u_id = result[0].user_id
                res.render('transfer_rto_page', {f_fname:f_fname, f_lname: f_lname, t_fname: t_fname, t_lname: t_lname, regno: reg_no, company: company, model: model})
              })
            })
          })
        })
      }
    })
  }
  else
    res.redirect('/')
})

//route for rto officer to approve vehicle transfer
app.get('/approve_transfer', (req, res)=>{
  if(req.session.loggedin){
    pool.query('UPDATE user_vehicle SET license = ?, user_id = ? WHERE reg_plate = ?', [to_l, u_id, reg_no], (err)=>{
      if(err)
        console.log("Error Linking Vehicle to New Owner!")
      else{
        pool.query('DELETE FROM transfer_temp WHERE from_license = ? AND to_license = ? AND reg_no = ?', [from_l, to_l, reg_no], (err)=>{
          if(err)
            console.log("Error Removing Vehicle Transfer Info from Temp Table")
          else
            res.redirect('/rto_dashboard')
        })
      }
    })
  }
  else
    res.redirect('/')
})

//route for rto officer to deny vehicle transfer
app.get('/deny_transfer', (req, res)=>{
  if(req.session.loggedin){
    pool.query('DELETE FROM transfer_temp WHERE from_license = ? AND to_license = ? AND reg_no = ?', [from_l, to_l, reg_no], (err)=>{
      if(err)
        console.log("Error Removing Vehicle Transfer Info from Temp Table")
      else{
        pool.query('DELETE FROM ownership_transfer LIMIT 1', (err)=>{
          if(err)
            console.log("Error Removing Transfer Details from Ownership Table")
          else{
            res.redirect('/rto_dashboard')
          }
        })
      }  
    })
  }
  else
    res.redirect('/')
})

//route for vehicle owner to create fasttag or view balance
app.get('/fast_tag', (req, res)=>{
})


//starting the server
app.listen(3004, ()=>{
    console.log('Server-Port: 3004')
})