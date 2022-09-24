﻿require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');  
const cors = require('cors');
const errorHandler = require('./_middleware/error-handler');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// AUTH
app.use('/api/auth', require('./auth/auth.controller'));
// USER
app.use('/api/user', require('./user/user.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));