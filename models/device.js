
var connection = require('../connection');
var moment = require('moment');

function Device(attributes) {
  var self = this;
  Object.keys(attributes).forEach(function(key){
      self[key] = attributes[key];
  });
  if( !this.status || 
      (this.status == "inuse" && this.enddate) || 
      (this.status == "locked" && moment(this.startdate).isBefore(moment().substract(15, 'minutes'))))
    this.status = "available";

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
      con.query('update device_status_user set enddate=NOW() where deviceid=? and startdate=?', [self.id, self.startdate], function(err, rows) {
        if (err) { return callback(err); }
        con.release();
        callback(null);
      });
    });  
  };

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