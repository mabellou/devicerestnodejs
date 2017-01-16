
var connection = require('../connection');
var Device = require('../models/device');
var Statistics = require('../models/statistics');
var async = require('async');


function DeviceStatus() {
};

DeviceStatus.create = function(deviceStatus, callback) {
  connection.acquire(function(err, con) {
    
    //console.log("devicestatus --> " , deviceStatus);
    //console.log("status --> " , deviceStatus.statusobject.status);

    createCallback = function(err) {
      if (err) { return callback(err); }
      con.release();
      callback();
    }

    if(deviceStatus.statusobject.status == "locked") {
      con.query('insert into device_status_user (deviceid, userid, status, startdate, enddate) values (?,?,?,NOW(),null)', [deviceStatus.id, deviceStatus.statusobject.userobject.userid, deviceStatus.statusobject.status], createCallback);
    }
    else if(deviceStatus.statusobject.status == "inuse") {
      var device;
      async.series([
      function(callback) {
        con.query('insert into device_status_user (deviceid, userid, status, startdate, enddate) values (?,?,?,NOW(),null)', [deviceStatus.id, deviceStatus.statusobject.userobject.userid, deviceStatus.statusobject.status], function(err) {
              if (err) return callback(err);
              con.release();
              callback();
            });
      },
      function(callback) {
        Device.findById(deviceStatus.id, function(err, deviceCurr) {
          if(deviceCurr)
            device = deviceCurr;
          callback();
        });
      },
      function(callback) {
        Statistics.create("DeviceBrand", device.brand, function(err) { 
          callback();
        });
      }
      ],
      function(err) { 
        if (err) { return callback(err); }
        callback();
      });
      //console.log("DeviceStatus ---> ", deviceStatus);  
    }
    else if(deviceStatus.statusobject.status == "available") {
      con.query('insert into device_status_user (deviceid, userid, status, startdate, enddate) values (?,null,?,NOW(),null)', [deviceStatus.id, deviceStatus.statusobject.status], createCallback);
    }
    else if(deviceStatus.statusobject.status == "unavailable") {
      con.query('insert into device_status_user (deviceid, userid, status, startdate, enddate) values (?,null,?,NOW(),null)', [deviceStatus.id, deviceStatus.statusobject.status], createCallback);
    }
    else if(deviceStatus.statusobject.status == "deleted") {
      con.query('insert into device_status_user (deviceid, userid, status, startdate, enddate) values (?,null,?,NOW(),null)', [deviceStatus.id, deviceStatus.statusobject.status], createCallback);
    }
    else {
      callback("The status is not a valid status");
    }

  });  
};

module.exports = DeviceStatus;