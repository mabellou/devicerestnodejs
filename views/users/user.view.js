var moment = require('moment');
var Profile = require('../../models/profile');

function fullRender(user){
	return {
		id: user.id,
		badgeid: user.badgeid,
		fullname: user.firstname + ' ' + user.lastname,
		firstname: user.firstname,
		lastname: user.lastname,
		profile: Profile.findProfileById(user.profileid),
		startdate: moment(user.startdate).format("DD/MM/YYYY HH:mm:ss"),
		enddate: user.enddate ? moment(user.enddate).format("DD/MM/YYYY HH:mm:ss") : null,
		counterlocked: user.counterlocked,
		counterinuse: user.counterinuse
	};
}; 

function lightRender(user){
	console.log("user -> ", user);
	return {
		id: user.id,
		fullname: user.firstname + ' ' + user.lastname,
		profile: Profile.findProfileById(user.profileid)
	};
}; 

module.exports = {
	fullRender: fullRender,
	lightRender: lightRender
};