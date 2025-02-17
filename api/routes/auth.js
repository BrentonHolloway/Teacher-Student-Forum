'use strict';

const express = require('express');
const mysql = require('promise-mysql');
const bodyParser = require('body-parser');

var router = express.Router();

// Automatically parse request body as form data.
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

let pool;
const createPool = async () => {
    pool = await mysql.createPool({
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,

        database: process.env.DB_NAME,

        // If connecting via unix domain socket, specify the path
        socketPath: process.env.DB_CONNECTION,

        // If connecting via TCP, enter the IP and port instead
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,

        connectionLimit: 5,
        connectTimeout: 10000,
        acquireTimeout: 10000,
        waitForConnections: true,
        queueLimit: 0,
    });

};
createPool();

router.post('/login', async (req, res) => {
  try {

    console.log(req.body);
    // console.log(pool.pool.config.connectionConfig);
    //Create new deposit record
    const getUserDetails = "SELECT * FROM users WHERE email = '"+req.body.email+"';";
    console.log(getUserDetails);
    //Run query - fetch response
    var userDetails = await pool.query(getUserDetails);
    console.log(userDetails)

    if (userDetails.length < 1) {
      res.status(403).send({message: 'Unkown E-Mail'});
    }
    else if (userDetails[0].password === req.body.password) {
      res.status(200).send({
        user: {
          id: userDetails[0].id,
          fname: userDetails[0].first_name,
          lname: userDetails[0].last_name,
          email: userDetails[0].email,
          role: userDetails[0].role,
          profile: userDetails[0].profile
        }
      });
    }
    else {
      res.status(403).send({message: 'Incorrect Password'});
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({message: 'Connection error!'});
  }
});

/* Register User (Teacher or Student) */
router.post('/register', function(req, res, next) {
    try {
        
    } catch (error) {
        res.status(500).send('Connection error!').end();
    }
});


module.exports = router;