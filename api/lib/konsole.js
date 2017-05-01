"use strict";

var fs = require('fs');
var dateFormat = require('date-format');


var Konsole = function () {

  var logFile      = "../result.log";
  var logInFile    = false;
  var logInConsole = true;
  var logInMemory  = false;

  var memoryLog = "";

 
  //-------------------------------------------------------------------------------------------------------
  this.setOption = function(logInConsoleOption, logInFileOption, logInMemoryOption) {
    logInFile     = logInFileOption;
    logInConsole  = logInConsoleOption;
    logInMemory   = logInMemoryOption;
  };


  //-------------------------------------------------------------------------------------------------------
  this.log = function(data) {
    
    var dataWithTimestamp = data //getTimestamp() + ' -- ' + data;


    if (!logInConsole && !logInFile && !logInMemory) {
      throw new Error("No logging option at all !")
    }

    if (logInConsole) {
      console.log(dataWithTimestamp);
    }

    if (logInFile) {

      dataWithTimestamp += "\n";

      fs.appendFile(logFile, dataWithTimestamp, function (err) {
        if (err) console.error(err);
      });
    }

    if (logInMemory) {
      memoryLog = dataWithTimestamp + "\n" + memoryLog;
    }

  }


  //-------------------------------------------------------------------------------------------------------
  this.dir = function(data) {
    
    var dataWithTimestamp = data //getTimestamp() + ' -- ' + data;


    if (!logInConsole && !logInFile && !logInMemory) {
      throw new Error("No logging option at all !")
    }

    if (logInConsole) {
      console.dir(JSON.parse(dataWithTimestamp), {depth: null, colors: true});
      //console.log(dataWithTimestamp);
    }

    if (logInFile) {

      dataWithTimestamp += "\n";

      fs.appendFile(logFile, dataWithTimestamp, function (err) {
        if (err) console.error(err);
      });
    }

    if (logInMemory) {
      memoryLog = dataWithTimestamp + "\n" + memoryLog;
    }

  }


  //-------------------------------------------------------------------------------------------------------
  this.getMemoryLog = function() {
    return memoryLog;
  };


  //-------------------------------------------------------------------------------------------------------
  this.clearMemoryLog = function() {
    memoryLog = "";
    return memoryLog;
  };


  //-------------------------------------------------------------------------------------------------------
  function getTimestamp() {
    return dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
  };

};

module.exports = new Konsole();