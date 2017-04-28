"use strict";

var express     = require('express');
var router      = express.Router();

var bodyParser  = require('body-parser');
var konsole     = require('../lib/konsole.js');
var user        = require('../lib/users.js');

var urlencodedParser = bodyParser.urlencoded({ extended: false });  // Create application/x-www-form-urlencoded parser




// Create a new user (Register)
//--------------------------------------------------------------------------
router.post('/', urlencodedParser, function (req, res) {

  res.end("You reached POST /api/users");
    
});


// Login a user
//--------------------------------------------------------------------------
router.get('/login/', urlencodedParser, function (req, res) {

  // TEST : http://127.0.0.1:8081/api/users/login?email=marco@venzee.com&password=123456789q

  var email = req.query.email;
  var password = req.query.password;
  var response;

  user.login(email, password, function(isValidUser, reasonIfInvalid) {


    if (isValidUser) {

      response = {
        statusCode:200,
        msg: "loginSuccess",
        description: "User Login is Succesful."
      }

    }
    else {

      response = {
        statusCode:404,
        msg: "loginFail",
        description: reasonIfInvalid
      }

    }

    //console.log(JSON.stringify(response, null, 2));

    res.statusCode = response.statusCode;
    res.send(response);

  });


  /*
  ERROR Structure
  ------------------------------------------------------------------
  {
    "error": {
      "name": "ResourceNotFound",
      "message": "The requested resource does not exist.",
      "@context": "/contexts/Error.jsonld",
      "@id": "/errors/ResourceNotFoundError",
      "code": 4000008,
      "statusDescription": "Not Found",
      "status": 404,
      "statusCode": 404
    }
  }
  RESPONSE CODE : 404


  SUCCESS Structure
  ------------------------------------------------------------------
  {
    "access_token": "WpSHuqzniHFoUi1ahhFShLwh6IPYlp7k",
    "expires_in": 360000,
    "token_type": "Bearer"
  }

  RESPONSE CODE : 200
  */
   
});


// Get the List of users
//--------------------------------------------------------------------------
router.get('/', function (req, res) {

  res.end("You reached GET /api/users");

});



module.exports = router;