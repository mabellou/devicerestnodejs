var frisby = require('frisby');

var authURL = 'http://localhost:8001/api/v1/authenticate';
var userIdURL = 'http://localhost:8001/private/api/v1/user/';


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
  

    frisby.create('Get the user 1')
      .get(userIdURL + '1')
      .addHeader('x-access-token', res.token)
      .expectStatus(200)
      .expectHeaderContains('Content-Type', 'application/json')
      .expectJSONTypes({
        id: Number,
        fullname: String,
        profile: String
      })
    .toss();

    frisby.create('The user 99 does not exist (error: 9)')
      .get(userIdURL + '99')
      .addHeader('x-access-token', res.token)
      .expectStatus(200)
      .expectHeaderContains('Content-Type', 'application/json')
      .expectJSONTypes('error', {
        code: Number,
        text: String
      })
      .expectJSON('error', {
        code: 9
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
    
    frisby.create('No authorization to see another user than myself (error: 10)')
      .get(userIdURL + '1')
      .addHeader('x-access-token', res.token)
      .expectStatus(200)
      .expectHeaderContains('Content-Type', 'application/json')
      .expectJSONTypes('error', {
        code: Number,
        text: String
      })
      .expectJSON('error', {
        code: 10
      })
    .toss();

    frisby.create('Get information about me (id = 4)')
      .get(userIdURL + '4')
      .addHeader('x-access-token', res.token)
      .expectStatus(200)
      .expectHeaderContains('Content-Type', 'application/json')
      .expectJSONTypes({
        id: Number,
        fullname: String,
        profile: String
      })
      .expectJSON({
        id: 4
      })
    .toss();

  })
.toss();