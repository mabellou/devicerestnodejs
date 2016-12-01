var frisby = require('frisby');

var authURL = 'http://localhost:8001/api/v1/authenticate';
var devicesURL = 'http://localhost:8001/private/api/v1/devices';

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

    frisby.create('Get the tester devices list')
      .get(devicesURL)
      .addHeader('x-access-token', res.token)
      .expectStatus(200)
      .expectHeaderContains('Content-Type', 'application/json')
      .expectJSONTypes('*', {
        id: Number
      })
    .toss();

  })
.toss();