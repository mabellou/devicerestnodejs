var moment = require('moment');

function renderUserObject(device){
	if (!device.userid)
		return null
	else
		return {
			userid: device.userid,
			fullname: device.firstname + ' ' + device.lastname
		}

}

function render(device){
	return {
		id: device.id,
		boxid: device.boxid,
		brand: device.brand,
		model: device.model,
		os: device.os,
		osversion: device.osversion,
		screensize: device.screensize,
		type: device.type,
		location: device.location,
		wifiid: device.wifiid,
		wifipassword : device.wifipassword,
		comment: device.comment,
		statusobject: {
			status: device.status,
			statusdate: device.statusdate ? moment(device.statusdate).format("DD/MM/YYYY HH:mm:ss") : null,
			userobject: renderUserObject(device)
		}
	};
}; 

module.exports = {render: render};