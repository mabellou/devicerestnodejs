var deviceView = require("./device.view");

function render(devices) {
	return devices.map(function(device) {
		return deviceView.render(device);
	});
}; 

module.exports = {render: render};