var DeviceStatus = require('../models/device.status');

var DeviceStatusController = function () {
} 

DeviceStatusController.create = function(req, res) {
	var self = this;

	DeviceStatus.create(function(err) {
		if (err) { return res.status(500).send({ error : err } ) }
		res.send();
	});
};

module.exports = DeviceStatusController;
