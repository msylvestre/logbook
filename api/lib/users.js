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
  this.login = function(email, password, callback) {

    var pgClient = new pg.Client(dbConfig);

    var sql    = 'SELECT id, info FROM logbook_user WHERE info ->> \'email\' = $1 and info ->> \'password\' = $2';
    var params = [
      email,
      password
    ];

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

              konsole.log(JSON.stringify(result, null, 2));

              if (result.rowCount == 0) {
                callback(false, 'Wrong creds or user not found.');  // User Not Found
              }
              else {
                callback(true, null);  // Template found
              }

            });

          }


        });

      }      
            
    });

  };

  this.createDriver = function(role) {

    var sql = 'INSERT INTO orders (info)' +
              'VALUES ($1)';

    var param = ['{ "customer": "John Doe", "items": {"product": "Beer","qty": 6}}'];

  };

};

module.exports = new User();