
var connection = require('../connection');


function DeviceStatus() {
};

DeviceStatus.create = function(deviceStatus, callback) {
  connection.acquire(function(err, con) {
    
    console.log("devicestatus --> " , deviceStatus);
    console.log("status --> " , deviceStatus.statusobject.status);

    createCallback = function(err) {
        if (err) { return callback(err); }
        con.release();
        callback();
      }

    if(deviceStatus.statusobject.status == "locked") {
      con.query('insert into device_status_user (deviceid, userid, status, startdate, enddate) values (?,?,?,NOW(),null)', [deviceStatus.id, deviceStatus.statusobject.userobject.userid, deviceStatus.statusobject.status], createCallback);
    }
    else if(deviceStatus.status == "inuse") {
      con.query('insert into device_status_user (deviceid, userid, status, startdate, enddate) values (?,?,?,NOW(),null)', [deviceStatus.id, deviceStatus.statusobject.userobject.userid, deviceStatus.statusobject.status], createCallback);
    }
    else if(deviceStatus.status == "available") {
      con.query('insert into device_status_user (deviceid, userid, status, startdate, enddate) values (?,null,?,NOW(),null)', [deviceStatus.id, deviceStatus.statusobject.status], createCallback);
    }
    else if(deviceStatus.status == "unavailable") {
      con.query('insert into device_status_user (deviceid, userid, status, startdate, enddate) values (?,null,?,NOW(),null)', [deviceStatus.id, deviceStatus.statusobject.userobject.userid, deviceStatus.statusobject.status], createCallback);
    }
    else {
      callback("The status is not a valid status");
    }

  });  
};

module.exports = DeviceStatus;