var frisby = require('frisby');

var authURL = 'http://localhost:8001/api/v1/authenticate';
var deviceURL = 'http://localhost:8001/private/api/v1/device/';
var devicesURL = 'http://localhost:8001/private/api/v1/devices';
var deviceNumber = Math.floor((Math.random() * 1024) + 1);


frisby.create('Authenticate as administrator')
  .post(authURL,
    { username: 'admin01', password: 'azerty' },
    { json: true },
    { headers: { 'Content-Type': 'application/json' }
  })
  .expectStatus(200)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectHeader('Access-Control-Allow-Origin','*')
  .expectJSONTypes({
    token: String,
    userid: Number
  })
  .expectJSON({
    userid: 1
  })
  .afterJSON(function (res) {

    frisby.globalSetup({
      request: { 
        headers: { 'x-access-token': res.token }
      }
    });

    frisby.create('Update a device')
      .put(deviceURL + '11', {
          "boxid": 111,
          "brand": "updated",
          "model": "updated",
          "os": "updated",
          "osversion": "updated",
          "screensize": "updated",
          "type": "updated",
          "location": "updated",
          "wifipassword": "updated",
          "wifiid": "updated",
          "comment": "updated",
          "profile": "updated",
          "badgeid": "updated",
          "imei": "updated",
          "serialnumber": "updated"
        },
        { json: true },
        { headers: { 'Content-Type': 'application/json' }
      })
      .expectStatus(200)
      .expectHeaderContains('Content-Type', 'application/json')
      .expectJSONTypes({
        id: Number
      })
      .after(function (res) {

        frisby.create('Update a device: verify device exists')
          .get(devicesURL)
          .expectJSON('?', {
            boxid: 111
          })
        .toss();

        frisby.create('Update a device: Device not found (20)')
          .put(deviceURL + '99', { 
            boxid: 123
            },
            { json: true },
            { headers: { 'Content-Type': 'application/json' }
          })
          .expectStatus(200)
          .expectHeaderContains('Content-Type', 'application/json')
          .expectJSONTypes('error', {
            code: Number,
            text: String
          })
          .expectJSON('error', {
            code: 20
          })
        .toss();


      })
    .toss();
 

  })
.toss();


frisby.create('Authenticate as tester')
  .post(authURL,
    { username: 'tester01', password: 'azerty' },
    { json: true },
    { headers: { 'Content-Type': 'application/json' }
  })
  .expectStatus(200)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectHeader('Access-Control-Allow-Origin','*')
  .expectJSONTypes({
    token: String,
    userid: Number
  })
  .expectJSON({
    userid: 4
  })
  .afterJSON(function (res) {
    
    frisby.create('No authorization to call this url (error: 2)')
      .put(deviceURL + '1', { 
        boxid: 123
        },
        { json: true },
        { headers: { 'Content-Type': 'application/json' }
      })
      .addHeader('x-access-token', res.token)
      .expectStatus(200)
      .expectHeaderContains('Content-Type', 'application/json')
      .expectJSONTypes('error', {
        code: Number,
        text: String
      })
      .expectJSON('error', {
        code: 2
      })
    .toss();

  })
.toss();