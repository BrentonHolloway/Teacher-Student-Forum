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
router.post('/all', async (req, res) => {
    try {
        if(req.body.role == 1) { // admin
            var getAllSubjects = "SELECT "+
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
        }else if(req.body.role == 2) { // teacher
            var getAllSubjects = "SELECT "+
                                    "subjects.id AS subject_id, "+
                                    "subjects.name AS subject_name, "+
                                    "subjects.description AS subject_description, "+
                                    "subjects.teacher_id AS teacher_id, "+
                                    "users.first_name AS teacher_fname, "+
                                    "users.last_name AS teacher_lname, "+
                                    "users.email AS teacher_email, "+
                                    "users.profile AS teacher_profile "+
                                "FROM subjects "+
                                "JOIN users ON subjects.teacher_id = users.id "+
                                "WHERE NOT subjects.teacher_id = "+ req.body.id +"; ";
        }else if(req.body.role == 3) { // student
            var getAllSubjects = "SELECT "+
                                    "subjects.id AS subject_id, "+
                                    "subjects.name AS subject_name, "+
                                    "subjects.description AS subject_description, "+
                                    "users.id AS teacher_id, "+
                                    "users.first_name AS teacher_fname, "+
                                    "users.last_name AS teacher_lname, "+
                                    "users.email AS teacher_email, "+
                                    "users.profile AS teacher_profile "+
                                "FROM subjects "+
                                "JOIN users ON subjects.teacher_id = users.id "+
                                "WHERE subjects.id NOT IN( "+
                                    "SELECT subjects.id "+
                                    "FROM subs "+
                                    "JOIN subjects ON subs.subject_id = subjects.id "+
                                    "WHERE subs.user_id = "+req.body.id+");";
        }
        
        var subjects = await pool.query(getAllSubjects);
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).send({message: 'An Error Occurred'});
    }
});

router.post('/user', async (req, res) => {
    try {
        if(req.body.role == 1) { // admin
            res.status(403).send({message: 'Permission Denied'});
        }else if(req.body.role == 2) { // teacher
            var getSubjects = "SELECT "+
                                    "id AS subject_id, "+
                                    "name AS subject_name, "+
                                    "teacher_id, "+
                                    "description AS subject_description "+
                                "FROM "+
                                    "subjects "+
                                "WHERE "+
                                    "teacher_id = "+ req.body.id +";";
        }else if(req.body.role == 3) { // student
            var getSubjects = "SELECT "+
                                    "subjects.id AS subject_id, "+
                                    "subjects.name AS subject_name, "+
                                    "subjects.description AS subject_description, "+
                                    "users.id AS teacher_id, "+
                                    "users.first_name AS teacher_fname, "+
                                    "users.last_name AS teacher_lname, "+
                                    "users.email AS teacher_email, "+
                                    "users.profile AS teacher_profile "+
                                "FROM "+
                                    "subs "+
                                "JOIN subjects ON subs.subject_id = subjects.id "+
                                "JOIN users ON subjects.teacher_id = users.id "+
                                "WHERE "+
                                    "subs.user_id = "+ req.body.id +"; ";
        }
        
        var subjects = await pool.query(getSubjects);
        res.status(200).json(subjects)
    } catch (error) {
        res.status(500).send({message: 'An Error Occurred'});
    }
});

router.post('/new', async (req, res) => {
    try {
        const getUser = ""
    } catch (error) {
        res.status(500).send({message: 'An Error Occurred'});
    }
})

module.exports = router;
