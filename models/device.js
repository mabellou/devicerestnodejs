var connection = require('../connection');
var moment = require('moment');
var Profile = require('../models/profile');

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
    con.query('select deviceid, status, userid, statusdate from device left join (select deviceid, userid, status, last_status.startdate as statusdate, firstname, lastname from (Select dsu.deviceid, dsu.userid, dsu.status, dsu2.startdate From device_status_user dsu Inner Join (Select deviceid,max(startdate) as startdate From device_status_user Group By deviceid) dsu2 On dsu.deviceid = dsu2.deviceid And dsu.startdate = dsu2.startdate) last_status left join user on user.id = last_status.userid)  last_device_user on device.id = last_device_user.deviceid where (status=? or status=?)', ['locked', 'inuse'], function(err, rows) {
      if (err) { return callback(err, rows); }
      var devices = rows.map(function (row) {
        return new Device(row);
      });
      console.log("device long: ", devices);
      callback(null, devices);
      con.release();
    });
  });  
};

Device.create = function(device, callback) {
  connection.acquire(function(err, con) {

    var intoInsert = "INSERT INTO device (";
    var valueInsert = "VALUES (";
    var dataInsert = [];

    intoInsert = intoInsert + "boxid";
    valueInsert = valueInsert + "?";
    dataInsert.push(device.boxid);

    if(device.brand){
      intoInsert = intoInsert + ",brand";
      valueInsert = valueInsert + ",?";
      dataInsert.push(device.brand);
    }
    if(device.model){
      intoInsert = intoInsert + ",model";
      valueInsert = valueInsert + ",?";
      dataInsert.push(device.model);
    }
    if(device.profile){
      intoInsert = intoInsert + ",profileid";
      valueInsert = valueInsert + ",?";
      dataInsert.push(Profile.findIdByProfile(device.profile));
    }
    if(device.os){
      intoInsert = intoInsert + ",os";
      valueInsert = valueInsert + ",?";
      dataInsert.push(device.os);
    }
    if(device.osversion){
      intoInsert = intoInsert + ",osversion";
      valueInsert = valueInsert + ",?";
      dataInsert.push(device.osversion);
    }
    if(device.screensize){
      intoInsert = intoInsert + ",screensize";
      valueInsert = valueInsert + ",?";
      dataInsert.push(device.screensize);
    }
    if(device.type){
      intoInsert = intoInsert + ",type";
      valueInsert = valueInsert + ",?";
      dataInsert.push(device.type);
    }
    if(device.location){
      intoInsert = intoInsert + ",location";
      valueInsert = valueInsert + ",?";
      dataInsert.push(device.location);
    }
    if(device.wifipassword){
      intoInsert = intoInsert + ",wifipassword";
      valueInsert = valueInsert + ",?";
      dataInsert.push(device.wifipassword);
    }
    if(device.wifiid){
      intoInsert = intoInsert + ",wifiid";
      valueInsert = valueInsert + ",?";
      dataInsert.push(device.wifiid);
    }
    if(device.comment){
      intoInsert = intoInsert + ",comment";
      valueInsert = valueInsert + ",?";
      dataInsert.push(device.comment);
    }
    if(device.imei){
      intoInsert = intoInsert + ",imei";
      valueInsert = valueInsert + ",?";
      dataInsert.push(device.imei);
    }
    if(device.serialnumber){
      intoInsert = intoInsert + ",serialnumber";
      valueInsert = valueInsert + ",?";
      dataInsert.push(device.serialnumber);
    }
    if(device.badgeid){
      intoInsert = intoInsert + ",badgeid";
      valueInsert = valueInsert + ",?";
      dataInsert.push(device.badgeid);
    }
    
    intoInsert = intoInsert + ") ";
    valueInsert = valueInsert + ")";

    con.query(intoInsert + valueInsert, dataInsert, function(err, rows) {
      if (err) { 
        if(err.errno == 1062)
          return callback({ internErrorCode: 19, text: 'The device already exists'}); 
        return callback(err); 
      }
      if(rows && rows.insertId)
        device.deviceid = rows.insertId;
      else
        callback({ internErrorCode: 1, text: 'No id for the device was received'})

      con.release();
      callback();
    });
  });  
};

Device.update = function(device, deviceid, callback) {
  connection.acquire(function(err, con) {

    var queryUpdate = "UPDATE device SET ";
    var dataUpdate = [];

    if(device.boxid){
      queryUpdate = queryUpdate + "boxid = ?, ";
      dataUpdate.push(device.boxid);
    }
    if(device.brand){
      queryUpdate = queryUpdate + "brand = ?, ";
      dataUpdate.push(device.brand);
    }
    if(device.model){
      queryUpdate = queryUpdate + "model = ?, ";
      dataUpdate.push(device.model);
    }
    if(device.profile){
      queryUpdate = queryUpdate + "profileid = ?, ";
      dataUpdate.push(Profile.findIdByProfile(device.profile));
    }
    if(device.os){
      queryUpdate = queryUpdate + "os = ?, ";
      dataUpdate.push(device.os);
    }
    if(device.osversion){
      queryUpdate = queryUpdate + "osversion = ?, ";
      dataUpdate.push(device.osversion);
    }
    if(device.screensize){
      queryUpdate = queryUpdate + "screensize = ?, ";
      dataUpdate.push(device.screensize);
    }
    if(device.type){
      queryUpdate = queryUpdate + "type = ?, ";
      dataUpdate.push(device.type);
    }
    if(device.location){
      queryUpdate = queryUpdate + "location = ?, ";
      dataUpdate.push(device.location);
    }
    if(device.wifipassword){
      queryUpdate = queryUpdate + "wifipassword = ?, ";
      dataUpdate.push(device.wifipassword);
    }
    if(device.wifiid){
      queryUpdate = queryUpdate + "wifiid = ?, ";
      dataUpdate.push(device.wifiid);
    }
    if(device.comment){
      queryUpdate = queryUpdate + "comment = ?, ";
      dataUpdate.push(device.comment);
    }
    if(device.imei){
      queryUpdate = queryUpdate + "imei = ?, ";
      dataUpdate.push(device.imei);
    }
    if(device.serialnumber){
      queryUpdate = queryUpdate + "serialnumber = ?, ";
      dataUpdate.push(device.serialnumber);
    }
    if(device.badgeid){
      queryUpdate = queryUpdate + "badgeid = ?, ";
      dataUpdate.push(device.badgeid);
    }
    
    queryUpdate = queryUpdate.substring(0, queryUpdate.length - 2);
    queryUpdate = queryUpdate + " WHERE id = ?";
    dataUpdate.push(deviceid);

    con.query(queryUpdate, dataUpdate, function(err, rows) {
      if (err) { 
        return callback(err); 
      }
      device.deviceid = Number(deviceid);

      con.release();
      callback();
    });
  });  
};

Device.findById = function(deviceId, callback) {
  connection.acquire(function(err, con) {
    con.query('select * from device where id = ? limit 1', [deviceId], function(err, rows) {
      if (err) { return callback(err); }
      con.release();
      if (rows[0])
        return callback(null, new Device(rows[0]));
      callback({ internErrorCode: 20, text: 'The device does not exist'}, null);
    }); 
  });  
};

module.exports = Device;