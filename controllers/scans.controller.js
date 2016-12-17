var user = require('../models/user');
var Device = require('../models/device');
var scan = require('../models/scan');
var CommonController = require('./common.controller.js');

var ScansController = function () {
} 

ScansController.create = function(req, res) {

  if(req.body.key !== "thiskeyisnottoomuchsecure")
    return CommonController._sendEvent(true, res, { internErrorCode: 17, text: 'The key is not correct'});

	var self = this;
  if (!req.body.badgeId) {
    return CommonController._sendEvent(true, res, { internErrorCode: 7, text: 'The badge does not contain the badge id.'});
  }
  console.log("badgeid --> ", req.body.badgeId);
  user.findByBadge(req.body.badgeId, function(err, user) {
    var callbackError = function (err) {
      if (err) { 
        console.log("==> Initial Error ==> ", err);
        if(!err.internErrorCode)
          return CommonController._sendEvent(true, res, { internErrorCode: 1, text: 'Technical error. Please contact the administrator.' });
        else
          return CommonController._sendEvent(true, res, err);
      }
    }

    if (err) { return callbackError(err);}

    if (!user) {
      console.log("User not found");
      Device.findByBadge(req.body.badgeId, function(err, device) {
        if (err) { return callbackError(err); }
        if (!device) {
          return CommonController._sendEvent(true, res, { internErrorCode: 8, text: 'The badge or the device. '+ req.body.badgeId + '. is not known by the system'});
        }
        else {
          console.log("Device found");
          scan.create("device", device, function(err) {
           if (err) { return callbackError(err); }

           ScansController._handleDeviceScan(device, function(err, assigned, released) {
            if (err) { return callbackError(err); }
            if (released)
              return CommonController._sendEvent(false, res, {message: { code: 2, text: "Enjoy the device."}}, "A <b>device</b> has been released (" + device.badgeid + ").");

            return CommonController._sendEvent(false, res, {message: { code: 3, text: "Thanks and. good day."}}, "A <b>device</b> has been assigned to user (" + device.badgeid + ").");
           });  
         });
        }
      });
    } 
    else {
      scan.create("user", user, function(err) {
        if (err) { return callbackError(err); }
        return CommonController._sendEvent(false, res, {message: { code: 4, text: "Hello, please scan a device."}}, "A <b>user</b> has been scanned (" + user.badgeid + ").");
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
      return callback({ internErrorCode: 15, text: 'The device is currently not available'})
    }
    else if (userId && (device.status == "locked" && device.userid != userId)){
      return callback({ internErrorCode: 16, text: 'The device is already locked by another user'})
    }
    else if (!userId && device.status == "inuse"){
      device.release(callback);
    }
    else if (!userId && device.status != "inuse"){
      return callback({ internErrorCode: 13, text: 'The device was not assigned. Please, badge first a user.'})
    }
    else{
      return callback("unknown error")
    }
  });
};

module.exports = ScansController;