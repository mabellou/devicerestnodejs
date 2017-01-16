
var connection = require('../connection');

function Statistics() {
};

Statistics.create = function(type, value, callback) {
  connection.acquire(function(err, con) {
    con.query('insert into statistics (type, value, timestamp) values (?,?,NOW())', [type, value], function(err) {
      if (err) { return callback(err); }
      con.release();
      callback();
    });
  });  
};

module.exports = Statistics;