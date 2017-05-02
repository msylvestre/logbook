var User = function () {

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
  this.login = function(creds, callback) {

    var pgClient = new pg.Client(dbConfig);

    var sql    = 'SELECT id, info FROM logbook_user WHERE info ->> \'email\' = $1 and info ->> \'password\' = $2';
    var params = [
      creds.email,
      creds.password
    ];

    pgClient.connect(function (err) {

      if (err) {
        konsole.log(err);
        callback(false, err.toString());
      }
      else {

        pgClient.query(sql, params, function (err, result) {

          if (err) {
            konsole.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            konsole.log(err);
            konsole.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

            pgClient.end(function(err) {
              if (err) {
                konsole.log(err);
                callback(err.toString());
              }
              callback(err.toString());
            });
          }
          else {

            pgClient.end(function (err) {                       // disconnect the client 
              
              if (err) {
                konsole.log(err);
                callback(err.toString());
              }

              if (result.rowCount == 0) {
                callback('Wrong creds or user not found.');  // User Not Found
              }
              else {
                callback(null);  // Template found
              }

            });

          }


        });

      }      
            
    });

  };


  //-------------------------------------------------------------------------------------------------------
  this.create = function(user, callback) {

    var sql = 'INSERT INTO logbook_user (info) VALUES ($1)';

    var params = [user];

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

              if (result.rowCount == 0) {
                callback('User creation failed');  // User Not Found
              }
              else {
                callback(null);  // Template found
              }

            });

          }


        });

      }      
            
    });

  };


  //-------------------------------------------------------------------------------------------------------
  this.search = function(email, callback) {

    var pgClient = new pg.Client(dbConfig);

    var sql    = 'SELECT id, info FROM logbook_user WHERE info ->> \'email\' like $1';
    var params = [email];

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
  this.update = function(id, user, callback) {

    var sql = 'UPDATE logbook_user SET info = $1 WHERE id =$2';

    var params = [user, id];

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

              if (result.rowCount == 0) {
                callback('No user updated.  Id not found');  // User Not Found
              }
              else {
                callback(null);  // Template found
              }

            });

          }


        });

      }      
            
    });

  }


  //-------------------------------------------------------------------------------------------------------
  this.get = function(id, callback) {
  

    var sql = 'SELECT * FROM logbook_user where id  = $1'

    var params = [id];

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
                callback(null, 'User id not found.');  //User Not Found
              }
              else {
                callback(result.rows, null);  // User found
              }

            });

          }

        });

      }      
            
    });

  }


  //-------------------------------------------------------------------------------------------------------
  this.getList = function(callback) {

    var sql = 'SELECT * FROM logbook_user'

    var params = null;

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
              callback(result.rows, null);  // Return list of users
            });

          }


        });

      }      
            
    });
  
  };


  //-------------------------------------------------------------------------------------------------------
  this.delete = function(id, callback) {

    var sql = 'DELETE FROM logbook_user WHERE id = $1'

    var params = [id];

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
                callback("User id not found : " + id);  // Return list of users
              else
                callback(null);  // Return list of users
            });

          }


        });

      }      
            
    });
  
  };


};


module.exports = new User();