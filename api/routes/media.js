'use strict';

const {format} = require('util');
const express = require('express');
const Multer = require('multer');
const bodyParser = require('body-parser');
const {Storage} = require('@google-cloud/storage');
const path = require('path');
const mysql = require('promise-mysql');

var router = express.Router();

// Instantiate a storage client
const storage = new Storage({
    keyFilename: path.join(__dirname, "../credentials/storage-credentials.json"),
    projectId: 'teacher-student-forum'
});

// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
});

// A bucket is a container for objects (files).
const bucket = storage.bucket('teacher-student-forum-files');

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

// Process the file upload and upload to Google Cloud Storage.
router.post('/profile/upload', multer.single('file'), (req, res, next) => {
    try {
        // console.log(req.file)
        // console.log(req.body)
        if (!req.file) {
            res.status(400).send('No file uploaded.');
            return;
        }
        
        // Create a new blob in the bucket and upload the file data.
        const blob = bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream();
    
        blobStream.on('error', (err) => {
            console.log(err)
            next(err);
        });
    
        blobStream.on('finish', () => {

            const query = 'UPDATE users SET profile="'+blob.name+'" WHERE id="'+req.body.user_id+'";';
            console.log(query);
            pool.query(query);

            // The public URL can be used to directly access the file via HTTP.
            const publicUrl = format(
                `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            );
            res.status(200).json({
                publicURL: publicUrl,
                profile: blob.name
            });
        });
    
        blobStream.end(req.file.buffer);
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;















































 
// const storage = multer.diskStorage({
//     destination: "./public/uploads/",
//     filename: function(req, file, cb){
//        cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = mutler({
//     storage: storage,
//     limits: {fileSize: 1000000}
// }).single("myImage")

// router.post("/profile/upload", async (res, req) => {
//     try {
//         app.post('/profile', upload.single('profileImage'), (req, res, next) => {
//             const file = req.file
//             if (!file) {
//                 const error = new Error('Please upload a file')
//                 error.httpStatusCode = 400
//                 return next(error)
//             }
//             res.send(file)
//         })
//     } catch (error) {
//         res.status(500).send({message: 'Upload Error!'});
//     }
// })

// const upload = multer({
//     storage: storage,
//     limits:{fileSize: 1000000},
// }).single("image");

// router.post("/profile", {
//     upload(req, res, image = (err) => {
//         console.log("Request ---", req.body);
//         console.log("Request file ---", req.file);
//         if(!err)
//             return res.send(200).end();
//     });
// });

// router.post("/upload", {
//     upload(req, res, (err) => {
//        console.log("Request ---", req.body),
//        console.log("Request file ---", req.file),//Here you get file.
//        /*Now do where ever you want to do*/
//        if(!err)
//           return res.send(200).end();
//     });
//  };);