require('dotenv').config();
const { PORT = 4000 } = process.env;
const express = require('express');
const server = express();
const path = require('path');

//Require Cors in order to allow the frontend to make requests
const cors = require('cors');

server.use(express.json());

server.use(express.static(path.join(__dirname, 'public')));

//Allows front end to interact with back end
server.use(cors({
  origin: process.env.CORS_ORIGIN
}));

//Logging Middleware
const morgan = require('morgan');
server.use(morgan('dev'));

//Body Logging Middleware
server.use((req, res, next) => {
  //Comment out console logs
  //console.log("<____Body Logger START____>");
  //console.log(req.body);
  //console.log("<_____Body Logger END_____>");
  next();
});

//Uses API
const apiRouter = require('./api');
server.use('/api', apiRouter);

const { client } = require('./db');
client.connect();

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});