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

    frisby.create('Create a Device')
      .post(deviceURL, {
          "boxid": deviceNumber,
          "brand": "Appel",
          "model": "Iphone 9",
          "os": "IOS",
          "osversion": "10.1.1",
          "screensize": "4 inch",
          "type": "smartphone",
          "location": "locker",
          "wifipassword": "azerty",
          "wifiid": "test",
          "comment": "salut, je suis Marwan",
          "profile": "tester",
          "badgeid": "1232132",
          "imei": "4324134324",
          "serialnumber": "23432432"
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

        frisby.create('Create a device: verify device exists')
          .get(devicesURL)
          .expectJSON('?', {
            boxid: deviceNumber
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
      .post(deviceURL, {
          "boxid": deviceNumber,
          "brand": "Appel",
          "model": "Iphone 9",
          "os": "IOS",
          "osversion": "10.1.1",
          "screensize": "4 inch",
          "type": "smartphone",
          "location": "locker",
          "wifipassword": "azerty",
          "wifiid": "test",
          "comment": "salut, je suis Marwan",
          "profile": "tester",
          "badgeid": "1232132",
          "imei": "4324134324",
          "serialnumber": "23432432"
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