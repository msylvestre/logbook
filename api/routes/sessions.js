"use strict";

var express     = require('express');
var router      = express.Router();
var bodyParser  = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });  // Create application/x-www-form-urlencoded parser



// GET /api/session
//--------------------------------------------------------------------------
router.get('/', function (req, res) {

  res.end("You reached GET /api/sessions");

});



// POST /<solution>/load
//--------------------------------------------------------------------------
router.post('/new', urlencodedParser, function (req, res) {

  res.end("You reached POST /api/sessions");
    
});


module.exports = router;