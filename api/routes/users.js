"use strict";

var express     = require('express');
var router      = express.Router();
var bodyParser  = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });  // Create application/x-www-form-urlencoded parser



// Get the List of users
//--------------------------------------------------------------------------
router.get('/', function (req, res) {

  res.end("You reached GET /api/users");

});



// Create a new user (Register)
//--------------------------------------------------------------------------
router.post('/', urlencodedParser, function (req, res) {

  res.end("You reached POST /api/users");
    
});



// Login a user
//--------------------------------------------------------------------------
router.get('/login/', urlencodedParser, function (req, res) {

  // TEST : http://127.0.0.1:8081/api/users/login?username=msylvestre&password=123456789q

  var username = req.query.username;
  var password = req.query.password;

  res.end("You reached GET /api/users/login/\n" + "username: " + username + "\npassword: " + password);
    
});


module.exports = router;