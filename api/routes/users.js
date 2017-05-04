"use strict";

var express     = require('express');
var router      = express.Router();

var bodyParser  = require('body-parser');
var konsole     = require('../lib/konsole.js');
var user        = require('../models/users.js');
var session     = require('../models/sessions.js');

//var urlencodedParser = bodyParser.urlencoded({ extended: false });  // Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.json();


// Login a user
//--------------------------------------------------------------------------
router.post('/login', urlencodedParser, function (req, res) {

  var response;

  user.login(req.body, function(err) {

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


    konsole.log("------ POST /users/login ------");
    konsole.dir(JSON.stringify(response, null, 2));
    konsole.log("---------------------");

    res.statusCode = response.statusCode;
    res.send(response);

  });
   
});


// Create a new user (Register)
//--------------------------------------------------------------------------
router.post('/', urlencodedParser, function (req, res) {

  var userInfo = req.body;
    
  var response;

  user.create(userInfo, function(err) {

    if (err) {
      response = {
        statusCode:404,
        msg: "createUserFail",
        description: err,
        payload : userInfo
      }
    }
    else {
      response = {
        statusCode:200,
        msg: "createUserSuccess",
        description: "User Registration was succesful.",
        payload : userInfo
      }
    }

    
    konsole.log("---- POST /users - Create User ----");
    konsole.dir(JSON.stringify(response, null, 2));
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

    
    konsole.log("------ POST /users - Search -------");
    konsole.dir(JSON.stringify(response, null, 2));
    konsole.log("---------------------");

    res.statusCode = response.statusCode;
    res.send(response);

  });
   
});


// Update a user
//--------------------------------------------------------------------------
router.put('/:id', urlencodedParser, function (req, res) {

  var userInfo = req.body;    
  var response;

  user.update(req.params.id, userInfo, function(err) {

    if (err) {
      response = {
        statusCode:404,
        msg: "updateUserFail",
        description: err,
        payload : null
      }
    }
    else {
      response = {
        statusCode:200,
        msg: "updateUserSuccess",
        description: "User update was succesful.",
        payload : userInfo
      }
    }
    
    konsole.log("--- PUT /users - Update user info ---");
    konsole.dir(JSON.stringify(response, null, 2));
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
    
    konsole.log("------ GET /users - Get users list ------");
    konsole.dir(JSON.stringify(response, null, 2));
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
    
    konsole.log("------ GET /users/:id - Get a user -----");
    konsole.dir(JSON.stringify(response, null, 2));
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
    
    konsole.log("----- DELETE /users/:id ------");
    konsole.dir(JSON.stringify(response, null, 2));
    konsole.log("---------------------");

    res.statusCode = response.statusCode;
    res.send(response);

  });

});




//==========================================================================
//==========================================================================

//                               SESSIONS

//==========================================================================
//==========================================================================




// Create a new session
//--------------------------------------------------------------------------
router.post('/:id/sessions', function (req, res) {

  var sessionInfo = req.body;    
  var response;

  session.add(req.params.id, sessionInfo, function(err) {

    if (err) {
      response = {
        statusCode:404,
        msg: "addSessionFail",
        description: err,
        payload : sessionInfo
      }
    }
    else {
      response = {
        statusCode:200,
        msg: "addSessionSuccess",
        description: "User Registration was succesful.",
        payload : sessionInfo
      }
    }

    
    konsole.log("---- Create Session ----");
    konsole.dir(JSON.stringify(sessionInfo, null, 2));
    konsole.dir(JSON.stringify(response, null, 2));
    konsole.log("------------------------");

    res.statusCode = response.statusCode;
    res.send(response);
  
  });
    
});


// Get the List of sessions for a user
//--------------------------------------------------------------------------
router.get('/:userId/sessions', function (req, res) {

  var response;

  session.getList(req.params.userId, function(list, err) {

    if (err) {
      response = {
        statusCode:404,
        msg: "getSessionsListFail",
        description: err,
        payload: null
      };

    }
    else {
      response = {
        statusCode:200,
        msg: "getSessionsListSuccess",
        description: "User list retreived succesfully.",
        payload: list
      };

    }
    
    konsole.log("------ GET /users/:id/sessionst ------");
    konsole.dir(JSON.stringify(response, null, 2));
    konsole.log("--------------------------------------");

    res.statusCode = response.statusCode;
    res.send(response);

  })

});


// Get a session
//--------------------------------------------------------------------------
router.get('/:userId/sessions/:id', function (req, res) {

  var response;

  session.get(req.params.userId, req.params.id, function(userInfo, err) {

    if (err) {
      response = {
        statusCode:404,
        msg: "getSessionFail",
        description: err,
        payload: null
      };

    }
    else {
      response = {
        statusCode:200,
        msg: "getSessionSuccess",
        description: "User info retreived succesfully.",
        payload: userInfo
      };

    }
    
    konsole.log("------ GET /users/:userId/sessions/:id -----");
    konsole.dir(JSON.stringify(response, null, 2));
    konsole.log("--------------------------------------------");

    res.statusCode = response.statusCode;
    res.send(response);

  });

});


// Search a session
//--------------------------------------------------------------------------
router.post('/:id/sessions/search', urlencodedParser, function (req, res) {

  var criteria = req.body.criteria;
  var value    = req.body.value;
  var response;

  session.search(criteria, value, function(list, err) {

    if (err) {
      response = {
        statusCode:404,
        msg: "searchSessionFail",
        description: err
      }
    }
    else {
      response = {
        statusCode:200,
        msg: "searchSessionSuccess",
        description: "Search Session was Succesful.",
        payload: list
      }
    }

    
    konsole.log("------ POST /users/:id/sessions/search ------");
    konsole.dir(JSON.stringify(response, null, 2));
    konsole.log("---------------------------------------------");

    res.statusCode = response.statusCode;
    res.send(response);

  });
   
});


// Delete a session
//--------------------------------------------------------------------------
router.delete('/:userId/sessions/:id', function (req, res) {

  var response;

  session.delete(req.params.userId, req.params.id, function(err) {

    if (err) {
      response = {
        statusCode:404,
        msg: "deleteSessionFail",
        description: err
      };

    }
    else {
      response = {
        statusCode:200,
        msg: "deleteSessionSuccess",
        description: "User deleted succesfully."
      };

    }
    
    konsole.log("----- DELETE /users/:userId/session/:id ------");
    konsole.dir(JSON.stringify(response, null, 2));
    konsole.log("---------------------");

    res.statusCode = response.statusCode;
    res.send(response);

  });

});


module.exports = router;