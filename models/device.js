var connection = require('../connection');
var moment = require('moment');

function Device(attributes) {
  var self = this;
  Object.keys(attributes).forEach(function(key){
    self[key] = attributes[key];
  });

  if( (!this.status) || 
    (this.status == "inuse" && this.enddate) || 
    (this.status == "locked" && moment(this.statusdate).isBefore(moment().subtract(15, 'minutes')))){
    this.status = "available";
  this.userid = null;
  this.firstname = null;
  this.lastname = null;
}


this.assignTo = function(userId, callback) {
  var self = this;
  connection.acquire(function(err, con) {
    con.query('insert into device_status_user (deviceid, userid, status, startdate) values (?, ?, "inuse", NOW())', [self.id, userId], function(err, rows) {
      if (err) { return callback(err); }
      con.release();
      callback(null, true, false);
    });
  });  
};

this.release = function(callback) {
  var self = this;
  connection.acquire(function(err, con) {
    con.query('insert into device_status_user (deviceid, userid, status, startdate, enddate) values (?,null,?,NOW(),null)', [self.id, "available"], function(err, rows) {
      if (err) { return callback(err); }
      con.release();
      callback(null, false, true);
    });
  });  
};

};

Device.findByBadge = function(badgeId, callback) {
  connection.acquire(function(err, con) {
    con.query('select * from device left join (select deviceid, userid, status, last_status.startdate as statusdate, firstname, lastname from (Select dsu.deviceid, dsu.userid, dsu.status, dsu2.startdate From device_status_user dsu Inner Join (Select deviceid,max(startdate) as startdate From device_status_user Group By deviceid) dsu2 On dsu.deviceid = dsu2.deviceid And dsu.startdate = dsu2.startdate) last_status left join user on user.id = last_status.userid)  last_device_user on device.id = last_device_user.deviceid where device.badgeid=?', [badgeId], function(err, rows) {
      if (err) { return callback(err); }
      con.release();
      var newDevice = null;
      if (rows[0])
        newDevice = new Device(rows[0]);
      callback(null, newDevice);
    });
  });  
};

Device.findByUserByStatus = function(userId, devices, status, callback) {
  
  var count = 0;
  for(var i = 0; i < devices.length; ++i){
    if(devices[i].status === status && devices[i].userid === userId )
      count++;
  }

  callback(null, count); 
};

Device.findAll = function(callback) {
  connection.acquire(function(err, con) {
    con.query('select * from device left join (select deviceid, userid, status, last_status.startdate as statusdate, firstname, lastname from (Select dsu.deviceid, dsu.userid, dsu.status, dsu2.startdate From device_status_user dsu Inner Join (Select deviceid,max(startdate) as startdate From device_status_user Group By deviceid) dsu2 On dsu.deviceid = dsu2.deviceid And dsu.startdate = dsu2.startdate) last_status left join user on user.id = last_status.userid)  last_device_user on device.id = last_device_user.deviceid', function(err, rows) {
      if (err) { return callback(err, rows); }
      var devices = rows.map(function (row) {
        return new Device(row);
      });
      callback(null, devices);
      con.release();
    });
  });  
};

Device.findAllUsedOrLocked = function(callback) {
  connection.acquire(function(err, con) {
    con.query('select deviceid, status, userid from device left join (select deviceid, userid, status, last_status.startdate as statusdate, firstname, lastname from (Select dsu.deviceid, dsu.userid, dsu.status, dsu2.startdate From device_status_user dsu Inner Join (Select deviceid,max(startdate) as startdate From device_status_user Group By deviceid) dsu2 On dsu.deviceid = dsu2.deviceid And dsu.startdate = dsu2.startdate) last_status left join user on user.id = last_status.userid)  last_device_user on device.id = last_device_user.deviceid where (status=? or status=?)', ['locked', 'inuse'], function(err, rows) {
      if (err) { return callback(err, rows); }
      var devices = rows.map(function (row) {
        return new Device(row);
      });
      callback(null, devices);
      con.release();
    });
  });  
};

module.exports = Device;