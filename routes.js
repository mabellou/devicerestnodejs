var ScansController = require('./controllers/scans.controller');
var UsersController = require('./controllers/users.controller');
 
module.exports = {
  configure: function(app) {

    app.post('/api/v1/scans', ScansController.create);

    app.get('/api/v1/users', UsersController.index);

  }
};