var moment = require('moment');

function render(user){
	return {
		id: user.id,
		badgeid: user.badgeid,
		fullname: user.firstname + ' ' + user.lastname,
		firstname: user.firstname,
		lastname: user.lastname,
		profile: user.profile,
		startdate: moment(user.startdate).format("DD/MM/YYYY HH:mm:ss"),
		enddate: user.enddate ? moment(user.enddate).format("DD/MM/YYYY HH:mm:ss") : null,
		counterlocked: 0,
		counterinuse: 0
	};
}; 

module.exports = {render: render};