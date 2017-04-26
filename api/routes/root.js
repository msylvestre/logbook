"use strict";

var express     = require('express');
var router      = express.Router();
var bodyParser  = require('body-parser');


// GET api/
//--------------------------------------------------------------------------
router.get('/', function (req, res) {

  res.end("You reached /api/");

});


module.exports = router;