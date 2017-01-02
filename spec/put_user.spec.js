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

    frisby.create('Update a user')
      .put(userURL + '6', { 
        firstname: 'newupdated',
        lastname: 'newupdated'
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

        frisby.create('Update a user: verify user exists')
          .get(usersURL)
          .expectJSON('?', {
            firstname: 'newupdated'
          })
        .toss();

        frisby.create('Update a user: User not found')
          .put(userURL + '99', { 
            firstname: 'updated2',
            lastname: 'updated2'
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
            code: 9
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
      .put(userURL + '1', { 
        firstname: 'updateFirstname',
        lastname: 'updateLastName'
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