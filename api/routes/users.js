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

  var userInfo = {
    firstname: req.body.firstname,
    lastname:  req.body.lastname,
    email:     req.body.email,
    password:  req.body.response,
    role:      req.body.role,
    car: {
      brand: req.body.carBrand,
      model: req.body.carModel,
      year: req.body.carYear,
      color: req.body.carColor,
      drivetrain: req.body.carDrivetrain
    }
  };
    
  var response;

  konsole.log(JSON.stringify(req.body, null, 2));

  user.create(userInfo, function(isRegistrationValid, reasonIfInvalid) {

    if (isRegistrationValid) {
      response = {
        statusCode:200,
        msg: "registrationSuccess",
        description: "User Registration is Succesful."
      }
    }
    else {
      response = {
        statusCode:404,
        msg: "RegistrationFail",
        description: reasonIfInvalid
      }
    }
    res.statusCode = response.statusCode;
    res.send(response);
  
  });
    
});


// Login a user
//--------------------------------------------------------------------------
router.post('/login/', urlencodedParser, function (req, res) {

  var email = req.body.email;
  var password = req.body.password;
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
    res.statusCode = response.statusCode;
    res.send(response);

  });
   
});


// Get the List of users
//--------------------------------------------------------------------------
router.get('/', function (req, res) {

  var response;

  user.getList(function(list, err) {

    if (err) {
      response = {
        statusCode:404,
        msg: "getListFail",
        description: err,
        payload: null
      };

    }
    else {
      response = {
        statusCode:200,
        msg: "getListSuccess",
        description: "User list retreived succesfully.",
        payload: list
      };

    }
    
    console.log(JSON.stringify(response, null, 2));
    res.statusCode = response.statusCode;
    res.send(response);

  })

});


// Get a user
//--------------------------------------------------------------------------
router.get('/:id', function (req, res) {

  res.end("You reached GET /api/users/:id");

});


// Delete a user
//--------------------------------------------------------------------------
router.delete('/:id', function (req, res) {

  var response;

  user.delete(req.params.id, function(err) {

    if (err) {
      response = {
        statusCode:404,
        msg: "deleteFail",
        description: err
      };

    }
    else {
      response = {
        statusCode:200,
        msg: "deleteSuccess",
        description: "User deleted succesfully."
      };

    }
    
    console.log(JSON.stringify(response, null, 2));
    res.statusCode = response.statusCode;
    res.send(response);

  })

});


module.exports = router;