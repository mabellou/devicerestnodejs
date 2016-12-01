var frisby = require('frisby');

var authURL = 'http://localhost:8001/api/v1/authenticate';
var userURL = 'http://localhost:8001/private/api/v1/user/';
var usersURL = 'http://localhost:8001/private/api/v1/users';
var userNumber = Math.floor((Math.random() * 1024) + 1).toString();


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

    frisby.create('Create a user')
      .post(userURL, { 
        username: 'createUser' + userNumber, 
        password: 'azerty',
        firstname: 'testfirst' + userNumber,
        lastname: 'testlast',
        profile: 'tester'
        },
        { json: true },
        { headers: { 'Content-Type': 'application/json' }
      })
      .expectStatus(200)
      .expectHeader('Content-Length','0')
      .after(function (res) {

        frisby.create('Create a user: verify user exists')
          .get(usersURL)
          .expectJSON('?', {
            firstname: 'testfirst' + userNumber
          })
        .toss();

        frisby.create('The user already exists (error: 11)')
          .post(userURL, { 
            username: 'createUser' + userNumber, 
            password: 'azerty',
            firstname: 'testfirst' + userNumber,
            lastname: 'testlast',
            profile: 'tester'
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
            code: 11
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
      .post(userURL, { 
        username: 'createUser' + userNumber, 
        password: 'azerty',
        firstname: 'testfirst' + userNumber,
        lastname: 'testlast',
        profile: 'tester'
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