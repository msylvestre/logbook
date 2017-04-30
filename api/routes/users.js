"use strict";

var express     = require('express');
var router      = express.Router();

var bodyParser  = require('body-parser');
var konsole     = require('../lib/konsole.js');
var user        = require('../lib/users.js');

var urlencodedParser = bodyParser.urlencoded({ extended: false });  // Create application/x-www-form-urlencoded parser




// Login a user
//--------------------------------------------------------------------------
router.post('/login', urlencodedParser, function (req, res) {

  var email = req.body.email;
  var password = req.body.password;
  var response;

  user.login(email, password, function(err) {

    if (err) {
      response = {
        statusCode:404,
        msg: "loginFail",
        description: err
      }
    }
    else {
      response = {
        statusCode:200,
        msg: "loginSuccess",
        description: "User Login is Succesful."
      }
    }


    konsole.log("------ Login ------");
    konsole.log(JSON.stringify(response, null, 2));
    konsole.log("---------------------");

    res.statusCode = response.statusCode;
    res.send(response);

  });
   
});


// Create a new user (Register)
//--------------------------------------------------------------------------
router.post('/', urlencodedParser, function (req, res) {

  var userInfo = {
    firstname: req.body.firstname,
    lastname:  req.body.lastname,
    email:     req.body.email,
    password:  req.body.password,
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

  user.create(userInfo, function(err) {

    if (err) {
      response = {
        statusCode:404,
        msg: "createUserFail",
        description: reasonIfInvalid
      }
    }
    else {
      response = {
        statusCode:200,
        msg: "createUserSuccess",
        description: "User Registration was succesful."
      }
    }

    
    konsole.log("---- Create User ----");
    konsole.log(JSON.stringify(response, null, 2));
    konsole.log("---------------------");

    res.statusCode = response.statusCode;
    res.send(response);
  
  });
    
});


// Search a user
//--------------------------------------------------------------------------
router.post('/search', urlencodedParser, function (req, res) {

  var email = req.body.email;
  var response;

  user.search(email, function(list, err) {

    if (err) {
      response = {
        statusCode:404,
        msg: "searchFail",
        description: err
      }
    }
    else {
      response = {
        statusCode:200,
        msg: "searchSuccess",
        description: "Search was Succesful.",
        payload: list
      }
    }

    
    konsole.log("------ Search -------");
    konsole.log(JSON.stringify(response, null, 2));
    konsole.log("---------------------");

    res.statusCode = response.statusCode;
    res.send(response);

  });
   
});


// Update a user
//--------------------------------------------------------------------------
router.put('/:id', urlencodedParser, function (req, res) {

  var userInfo = {
    firstname: req.body.firstname,
    lastname:  req.body.lastname,
    email:     req.body.email,
    password:  req.body.password,
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

  konsole.log("--- UserInfo to update ---");
  konsole.log(JSON.stringify(req.body, null, 2));
  konsole.log("---------------------");

  user.update(req.params.id, userInfo, function(err) {

    if (err) {
      response = {
        statusCode:404,
        msg: "updateUserFail",
        description: err
      }
    }
    else {
      response = {
        statusCode:200,
        msg: "updateUserSuccess",
        description: "User update was succesful."
      }
    }


    
    konsole.log("---- Update User ----");
    konsole.log(JSON.stringify(response, null, 2));
    konsole.log("---------------------");

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
    
    konsole.log("------ GetList ------");
    konsole.log(JSON.stringify(response, null, 2));
    konsole.log("---------------------");

    res.statusCode = response.statusCode;
    res.send(response);

  })

});


// Get a user
//--------------------------------------------------------------------------
router.get('/:id', function (req, res) {

  var response;

  user.get(req.params.id, function(userInfo, err) {

    if (err) {
      response = {
        statusCode:404,
        msg: "getUserFail",
        description: err,
        payload: null
      };

    }
    else {
      response = {
        statusCode:200,
        msg: "getUserSuccess",
        description: "User info retreived succesfully.",
        payload: userInfo
      };

    }
    
    konsole.log("------ Get User -----");
    konsole.log(JSON.stringify(response, null, 2));
    konsole.log("---------------------");

    res.statusCode = response.statusCode;
    res.send(response);

  });

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
    
    konsole.log("----- Delete User ------");
    konsole.log(JSON.stringify(response, null, 2));
    konsole.log("---------------------");

    res.statusCode = response.statusCode;
    res.send(response);

  });

});


module.exports = router;