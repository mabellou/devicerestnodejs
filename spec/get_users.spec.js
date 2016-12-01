var frisby = require('frisby');

var authURL = 'http://localhost:8001/api/v1/authenticate';
var usersURL = 'http://localhost:8001/private/api/v1/users';


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

    frisby.create('Get the user list')
      .get(usersURL)
      .addHeader('x-access-token', res.token)
      .expectStatus(200)
      .expectHeaderContains('Content-Type', 'application/json')
      .expectJSONTypes('*', {
        id: Number,
        profile: String
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

    
    frisby.create('No authorization to access this url (error: 2)')
      .get(usersURL)
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