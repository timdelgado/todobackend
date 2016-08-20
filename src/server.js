// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var mongoose = require('mongoose');
var routes = require('./todo/routes');


var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.use('/api/todos', routes);

app.listen(Number(process.env.PORT || 8080));



