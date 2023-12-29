const express = require('express');
const multer = require('multer');
const bodyparser = require('body-parser');
const requestIp = require('request-ip');
const dotenv = require('dotenv').config();
const app = express();
const redis = require("redis");
const util = require("util");
const joi = require('joi');

app.use(express.json());
//mongoose connection
const connectDb = require('./mongoose')
connectDb()

//port config
const port = process.env.port || 3000;

//midleware config
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


//mideleware setup
const myroute = require('./routes/userRoute');
app.use('/task', myroute)

//ip address
app.get('/ip', (req, res) => {
  var clientIp = requestIp.getClientIp(req)
  res.send(`Your IP Address is ${clientIp}.`)
})

//server config
app.listen(port,()=>{
  console.log(`server running on http://localhost:${port}`);
});