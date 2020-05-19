var express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const multer = require("multer");
var router = express.Router();

// Automatically parse request body as form data.
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

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

router.post("/profile", async (res, req) => {
    try {
        app.post('/profile', upload.single('profileImage'), (req, res, next) => {
            const file = req.file
            if (!file) {
                const error = new Error('Please upload a file')
                error.httpStatusCode = 400
                return next(error)
            }
            res.send(file)
        })
    } catch (error) {
        res.status(500).send({message: 'Upload Error!'});
    }
})

router.get("/uploads/profile/:image", asunc (res,req) => {
    try {

    } catch (error) {
        res.status(500).send({message: 'File Not Found!'})
    }
})

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


 module.exports = router;