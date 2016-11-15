var user = require('../models/user');
var Device = require('../models/device');
var scan = require('../models/scan');
var request = require("request");

var ScansController = function () {
} 

ScansController.create = function(req, res) {
	var self = this;
  if (!req.body.badgeId) {
    ScansController._displayerror("400", { error : "Bad Request: Missing badgeId"  });
    return res.status(400).send({ error : "Bad Request: Missing badgeId" } )
  }
  console.log("badgeid --> ", req.body.badgeId);
  user.findByBadge(req.body.badgeId, function(err, user) {
      if (err) { 
          ScansController._displayerror("500", { error : err });
        return res.status(500).send({ error : err } ) 
      }
      if (!user) {
        console.log("User not found");
        Device.findByBadge(req.body.badgeId, function(err, device) {
            if (err) { 
              ScansController._displayerror("500", { error : err });
              return res.status(500).send({ error : err } ) 
            }
            if (!device) {
              ScansController._displayerror("404", { error : "BadgeId not found" });
              return res.status(404).send({ error : "BadgeId not found" } )
            }
            else {
              console.log("Device found");
              scan.create("device", device, function(err) {
              	if (err) { 
                  ScansController._displayerror("500", { error : err });
                  return res.status(500).send({ error : err } ) 
                }

              	ScansController._handleDeviceScan(device, function(err) {
                	if (err) { 
                    ScansController._displayerror("500", { error : err });
                    return res.status(500).send({ error : err } ) 
                  }
                	ScansController._displayerror("200","");
                  res.end();
                  ScansController._sendEvent("A <b>device</b> has been scanned (" + device.badgeid + ").");
              	});  
              });
            }
        });
      } 
      else {
        scan.create("user", user, function(err) {
          if (err) { 
            ScansController._displayerror("500", { error : err });
            return res.status(500).send({ error : err} ) 
          }
          ScansController._displayerror("200","");
          res.end();
          ScansController._sendEvent("A <b>user</b> has been scanned (" + user.badgeid + ").");
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
  		return callback("Device was not assigned")
  	}
  	else{
  		return callback("unknown error")
  	}
	});
};

ScansController._displayerror = function(status, message){
  console.log('==> Sent ==> ', status);
  console.log('==> Sent ==> ', message);
  console.log('==============');
  if (status != "200")
    ScansController._sendEvent("<b>Error</b> : " + message.error);
};

ScansController._sendEvent = function(message){
  request({
    headers: {
      'Content-Type': 'application/json'
    },
    uri: "https://websocketdevice.herokuapp.com/scanevent",
    method: "POST",
    form: {
      message: message
    }
  }, function(error, response, body) {
    if (error)
      console.log('==> SCAN received error ==> ', error);
  });

};

module.exports = ScansController;