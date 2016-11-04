var User = require('../models/user');
var indexView = require('../views/users/index.view');

var UsersController = function () {
} 

UsersController.index = function(req, res) {
	var self = this;

	User.findAll(function(err, users) {
		if (err) { return res.status(500).send({ error : err } ) }
		// do something with async in order to 
		res.send(indexView.render(users));
	});
};


module.exports = UsersController;