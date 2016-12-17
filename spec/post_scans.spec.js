var frisby = require('frisby');

var authURL = 'http://localhost:8001/api/v1/authenticate';
var scansURL = 'http://localhost:8001/api/v1/scans';

frisby.create('Send a User scan')
  .post(scansURL, {
  badgeId: "U9101011",
  key: "thiskeyisnottoomuchsecure"
  },
  { json: true },
  { headers: { 'Content-Type': 'application/json' }
  })
  .expectStatus(200)
  .expectJSONTypes('message', {
    code: Number,
    text: String,
    sound: Boolean,
    voice: Boolean
  })
  .expectJSON('message', {
    code: 4
  })

  .after(function (res) {

    frisby.create('Assign the device to the user')
      .post(scansURL, {
      badgeId: "1039",
      key: "thiskeyisnottoomuchsecure"
      },
      { json: true },
      { headers: { 'Content-Type': 'application/json' }
      })
      .expectStatus(200)
      .expectJSONTypes('message', {
        code: Number,
        text: String,
        sound: Boolean,
        voice: Boolean
      })
      .expectJSON('message', {
        code: 3
      })

    .toss();

  })
.toss();


frisby.create('Send a scan that does not exist (error: 8)')
  .post(scansURL, {
    badgeId: "99999999",
    key: "thiskeyisnottoomuchsecure"
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
    scanId: "1040",
    key: "thiskeyisnottoomuchsecure"
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



