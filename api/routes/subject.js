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

/* GET subjects. */
router.get('/', async (req, res) => {
      try {
          const getAllSubjects = "SELECT "+
                                "subjects.id as subject_id, "+
                                "subjects.name as subject_name, "+
                                "subjects.description as subject_description, "+
                                "users.id as teacher_id, "+
                                "users.first_name as teacher_fname, "+
                                "users.last_name as teacher_lname, "+
                                "users.profile as teacher_profile "+
                                "FROM subjects "+
                                "JOIN users "+
                                "ON users.id = teacher_id;"
          var subjects = await pool.query(getAllSubjects);
          console.log(subjects);
          res.status(200).json(subjects);
      } catch (error) {
        res.status(500).send({message: 'An Error Occurred'});
      }
});

module.exports = router;
