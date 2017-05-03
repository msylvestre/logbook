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
  this.add = function(sessionInfo, callback) {

    var sql = 'INSERT INTO session (info) VALUES ($1)';

    var params = [sessionInfo];

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

};

module.exports = new Session();