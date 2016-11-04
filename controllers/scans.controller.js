var user = require('../models/user');
var Device = require('../models/device');
var scan = require('../models/scan');

var ScansController = function () {
} 

ScansController.create = function(req, res) {
	var self = this;
  if (!req.body.badgeId) 
    return res.status(400).send({ error : "Bad Request: Missing badgeId" } )

  user.findByBadge(req.body.badgeId, function(err, user) {
      if (err) { return res.status(500).send({ error : err } ) }
      if (!user) {
        Device.findByBadge(req.body.badgeId, function(err, device) {
            if (err) { return res.status(500).send({ error : err } ) }
            if (!device)
              return res.status(404).send({ error : "BadgeId not found" } )
            else {
              scan.create("device", device, function(err) {
              	if (err) { return res.status(500).send({ error : err } ) }

              	ScansController._handleDeviceScan(device, function(err) {
                	if (err) { return res.status(500).send({ error : err } ) }
                	res.end();
              	});  
              });
            }
        });
      } 
      else {
        scan.create("user", user, function(err, user) {
          if (err) { return res.status(500).send({ error : err} ) }
          res.end();
        });  
      }
  });
};

ScansController._handleDeviceScan = function (device, callback) {
	scan.findActiveUserId(function(err, userId) {
	  if (err) { return callback(err); }
	  console.log("device --> ", device);
  	console.log("userId --> ", userId);
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


module.exports = ScansController;