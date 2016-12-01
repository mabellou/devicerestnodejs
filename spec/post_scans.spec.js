var frisby = require('frisby');

var authURL = 'http://localhost:8001/api/v1/authenticate';
var scansURL = 'http://localhost:8001/api/v1/scans';

frisby.create('Send a User scan')
  .post(scansURL, {
  badgeId: "U9101011"
  },
  { json: true },
  { headers: { 'Content-Type': 'application/json' }
  })
  .expectStatus(200)
  .expectHeader('Content-Length','0')

  .after(function (res) {

    frisby.create('Assign the device to the user')
      .post(scansURL, {
      badgeId: "1039"
      },
      { json: true },
      { headers: { 'Content-Type': 'application/json' }
      })
      .expectStatus(200)
      .expectHeader('Content-Length','0')

      .after(function (res) {

        frisby.create('Free the device')
          .post(scansURL, {
          badgeId: "1039"
          },
          { json: true },
          { headers: { 'Content-Type': 'application/json' }
          })
          .expectStatus(200)
          .expectHeader('Content-Length','0')

        .toss();

      })
    .toss();

  })
.toss();


frisby.create('Send a scan that does not exist (error: 8)')
  .post(scansURL, {
    badgeId: "99999999"
    },
    { json: true },
    { headers: { 'Content-Type': 'application/json' }
    })
  .expectHeaderContains('Content-Type', 'application/json')
  .expectJSONTypes('error', {
    code: Number,
    text: String
  })
  .expectJSON('error', {
    code: 8
  })
.toss();


frisby.create('Send a scan without badgeId (error: 7)')
  .post(scansURL, {
    scanId: "1040"
    },
    { json: true },
    { headers: { 'Content-Type': 'application/json' }
    })
  .expectHeaderContains('Content-Type', 'application/json')
  .expectJSONTypes('error', {
    code: Number,
    text: String
  })
  .expectJSON('error', {
    code: 7
  })
.toss();



