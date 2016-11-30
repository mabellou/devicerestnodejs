var User = require('../models/user');
var Device = require('../models/device');
var indexView = require('../views/users/index.view');
var userView = require("../views/users/user.view");
var async = require('async');
var jwt = require('jsonwebtoken');

var UsersController = function () {
} 

UsersController.index = function(req, res) {
	var self = this;

	if (!UsersController.isAdmin(req.decoded, res))
		return res.status(500).send({ error: 'You are not authorized to call this URL' });


	User.findAll(function(err, users) {
		callback = function (err) {if (err) { return res.status(500).send({ error : err } ) }};
		if (err) return callback(err);

		Device.findAllUsedOrLocked(function(err, devices) {
			if (err) return callback(err);

			async.forEachLimit(users, 1, function(user, callback) { 

				async.series([
		        function(callback) {
		            Device.findByUserByStatus(user.id, devices, 'locked', function(err, count) {
		                if (err) return callback(err);
		                user.counterlocked = count;
		                callback();
		            });
		        },

		        function(callback) {
		            Device.findByUserByStatus(user.id, devices, 'inuse', function(err, count) {
		                if (err) return callback(err);
		                user.counterinuse = count;
		                callback();
		            });
		        }],
		        callback	
			  	);  
	    	}, function(err) { 
			    if (err) return callback(err);
			    res.send(indexView.render(users));
    		}); 
		});
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

	if (!UsersController.isAdmin(req.decoded, res))
		return res.status(500).send({ error: 'You are not authorized to call this URL' });

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
	var token = req.body.token || req.query['token'] || req.headers['x-access-token'];

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

UsersController.isAdmin = function(token, res) {
	if(token) {
		if(token.profile != 'administrator')
			return false
	}
	return true;
}

module.exports = UsersController;

