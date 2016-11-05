var moment = require('moment');

function render2(device){
	return {
		id: device.id,
		boxid: device.boxid,
		brand: device.brand,
		model: device.model,
		os: device.os,
		osversion: device.osversion,
		screensize: device.screensize,
		type: device.type,
		status: device.status,
		userid: device.userid,
		fullname: device.firstname + ' ' + device.lastname
	};
}; 

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
		statusobject: {
			status: device.status,
			userobject: renderUserObject(device)
		}
	};
}; 

module.exports = {render: render};