
var mysql = require('mysql');
 
function Connection() {
  this.pool = null;
 
  this.init = function() {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: 'vhw3t8e71xdz9k14.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      user: 'tyrprj1alvv0rp4p',
      password: 'm0ejv1kotn6bdv7h',
      database: 'ah3dpz0d67278it9',
      port: '3306'
    });
  };
 
  this.acquire = function(callback) {
    this.pool.getConnection(function(err, connection) {
      if (err) throw err;
      callback(err, connection);
    });
  };
}
 
module.exports = new Connection();