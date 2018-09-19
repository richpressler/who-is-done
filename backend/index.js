'use strict';

require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');

// Create express instance
const app = express();

// Set configuration variables
const skipLogging = ['/node_modules', '/app'];
const appBase = __dirname + '/../dist/who-is-done/';
const appPort = process.env.PORT || 3010;

// Configure plugins
app.use(morgan('dev', {
    skip: (req, res) => skipLogging.indexOf(req.baseUrl) !== -1
}));
app.use(bodyParser.json())
app.use(session({
    secret: 'LEH t6HBT QZ',
    resave: false,
    saveUninitialized: true
}));

// Configure front-end code handling
app.set('views', appBase);
app.engine('html', require('ejs').renderFile);
app.use(express.static(appBase));
app.use('/node_modules', express.static('node_modules'));

// API routes

// Default route to serve up index.html
app.get('/*', function (req, res) {
    res.render('index.html');
});

// Fire it up!
app.listen(appPort, function () {
    console.log(`WhoIsDone app listening on port ${appPort}!`);
});
