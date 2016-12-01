var Device = require('../models/device');
var indexView = require('../views/devices/index.view');
var CommonController = require('./common.controller.js');

var DevicesController = function () {
} 

DevicesController.index = function(req, res) {
	var self = this;

	Device.findAll(function(err, devices) {
		if (err) { return  CommonController._sendError(res, err); }
		CommonController._sendResponse(res, indexView.render(devices, req.decoded ? req.decoded.profile : req.decoded), false);
	});
};

module.exports = DevicesController;
