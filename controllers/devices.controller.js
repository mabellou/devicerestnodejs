var Device = require('../models/device');
var indexView = require('../views/devices/index.view');
var CommonController = require('./common.controller.js');
var UsersController = require('./users.controller.js');
var async = require('async');

var DevicesController = function () {
} 

DevicesController.index = function(req, res) {
	var self = this;

	Device.findAll(function(err, devices) {
		if (err) { return  CommonController._sendError(res, err); }
		CommonController._sendResponse(res, indexView.render(devices, req.decoded ? req.decoded.profile : req.decoded), false);
	});
};

DevicesController.create = function(req, res) {
	var self = this;

	req.checkBody('boxid', "boxid is empty or too long or not an int").notEmpty().isInt();
	req.checkBody('brand', "brand is empty or too long or not a string").notEmpty().isLt255().isString();
	req.checkBody('model', "model is empty or too long or not a string").notEmpty().isLt255().isString();
	req.checkBody('profile', "profile is empty or too long or not a string or not a defined profile").notEmpty().isLt255().isString().isProfile;
	if(req.body.os)
		req.checkBody('os', "os is too long or not a string").isLt255().isString();
	if(req.body.osversion)
		req.checkBody('osversion', "osversion is too long or not a string").isLt255().isString();
	if(req.body.screensize)
		req.checkBody('screensize', "screensize is too long or not a string").isLt255().isString();
	if(req.body.type)
		req.checkBody('type', "type is too long or not a string").isLt255().isString();
	if(req.body.location)
		req.checkBody('location', "location is too long or not a string").isLt255().isString();
	if(req.body.wifipassword)
		req.checkBody('wifipassword', "wifipassword is too long or not a string").isLt255().isString();
	if(req.body.wifiid)
		req.checkBody('wifiid', "wifiid is too long or not a string").isLt255().isString();
	if(req.body.comment)
		req.checkBody('comment', "comment is too long or not a string").isLt255().isString();
	if(req.body.imei)
		req.checkBody('imei', "imei is too long or not a string").isLt255().isString();
	if(req.body.serialnumber)
		req.checkBody('serialnumber', "serialnumber is too long or not a string").isLt255().isString();
	if(req.body.badgeid)
		req.checkBody('badgeid', "badgeid is too long or not a string").isLt255().isString();
	
	var validationErrors = req.validationErrors();
  if (validationErrors) {
    return CommonController._sendError(res, { internErrorCode: 15, text: 'Input validation error: ' + validationErrors[0].msg});
  }

	if (!UsersController.isAdmin(req.decoded, res))
		return CommonController._sendError(res, { internErrorCode: 2, text: 'You are not authorized to call this URL'});

	var device = req.body;
	var callback = function (err, status) {
		if (err) { return CommonController._sendError(res, err); }
	};

	Device.create(device, function(err) { 
			if (err) return callback(err);
			CommonController._sendResponse(res, { id: device.deviceid}, false);
	});
};

DevicesController.update = function(req, res) {
	var self = this;

	if(req.body.boxid)
		req.checkBody('boxid', "boxid is too long or not an int").isInt();
	if(req.body.brand)
		req.checkBody('brand', "brand is too long or not a string").isLt255().isString();
	if(req.body.model)
		req.checkBody('model', "model is too long or not a string").isLt255().isString();
	if(req.body.profile)
		req.checkBody('profile', "profile is too long or not a string or not a defined profile").isLt255().isString().isProfile;
	if(req.body.os)
		req.checkBody('os', "os is too long or not a string").isLt255().isString();
	if(req.body.osversion)
		req.checkBody('osversion', "osversion is too long or not a string").isLt255().isString();
	if(req.body.screensize)
		req.checkBody('screensize', "screensize is too long or not a string").isLt255().isString();
	if(req.body.type)
		req.checkBody('type', "type is too long or not a string").isLt255().isString();
	if(req.body.location)
		req.checkBody('location', "location is too long or not a string").isLt255().isString();
	if(req.body.wifipassword)
		req.checkBody('wifipassword', "wifipassword is too long or not a string").isLt255().isString();
	if(req.body.wifiid)
		req.checkBody('wifiid', "wifiid is too long or not a string").isLt255().isString();
	if(req.body.comment)
		req.checkBody('comment', "comment is too long or not a string").isLt255().isString();
	if(req.body.imei)
		req.checkBody('imei', "imei is too long or not a string").isLt255().isString();
	if(req.body.serialnumber)
		req.checkBody('serialnumber', "serialnumber is too long or not a string").isLt255().isString();
	if(req.body.badgeid)
		req.checkBody('badgeid', "badgeid is too long or not a string").isLt255().isString();
	
	var validationErrors = req.validationErrors();
  if (validationErrors) {
    return CommonController._sendError(res, { internErrorCode: 15, text: 'Input validation error: ' + validationErrors[0].msg});
  }


	if (!UsersController.isAdmin(req.decoded, res))
		return CommonController._sendError(res, { internErrorCode: 2, text: 'You are not authorized to call this URL'});

	var device = req.body;
	var deviceid = req.params.id;
	var callback = function (err, status) {
		if (err) { return CommonController._sendError(res, err); }
	};

	async.series([
    function(callback) {
			Device.findById(deviceid, function(err) {
				callback(err);
			});
    },
    function(callback) {
      Device.update(device, deviceid,function(err) {
				callback(err);
			});
    }
	],
	function(err) { 
			if (err) 
				return callback(err);
			else
				CommonController._sendResponse(res, { id: device.deviceid}, false);
	});

};

module.exports = DevicesController;
