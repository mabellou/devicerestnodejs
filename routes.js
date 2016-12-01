var ScansController = require('./controllers/scans.controller');
var UsersController = require('./controllers/users.controller');
var DevicesController = require('./controllers/devices.controller');
var DeviceStatusController = require('./controllers/device.status.controller');
var express 	= require('express');


module.exports = {
  configure: function(app) {

    // To delete
    app.get('/api/v1/users', UsersController.index);
    app.get('/api/v1/user/:id', UsersController.show);
    app.get('/api/v1/devices', DevicesController.index);
    app.post('/api/v1/scans', ScansController.create); 
    app.post('/api/v1/user', UsersController.create);
    app.post('/api/v1/device/status', DeviceStatusController.create);
    //
    app.post('/api/v1/authenticate', UsersController.authenticate);

    var apiRoutes = express.Router(); 

    apiRoutes.use(UsersController.verifyAuthenticate);

    apiRoutes.get('/check', UsersController.check);
    apiRoutes.post('/check', UsersController.check);
    apiRoutes.get('/api/v1/users', UsersController.index);
    apiRoutes.get('/api/v1/user/:id', UsersController.show);
    apiRoutes.get('/api/v1/devices', DevicesController.index);
    apiRoutes.post('/api/v1/scans', ScansController.create);
    apiRoutes.post('/api/v1/user', UsersController.create);
    apiRoutes.post('/api/v1/device/status', DeviceStatusController.create);

    app.use('/private', apiRoutes);  
  }
};