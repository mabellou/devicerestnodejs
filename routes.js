var ScansController = require('./controllers/scans.controller');
var UsersController = require('./controllers/users.controller');
var DevicesController = require('./controllers/devices.controller');
var DeviceStatusController = require('./controllers/device.status.controller');
var express 	= require('express');
 
module.exports = {
  configure: function(app) {

    app.post('/api/v1/scans', ScansController.create);

    app.get('/api/v1/users', UsersController.index);
    app.post('/api/v1/user', UsersController.create);

    app.get('/api/v1/devices', DevicesController.index);
    app.get('/api/v1/device/status', DeviceStatusController.create);

    app.post('/api/v1/authenticate', UsersController.authenticate);

    var apiRoutes = express.Router(); 

    apiRoutes.use(UsersController.verifyAuthenticate);

	apiRoutes.get('/check', function(req, res) {
		res.json(req.decoded);
	});

	apiRoutes.post('/api/v1/scans', ScansController.create);

    apiRoutes.get('/api/v1/users', UsersController.index);
    apiRoutes.post('/api/v1/user', UsersController.create);

    apiRoutes.get('/api/v1/devices', DevicesController.index);
    apiRoutes.get('/api/v1/device/status', DeviceStatusController.create);

    app.use('/private', apiRoutes);

  }
};