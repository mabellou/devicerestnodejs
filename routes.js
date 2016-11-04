var ScansController = require('./controllers/scans.controller');
var UsersController = require('./controllers/users.controller');
var DevicesController = require('./controllers/devices.controller');
 
module.exports = {
  configure: function(app) {

    app.post('/api/v1/scans', ScansController.create);

    app.get('/api/v1/users', UsersController.index);

    app.get('/api/v1/devices', DevicesController.index);

  }
};