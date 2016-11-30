var Device = require('../models/device');
var indexView = require('../views/devices/index.view');

var DevicesController = function () {
} 

DevicesController.index = function(req, res) {
	var self = this;

	Device.findAll(function(err, devices) {
		if (err) { return res.status(500).send({ error : err } ) }
		res.send(indexView.render(devices, req.decoded ? req.decoded.profile : req.decoded));
	});
};

module.exports = DevicesController;
