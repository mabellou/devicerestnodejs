var userView = require("./user.view");

function render(users) {
	return users.map(function(user) {
		return userView.fullRender(user);
	});
}; 

module.exports = {render: render};