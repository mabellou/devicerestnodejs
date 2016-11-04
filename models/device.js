
var connection = require('../connection');

function Device() {
};

Device.get = function(res) {
    connection.acquire(function(err, con) {
    con.query('select * from device', function(err, result) {
      con.release();
      res.send(result);
    });
  });  
};

Device.findByBadge = function(badgeId, callback) {
  connection.acquire(function(err, con) {
    con.query('select * from device where device.badgeid = ? limit 1', [badgeId], function(err, rows) {
      if (err) { return callback(err); }
      con.release();
      callback(null, rows[0]);
    });
  });  
};

module.exports = Device;