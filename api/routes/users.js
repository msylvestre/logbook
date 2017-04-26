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

  var response = {
    statusCode:666,
    msg:"You reached GET /api/users/login/"
  }

  console.log(JSON.stringify(response, null, 2));

  res.statusCode = 200;
  res.send(response);

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


module.exports = router;