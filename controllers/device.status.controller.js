var DeviceStatus = require('../models/device.status');

var DeviceStatusController = function () {
} 

DeviceStatusController.create = function(req, res) {
	var self = this;

	DeviceStatus.create(req.body, function(err) {
		if (err) { 
			DeviceStatusController._displayerror("500", { error : err });
			return res.status(500).send({ error : err } ) 
		}
		DeviceStatusController._displayerror("200","");
		res.send();
	});
};

DeviceStatusController._displayerror = function(status, message){
  console.log('==> Sent ==> ', status);
  console.log('==> Sent ==> ', message);
  console.log('==============');
};

module.exports = DeviceStatusController;
