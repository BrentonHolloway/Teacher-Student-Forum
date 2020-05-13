var express = require('express');
const bodyParser = require('body-parser');
const mysql = require('promise-mysql');
var router = express.Router();

// Automatically parse request body as form data.
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

/* GET home page. */
router.get('/server', async (req, res) => {
  res.send({status: "API Server is Running"});
});

let pool;
const createPool = async () => {
  pool = await mysql.createPool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME,
    
    // If connecting via unix domain socket, specify the path
    //socketPath: process.env.DB_CONNECTION,

    
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

router.get('/database', async (req, res) => {
  try {
    const statusQuery = 'select 1';
    var status = await pool.query(statusQuery);

    res.status(200).send({status: "Database Connection is Up"}).end();
  } catch (error) {
      res.status(500).send({status: 'Connection error!'}).end();
  }
})

module.exports = router;
