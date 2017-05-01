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

};


module.exports = new Session();