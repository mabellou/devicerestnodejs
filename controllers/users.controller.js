var User = require('../models/user');
var Device = require('../models/device');
var indexView = require('../views/users/index.view');
var userView = require("../views/users/user.view");
var async = require('async');
var jwt = require('jsonwebtoken');
var CommonController = require('./common.controller.js');

var UsersController = function () {
} 

UsersController.index = function(req, res) {
	var self = this;

	if (!UsersController.isAdmin(req.decoded, res))
		return  CommonController._sendError(res, { internErrorCode: 2, text: 'You are not authorized to call this URL'});


	User.findAll(function(err, users) {
		callback = function (err) {if (err) { return CommonController._sendError(res, err); }};
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
				CommonController._sendResponse(res, indexView.render(users), false);
			}); 
		});
	});
};

UsersController.show = function(req, res) {
	var self = this;

	// The user can only see his id if not admin
	if (!UsersController.isAdmin(req.decoded, res) && (req.decoded.id != req.params.id) )
		return  CommonController._sendError(res, { internErrorCode: 10, text: 'You are not authorized to see another user than yourself'});

	User.findById(req.params.id, function(err, user) {
		if (err) { return CommonController._sendError(res, err); }
		CommonController._sendResponse(res, userView.lightRender(user), false);
	});
};

UsersController.create = function(req, res) {
	var self = this;

	if (!UsersController.isAdmin(req.decoded, res))
		return CommonController._sendError(res, { internErrorCode: 2, text: 'You are not authorized to call this URL'});

	User.create(req.body, function(err) {
		if (err) { return CommonController._sendError(res, err); }
		CommonController._sendResponse(res, null, false);
	});
};

UsersController.authenticate = function(req, res) {
	var self = this;

	User.findByUsername(req.body.username, function(err, user) {
		if (err) { return CommonController._sendError(res, err); }
		if (!user) {
			return CommonController._sendError(res, { internErrorCode: 3, text: 'Authentication failed: user not found'});
		}
		
		User.verifyPassword(req.body.password, user, function(err, user) {
			if (err) { return CommonController._sendError(res, err); }
			if (!user) {
				return CommonController._sendError(res, { internErrorCode: 4, text: 'Authentication failed: wrong password'});
			}
			
			User.createJwtToken(user, function(err, token) {
				if (err) { return CommonController._sendError(res, err); }
				CommonController._sendResponse(res, {token: token, userid: user.id}, false);
			});
		});
	});
};

UsersController.check = function(req, res) {
	CommonController._sendResponse(res, req.decoded, false);
}

UsersController.verifyAuthenticate = function(req, res, next) {
	var token = req.body.token || req.query['token'] || req.headers['x-access-token'];

	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, 'thisistoomuchsecure', function(err, decoded) {			
			if (err) {
				return CommonController._sendError(res, { internErrorCode: 5, text: 'Failed to authenticate token'});	
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;	
				next();
			}
		});

	} else {
		return CommonController._sendError(res, { internErrorCode: 6, text: 'No token provided'});	
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

