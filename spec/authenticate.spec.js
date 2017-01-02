var frisby = require('frisby');

var authURL = 'http://localhost:8001/api/v1/authenticate';
var checkURL = 'http://localhost:8001/private/check';

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
    frisby.create('VERIFY authentication with GET and ? param')
      .get(checkURL + '?token=' + res.token)
      .expectStatus(200)
      .expectHeaderContains('Content-Type', 'application/json')
      .expectJSONTypes({
        id: Number,
        profile: String,
        iat: Number,
        exp: Number
      })
    .toss();

    frisby.create('VERIFY authentication with x-access-token')
      .get(checkURL)
      .addHeader('x-access-token', res.token)
      .expectStatus(200)
      .expectHeaderContains('Content-Type', 'application/json')
      .expectJSONTypes({
        id: Number,
        profile: String,
        iat: Number,
        exp: Number
      })
    .toss();

    frisby.create('VERIFY authentication with POST')
      .post(checkURL,
        { token: res.token },
        { json: true },
        { headers: { 'Content-Type': 'application/json' }
      })
      .expectStatus(200)
      .expectHeaderContains('Content-Type', 'application/json')
      .expectJSONTypes({
        id: Number,
        profile: String,
        iat: Number,
        exp: Number
      })
    .toss();
  })
.toss();

frisby.create('Access with no token (error: 6)')
  .get(checkURL)
  .expectStatus(200)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectJSONTypes('error', {
    code: Number,
    text: String
  })
  .expectJSON('error', {
    code: 6
  })
.toss();

frisby.create('Access with not valid token (error: 5)')
  .get(checkURL + '?token=' + 'NOTVALIDE')
  .expectStatus(200)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectJSONTypes('error', {
    code: Number,
    text: String
  })
  .expectJSON('error', {
    code: 5
  })
.toss();

frisby.create('Authenticate with wrong password (error: 4)')
  .post(authURL,
    { username: 'tester01', password: 'azertyA' },
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
    code: 4
  })
.toss();


frisby.create('Authenticate with user not found (error: 3)')
  .post(authURL,
    { username: 'tester99', password: 'azerty' },
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
    code: 3
  })
.toss();