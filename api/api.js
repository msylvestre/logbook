"use strict";

var express = require('express');
var app     = express();

// Initialize the routing
var root_route      = require('./routes/root.js');
var users_route     = require('./routes/users.js');
var sessions_route  = require('./routes/sessions.js');

app.use('/api/',         root_route);
app.use('/api/users',    users_route);
app.use('/api/sessions', sessions_route);


// Start the server
var server = app.listen(8081, function () {

   console.log("Racing Logbook API is listening at http://127.0.0.1:" + server.address().port + "/api/");

});