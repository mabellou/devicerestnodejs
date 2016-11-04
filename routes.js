var user = require('./models/user');
var device = require('./models/device');
var scan = require('./models/scan');
var ScansController = require('./controllers/scans.controller');
 
module.exports = {
  configure: function(app) {
    
    //////////////////////////////////////////////
    //////////////////// Scans ////////////////////
    //////////////////////////////////////////////

    // Receive the card id
    // Definition: Receive the card id
    // Example of request: 
    // Example of response: 

    app.post('/api/v1/scans', ScansController.create);

    //////////////////////////////////////////////
    //////////////////// User ////////////////////
    //////////////////////////////////////////////

    // Get the list of users:
    // Definition: The service is adapted to what the front end expect
    // Example of request: 
    // Example of response: 

    app.get('/api/v1/users/', function(req, res) {
      user.get(res);
    });
  }
};