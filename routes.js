var todo = require('./models/todo');
var user = require('./models/user');
 
module.exports = {
  configure: function(app) {
    
    //////////////////////////////////////////////
    //////////////////// Scans ////////////////////
    //////////////////////////////////////////////

    // Receive the card id
    // Definition: Receive the card id
    // Example of request: 
    // Example of response: 

    app.post('/api/v1/scans', function(req, res) {
      res.end();
    });

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




    //////////////////////////////////////////////
    //////////////////// Todo ////////////////////
    //////////////////////////////////////////////

    app.get('/api/v1/todo/', function(req, res) {
      todo.get(res);
    });
 

    // For the example

    // app.post('/api/v1/todo/', function(req, res) {
    //   todo.create(req.body, res);
    // });
 
    // app.put('/api/v1/todo/', function(req, res) {
    //   todo.update(req.body, res);
    // });
 
    // app.delete('/api/v1/todo/:id/', function(req, res) {
    //   todo.delete(req.params.id, res);
    // });


  }
};