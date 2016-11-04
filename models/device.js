
var connection = require('../connection');

function Device(attributes) {
  var self = this;
  Object.keys(attributes).forEach(function(key){
      self[key] = attributes[key];
  });
  this.status = this.status || "available";

  this.assignTo = function(userId, callback) {
    var self = this;
    connection.acquire(function(err, con) {
      con.query('insert into device_status_user (deviceid, userid, status, startdate) values (?, ?, "inuse", NOW())', [self.id, userId], function(err, rows) {
        if (err) { return callback(err); }
        con.release();
        callback(null);
      });
    });  
  };

  this.release = function(callback) {
    var self = this;
    connection.acquire(function(err, con) {
      con.query('insert into device_status_user (deviceid, userid, status, startdate) values (?, null, "available", NOW())', [self.id], function(err, rows) {
        if (err) { return callback(err); }
        con.release();
        callback(null);
      });
    });  
  };

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
    con.query('select * from device left join device_status_user on device.id = device_status_user.deviceid where device.badgeid = ? order by startdate desc limit 1', [badgeId], function(err, rows) {
      if (err) { return callback(err); }
      con.release();
      callback(null, new Device(rows[0]));
    });
  });  
};

module.exports = Device;