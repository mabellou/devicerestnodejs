var todo = require('./models/todo');
var user = require('./models/user');
var device = require('./models/device');
var scan = require('./models/scan');
 
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
      console.log("BadgeId -->", req.body.badgeId);
      if (!req.body.badgeId) 
        return res.status(400).send({ error : "Bad Request: Missing badgeId" } )

      user.findByBadge(req.body.badgeId, function(err, user) {
          if (err) { return res.status(500).send({ error : err } ) }
            console.log("user", user)
          if (!user) {
            device.findByBadge(req.body.badgeId, function(err, device) {
                if (err) { return res.status(500).send({ error : err } ) }
                  console.log("device", device)
                if (!device)
                  return res.status(404).send({ error : "BadgeId not found" } )
                else {
                  scan.create("device", device, function(err, device) {
                    if (err) { return res.status(500).send({ error : err } ) }
                    
                    res.end();
                  });  
                }
            });
          } 
          else {
            scan.create("user", user, function(err, user) {
              if (err) { return res.status(500).send({ error : err} ) }
              res.end();
            });  
          }
      });
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