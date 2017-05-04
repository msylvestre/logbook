var Session = function () {

  var pg      = require('pg');
  var konsole = require('../lib/konsole.js');

  // ----- Read Environment Config -----------------------------

  var env      = process.env.LOGBOOK_ENV || 'local';
  var config   = (env == 'local' ? require('../../config.local.json') : (env == 'prod' ? require('../../config.prod.json') : 'Error with environment variable CONNECTIVITY_ENV'));
  var dbConfig = {
    user:     config.postgres.db.user,
    database: config.postgres.db.database,
    password: config.postgres.db.password, 
    host:     config.postgres.db.host,
    port:     config.postgres.db.port
  };


  //-------------------------------------------------------------------------------------------------------
  this.add = function(userId, sessionInfo, callback) {

    var sql = 'INSERT INTO session (user_id, info) VALUES ($1, $2)';

    var params = [userId, sessionInfo];

    var pgClient = new pg.Client(dbConfig);

    pgClient.connect(function (err) {

      if (err) {
        konsole.log(err);
        callback(err.toString());
      }
      else {

        pgClient.query(sql, params, function (err, result) {

          if (err) {
            var errorMsg = err.toString();
            konsole.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            konsole.log(err);
            konsole.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

            pgClient.end(function(err) {
              if (err) konsole.log(err);
              callback(errorMsg);
            });
          }
          else {

            pgClient.end(function (err) {                       // disconnect the client 
              
              if (err) konsole.log(err);

              //konsole.dir(JSON.stringify(result, null, 2));

              if (result.rowCount == 0) {
                callback('Session creation failed'); 
              }
              else {
                callback(null);  // Sessions created, no error
              }

            });

          }

        });

      }      
            
    });

  };


  //-------------------------------------------------------------------------------------------------------
  this.getList = function(userId, callback) {

    var sql = 'SELECT * FROM session where user_id = $1'

    var params = [userId];

    var pgClient = new pg.Client(dbConfig);

    pgClient.connect(function (err) {

      if (err) {
        konsole.log(err);
        callback(false, err.toString());
      }
      else {

        pgClient.query(sql, params, function (err, result) {

          if (err) {
            var errorMsg = err.toString();
            konsole.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            konsole.log(err);
            konsole.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

            pgClient.end(function(err) {
              if (err) konsole.log(err);
              callback(false, errorMsg);
            });
          }
          else {

            pgClient.end(function (err) {                       // disconnect the client 
              if (err) konsole.log(err);
              //konsole.dir(JSON.stringify(result.rows, null, 2));
              callback(result.rows, null);  // Return list of sessions for a users
            });

          }


        });

      }      
            
    });
  
  };


  //-------------------------------------------------------------------------------------------------------
  this.get = function(userId, sessionId, callback) {

    var sql = 'SELECT * FROM session where user_id  = $1 and id = $2'

    var params = [userId, sessionId];

    var pgClient = new pg.Client(dbConfig);

    pgClient.connect(function (err) {

      if (err) {
        konsole.log(err);
        callback(false, err.toString());
      }
      else {

        pgClient.query(sql, params, function (err, result) {

          if (err) {
            var errorMsg = err.toString();
            konsole.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            konsole.log(err);
            konsole.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

            pgClient.end(function(err) {
              if (err) konsole.log(err);
              callback(false, errorMsg);
            });
          }
          else {

            pgClient.end(function (err) {                       // disconnect the client 
              if (err) konsole.log(err);
              
              //konsole.dir(JSON.stringify(result.rows, null, 2));

              if (result.rowCount == 0) {
                callback(null, 'Session id ' + sessionId + ' for user id ' + userId + ' not found.');  //Session Not Found
              }
              else {
                callback(result.rows[0], null);  // Session found
              }

            });

          }

        });

      }      
            
    });

  }


  //-------------------------------------------------------------------------------------------------------
  this.search = function(userId, criteria, value, callback) {

    var pgClient = new pg.Client(dbConfig);

    var sql      = 'SELECT id, user_id, info ' +
                   'FROM session ' +
                   'WHERE user_id = $1 AND info ->> \'' + criteria + '\' like $2';
    var params   = [userId, value];

    pgClient.connect(function (err) {

      if (err) {
        konsole.log(err);
        callback(false, err.toString());
      }
      else {

        pgClient.query(sql, params, function (err, result) {

          if (err) {
            var errorMsg = err.toString();
            konsole.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            konsole.log(err);
            konsole.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

            pgClient.end(function(err) {
              if (err) konsole.log(err);
              callback(false, errorMsg);
            });
          }
          else {

            pgClient.end(function (err) {                       // disconnect the client 
              
              if (err) konsole.log(err);

              if (result.rowCount == 0) {
                callback(null, 'No user found.');  // User Not Found
              }
              else {
                callback(result.rows, null);  // Template found
              }

            });

          }


        });

      }      
            
    });

  };


  //-------------------------------------------------------------------------------------------------------
  this.update = function(userId, sessionId, sessionInfo, callback) {

    var sql = 'UPDATE session SET info = $1 WHERE user_id = $2 AND id = $3';

    var params = [sessionInfo, userId, sessionId];

    var pgClient = new pg.Client(dbConfig);

    pgClient.connect(function (err) {

      if (err) {
        konsole.log(err);
        callback(err.toString());
      }
      else {

        pgClient.query(sql, params, function (err, result) {

          if (err) {
            var errorMsg = err.toString();
            konsole.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            konsole.log(err);
            konsole.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

            pgClient.end(function(err) {
              if (err) konsole.log(err);
              callback(errorMsg);
            });
          }
          else {

            pgClient.end(function (err) {                       // disconnect the client 
              
              if (err) konsole.log(err);
              //konsole.dir(JSON.stringify(result, null, 2));
              if (result.rowCount == 0) {
                callback('No session updated.  Id ' + sessionId + ' not found');  // Sesion Not Found
              }
              else {
                callback(null);  // Session updated succesfully
              }

            });

          }


        });

      }      
            
    });

  }


  //-------------------------------------------------------------------------------------------------------
  this.delete = function(userId, sessionId, callback) {

    var sql = 'DELETE FROM session WHERE user_id = $1 and id = $2'

    var params = [userId, sessionId];

    var pgClient = new pg.Client(dbConfig);

    pgClient.connect(function (err) {

      if (err) {
        konsole.log(err);
        callback(false, err.toString());
      }
      else {

        pgClient.query(sql, params, function (err, result) {

          if (err) {
            var errorMsg = err.toString();
            konsole.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            konsole.log(err);
            konsole.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

            pgClient.end(function(err) {
              if (err) konsole.log(err);
              callback(false, errorMsg);
            });
          }
          else {

            pgClient.end(function (err) {                       // disconnect the client 
              if (err) konsole.log(err);
              //konsole.dir(JSON.stringify(result, null, 2));

              if (result.rowCount == 0) 
                callback('Session id ' + sessionId + ' from user id ' + userId + ' is not found');  // Return list of users
              else
                callback(null);  // User deleted without error
            });

          }


        });

      }      
            
    });
  
  };

};

module.exports = new Session();