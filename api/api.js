"use strict";

var express = require('express');
var app     = express();

var bodyParser = require('body-parser');

// Initialize the routing
var root_route      = require('./routes/root.js');
var users_route     = require('./routes/users.js');

app.use(bodyParser.json());
app.use('/api/',         root_route);
app.use('/api/users',    users_route);


// Start the server
var server = app.listen(8081, function () {
   console.log("Racing Logbook API is listening at http://127.0.0.1:" + server.address().port + "/api/");
});