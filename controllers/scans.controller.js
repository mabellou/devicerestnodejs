var user = require('../models/user');
var Device = require('../models/device');
var scan = require('../models/scan');
var CommonController = require('./common.controller.js');

var ScansController = function () {
} 

ScansController.create = function(req, res) {
	var self = this;
  if (!req.body.badgeId) {
    return CommonController._sendEvent(true, res, { internErrorCode: 7, text: 'Bad Request: Missing badgeId'}, { internErrorCode: 7, text: 'Bad Request: Missing badgeId'});
  }
  console.log("badgeid --> ", req.body.badgeId);
  user.findByBadge(req.body.badgeId, function(err, user) {
    if (err) { 
      return CommonController._sendEvent(true, res, err, err);
    }
    if (!user) {
      console.log("User not found");
      Device.findByBadge(req.body.badgeId, function(err, device) {
        if (err) { return CommonController._sendEvent(true, res, err, err); }
        if (!device) {
          return CommonController._sendEvent(true, res, { internErrorCode: 8, text: 'BadgeId not found'}, { internErrorCode: 8, text: 'BadgeId not found'});
        }
        else {
          console.log("Device found");
          scan.create("device", device, function(err) {
           if (err) { return CommonController._sendEvent(true, res, err, err); }

           ScansController._handleDeviceScan(device, function(err) {
             if (err) { return CommonController._sendEvent(true, res, err, err); }
             return CommonController._sendEvent(false, res, null, "A <b>device</b> has been scanned (" + device.badgeid + ").");
           });  
         });
        }
      });
    } 
    else {
      scan.create("user", user, function(err) {
        if (err) { return CommonController._sendEvent(true, res, err, err); }
        return CommonController._sendEvent(false, res, null, "A <b>user</b> has been scanned (" + user.badgeid + ").");
      });  
    }
  });
};

ScansController._handleDeviceScan = function (device, callback) {
	scan.findActiveUserId(function(err, userId) {
   if (err) { return callback(err); }
   if (	userId && 
    (device.status == "available" || device.status == "inuse" || (device.status == "locked" && 
      device.userid == userId))) {
    device.assignTo(userId, callback);
}
else if (userId && device.status == "unavailable"){
  return callback("Device unavailable")
}
else if (userId && (device.status == "locked" && device.userid != userId)){
  return callback("Device locked by another user")
}
else if (!userId && device.status == "inuse"){
  device.release(callback);
}
else if (!userId && device.status != "inuse"){
  return callback({ internErrorCode: 13, text: 'Device is not assigned'})
}
else{
  return callback("unknown error")
}
});
};

module.exports = ScansController;