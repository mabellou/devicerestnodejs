var deviceView = require("./device.view");
var Profile = require('../../models/profile');

function render(devices, profile) {

	if (profile == 'administrator') {
		// nothing
	}

	if (profile == 'incubator') {
		devices = devices.filter(function (el) {
  			return  (el.profileid === Profile.findIdByProfile('incubator') ||
  					el.profileid === Profile.findIdByProfile('tester')) && 
  					el.status != 'unavailable';
		});
	}

	if (profile == 'business') {
		devices = devices.filter(function (el) {
  			return  el.profileid === Profile.findIdByProfile('business') && 
  					el.status != 'unavailable' && el.status != 'deleted';
		});
	}

	if (profile == 'tester') {
		devices = devices.filter(function (el) {
  			return  el.profileid === Profile.findIdByProfile('tester') && 
  					el.status != 'unavailable' && el.status != 'deleted';
		});
	}

	if (profile == 'savi') {
		devices = devices.filter(function (el) {
  			return  (el.profileid === Profile.findIdByProfile('savi') ||
  					el.profileid === Profile.findIdByProfile('tester')) && 
  					el.status != 'unavailable' && el.status != 'deleted';
		});
	}

	return devices.map(function(device) {
		return deviceView.render(device);
	});
}; 

module.exports = {render: render};