var express = require('express');
var bodyparser = require('body-parser');
var morgan = require('morgan');
var connection = require('./connection');
var routes = require('./routes');
var cors = require('cors');
 
var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

//app.use(morgan('dev'));

app.use(function(req, res, next) {
  console.log();
  console.log('==============');
  console.log('==> Request URL ==> ', req.method, req.url);
  console.log('==> Request Body ==> ', req.body);
  console.log('---');
  return next();
});

app.use(cors());
 
connection.init();
routes.configure(app);

var server = app.listen(process.env.PORT || 8001, function() {
  console.log('Server listening on port ' + server.address().port);
});



