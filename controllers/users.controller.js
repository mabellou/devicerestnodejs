var User = require('../models/user');
var indexView = require('../views/users/index.view');
var userView = require("../views/users/user.view");
var jwt = require('jsonwebtoken');

var UsersController = function () {
} 

UsersController.index = function(req, res) {
	var self = this;

	User.findAll(function(err, users) {
		if (err) { return res.status(500).send({ error : err } ) }
		// do something with async in order to get the counter
		res.send(indexView.render(users));
	});
};

UsersController.show = function(req, res) {
	var self = this;

	User.findById(req.params.id, function(err, user) {
		if (err) { return res.status(500).send({ error : err } ) }
		res.send(userView.lightRender(user));
	});
};

UsersController.create = function(req, res) {
	var self = this;

	User.create(req.body, function(err) {
		if (err) { return res.status(500).send({ error : err } ) }
		res.end();
	});
};

UsersController.authenticate = function(req, res) {
	var self = this;

	User.findByUsername(req.body.username, function(err, user) {
		if (err) { return res.status(500).send({ error : err } ) }
		if (!user) {
      		return res.status(500).send({ error : "Authentication failed: user not found" } )
    	}
		
		User.verifyPassword(req.body.password, user, function(err, user) {
			if (err) { return res.status(500).send({ error : err } ) }
			if (!user) {
      			return res.status(500).send({ error : "Authentication failed: wrong password" } )
    		}
			
			User.createJwtToken(user, function(err, token) {
				if (err) { return res.status(500).send({ error : err } ) }
				res.send({token: token, userid: user.id});
			});
		});
	});
};


UsersController.verifyAuthenticate = function(req, res, next) {
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, 'thisistoomuchsecure', function(err, decoded) {			
			if (err) {
				return res.status(403).send({ error: 'Failed to authenticate token.' });		
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;	
				next();
			}
		});

	} else {
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
	}
}

module.exports = UsersController;
