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
        if(req.body.role === 1) { // admin
            res.status(403).send({message: 'Permission Denied'});
        }else if(req.body.role === 2) { // teacher
            var getSubjects = "SELECT "+
                                    "id AS subject_id, "+
                                    "name AS subject_name, "+
                                    "teacher_id, "+
                                    "description AS subject_description "+
                                "FROM "+
                                    "subjects "+
                                "WHERE "+
                                    "teacher_id = "+ req.body.id +";";
            var subjects = await pool.query(getSubjects);
            res.status(200).json(subjects);
        }else if(req.body.role === 3) { // student
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
            var subjects = await pool.query(getSubjects);
            res.status(200).json(subjects);
        }
    } catch (error) {
        res.status(500).send({message: 'An Error Occurred'});
    }
});

router.post('/subscribe', async (req, res) => {
    try {
        const getUserRole = "SELECT role FROM users WHERE users.id ="+req.body.user_id+";";
        const insertSubscription = "INSERT INTO subs (user_id, subject_id) "+
                                    "VALUES ('"+req.body.user_id+"', '"+req.body.subject_id+"');";
        
        var userRole = await pool.query(getUserRole);

        if(userRole[0].role == 3) {
            var subject = await pool.query(insertSubscription);
            res.status(200).send({subject_id: subject.insertId});
        } else {
            res.status(403).send({message: "Access Denied"});
        }
    } catch (error) {
        res.status(500).send({message: 'An Error Occured'});
    }
})

router.post('/unsubscribe', async (req, res) => {
    try {
        const getUserRole = "SELECT role FROM users WHERE users.id = "+req.body.user_id+";";
        const removeSubscription = "DELETE FROM subs WHERE user_id = "+req.body.user_id+" AND subject_id = "+req.body.subject_id+";";

        var userRole = await pool.query(getUserRole);

        if(userRole[0].role == 3) {
            await pool.query(removeSubscription);
            res.status(200).end();
        } else {
            res.status(403).send({message: "Access Denied"});
        }
    } catch (error) {
        res.status(500).send({message: 'An Error Occured'});
    }
})

router.post('/new', async (req, res) => {
    try {
        const getUserRole = "SELECT role FROM users WHERE users.id ="+req.body.teacher_id+";";
        const insertSubject = "INSERT INTO subjects (name, teacher_id, description) "+
                                "VALUES ('"+req.body.subjectName+"', "+req.body.teacher_id+", '"+req.body.description+"');";

        var userRole = await pool.query(getUserRole);

        if(userRole[0].role != 2) {
            res.status(403).send({message: "Access Denied"});
        } else {
            var subject = await pool.query(insertSubject);
            res.status(200).send({subject_id: subject.insertId});
        }
        
    } catch (error) {
        res.status(500).send({message: 'An Error Occurred'});
    }
});

router.post('/delete', async (req, res) => {
    try {
        const getUserRole = "SELECT role FROM users WHERE users.id ="+req.body.teacher_id+";";
        const deleteSubject = "DELETE FROM subjects WHERE id = "+req.body.subject_id+";";

        var userRole = await pool.query(getUserRole);

        if(userRole[0].role === 3) {
            res.status(403).send({message: "Access Denied"});
        } else {
            var subject = await pool.query(deleteSubject);
            res.status(200).end();
        }
        
    } catch (error) {
        res.status(500).send({message: 'An Error Occurred'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const subjectId = req.params.id;
        const getSubject = "SELECT * FROM subjects WHERE id = "+subjectId+";";

        var subject = await pool.query(getSubject);

        res.status(200).json(subject[0]);
    } catch (error) {
        res.status(500).send({message: 'An Error Occurred'});
    }
})

router.get('/:subjectId/forum', async (req, res) => {
    try {
        const getForums = "SELECT * FROM forums WHERE subject_id = "+req.params.subjectId+";";
        var forum = await pool.query(getForums);

        res.status(200).json(forum);
    } catch (error) {
        res.status(500).send({message: 'An Error Occurred'});
    }
})

router.get('/:subjectId/forum/:forumId', async (req, res) => {
    try {
        const getForums = "SELECT * FROM forums WHERE subject_id = "+req.params.subjectId+" AND id = "+req.params.forumId+";";
        
        var forum = await pool.query(getForums);

        res.status(200).json(forum[0]);
    } catch (error) {
        res.status(500).send({message: 'An Error Occurred'});
    }
});

router.post('/:subjectId/forum/new', async (req, res) => {
    try {
        const getUserRole = "SELECT role FROM users WHERE users.id ="+req.body.teacher_id+";";
        const insertForum = "INSERT INTO forums (subject_id, name, description) "+
                                "VALUES ("+req.params.subjectId+", '"+req.body.forumName+"', '"+req.body.description+"');";
        var userRole = await pool.query(getUserRole);

        if(userRole[0].role != 2) {
            res.status(403).send({message: "Access Denied"});
        } else {
            var forum = await pool.query(insertForum);
            res.status(200).send({forum_id: forum.insertId});
        }
        
    } catch (error) {
        res.status(500).send({message: 'An Error Occurred'});
    }
});

router.post('/:subjectId/forum/delete', async (req, res) => {
    try {
        const getUserRole = "SELECT role FROM users WHERE users.id ="+req.body.teacher_id+";";
        const deleteForum = "DELETE FROM forums WHERE id = "+req.body.forum_id+";";

        var userRole = await pool.query(getUserRole);

        if(userRole[0].role === 3) {
            res.status(403).send({message: "Access Denied"});
        } else {
            await pool.query(deleteForum);
            res.status(200).end();
        }
        
    } catch (error) {
        res.status(500).send({message: 'An Error Occurred'});
    }
});

router.get('/:subjectId/forum/:forumId/messages', async (req, res) => {
    try {
        //const getMessages = "SELECT * FROM messages WHERE forum_id = "+req.params.forumId+";";
        const getMessages = "SELECT "+
                                "messages.id, "+
                                "messages.message, "+
                                "messages.created_at, "+
                                "messages.updated_at, "+
                                "users.id AS user_id, "+
                                "users.first_name AS fname, "+
                                "users.last_name AS lname, "+
                                "users.role, "+
                                "users.email, "+
                                "users.profile "+
                            "FROM messages "+
                            "JOIN users ON messages.user_id = users.id "+
                            "WHERE messages.forum_id = "+req.params.forumId+" "+
                            "ORDER BY messages.created_at DESC;";

        var messages = await pool.query(getMessages);

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).send({message: 'An Error Occurred'});
    }
});

router.post('/:subjectId/forum/:forumId/message/post', async (req, res) => {
    try {
        const postMessage = "INSERT INTO messages (user_id, forum_id, message) "+
                            "VALUES ("+req.body.user_id+", "+req.params.forumId+", '"+req.body.message+"');";
        var m = await pool.query(postMessage);

        const getMessage = "SELECT "+
                            "messages.id, "+
                            "messages.message, "+
                            "messages.created_at, "+
                            "messages.updated_at, "+
                            "users.id AS user_id, "+
                            "users.first_name AS fname, "+
                            "users.last_name AS lname, "+
                            "users.role, "+
                            "users.email, "+
                            "users.profile "+
                        "FROM messages "+
                        "JOIN users ON messages.user_id = users.id "+
                        "WHERE messages.id = "+m.insertId+" "+
                        "ORDER BY messages.created_at DESC;";
        var message = await pool.query(getMessage);
        
        res.status(200).send(message);
        
    } catch (error) {
        res.status(500).send({message: 'An Error Occurred'});
    }
});

module.exports = router;
