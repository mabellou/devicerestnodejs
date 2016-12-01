var frisby = require('frisby');

var authURL = 'http://localhost:8001/api/v1/authenticate';
var deviceStatusURL = 'http://localhost:8001/private/api/v1/device/status';


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
    
    frisby.create('No authorization to change the assignement of another user than myself (error: 12)')
      .post(deviceStatusURL, {
        id: 2,
        statusobject: {
          status: "locked",
          userobject: {
            userid: 1
          }
        }
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
        code: 12
      })
    .toss();

    frisby.create('Change my assignement (id = 4)')
      .post(deviceStatusURL, {
        id: 2,
        statusobject: {
          status: "locked",
          userobject: {
            userid: 4
          }
        }
      },
        { json: true },
        { headers: { 'Content-Type': 'application/json' }
      })
      .addHeader('x-access-token', res.token)
      .expectStatus(200)
      .expectHeader('Content-Length','0')
    .toss();

  })
.toss();