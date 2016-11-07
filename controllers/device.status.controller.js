var Device = require('../models/device');

var DeviceStatusController = function () {
} 

DeviceStatusController.index = function(req, res) {
	var self = this;

	Device.findAll(function(err, devices) {
		if (err) { return res.status(500).send({ error : err } ) }
		res.send(indexView.render(devices));
	});
};

module.exports = DeviceStatusController;
