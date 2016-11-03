
var mysql = require('mysql');
 
function Connection() {
  this.pool = null;
 
  this.init = function() {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      port: process.env.MYSQL_PORT
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

//mysql://tyrprj1alvv0rp4p:m0ejv1kotn6bdv7h@vhw3t8e71xdz9k14.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ah3dpz0d67278it9