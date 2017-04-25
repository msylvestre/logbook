"use strict";

var express = require('express');
var app     = express();
//var logger  = require('./util/logger.js');

// Initialize the routing
var root_route      = require('./routes/root.js');
var users_route     = require('./routes/users.js');
var sessions_route  = require('./routes/sessions.js');

app.use('/',         root_route);
app.use('/users',    users_route);
app.use('/sessions', sessions_route);


// Start the server
var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   logger.log("Racing Logbook API is listening at http://127.0.0.1:" + port);

});