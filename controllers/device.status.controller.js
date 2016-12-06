var DeviceStatus = require('../models/device.status');
var CommonController = require('./common.controller.js');
var UsersController = require('./users.controller.js');

var DeviceStatusController = function () {
} 

DeviceStatusController.create = function(req, res) {
	var self = this;

	req.checkBody('statusobject.userobject.userid', "Userid is empty").notEmpty();
	
	var validationErrors = req.validationErrors();
  if (validationErrors) {
    return CommonController._sendError(res, { internErrorCode: 15, text: 'Input validation error: ' + validationErrors[0].msg});
  }

	if (!UsersController.isAdmin(req.decoded, res) && (req.decoded.id != req.body.statusobject.userobject.userid) )
	return  CommonController._sendError(res, { internErrorCode: 12, text: 'You are not authorized to change the assignement of another user than yourself'});

	DeviceStatus.create(req.body, function(err) {
		if (err) { 
			return  CommonController._sendError(res, err);
		}
		CommonController._sendResponse(res, null, false);
	});
};
 
module.exports = DeviceStatusController;
