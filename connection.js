
var mysql = require('mysql');

function Connection() {
  this.pool = null;
  
  this.init = function() {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: process.env.MYSQL_HOST || 'tkck4yllxdrw0bhi.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      user: process.env.MYSQL_USER || 'f6k1nzlyv3i11dqt',
      password: process.env.MYSQL_PASSWORD || 'om39zbi65di6p4jv',
      database: process.env.MYSQL_DB || 'g0iredidhu6mae2k',
      port: process.env.MYSQL_PORT || '3306'
    });
  };

// Connect Dev to Prod
/*  this.init = function() {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: process.env.MYSQL_HOST || 'vhw3t8e71xdz9k14.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      user: process.env.MYSQL_USER || 'tyrprj1alvv0rp4p',
      password: process.env.MYSQL_PASSWORD || 'm0ejv1kotn6bdv7h',
      database: process.env.MYSQL_DB || 'ah3dpz0d67278it9',
      port: process.env.MYSQL_PORT || '3306'
    });
  };*/

  this.acquire = function(callback) {
    this.pool.getConnection(function(err, connection) {
      if (err) throw err;
      callback(err, connection);
    });
  };
}

module.exports = new Connection();

//mysql://tyrprj1alvv0rp4p:m0ejv1kotn6bdv7h@vhw3t8e71xdz9k14.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ah3dpz0d67278it9