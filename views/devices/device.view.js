var moment = require('moment');

function render(device){
	return {
		id: device.id,
		brand: device.brand,
		userid: device.userid,
		firstname: device.firstname,
		lastname: device.lastname
	};
}; 

module.exports = {render: render};