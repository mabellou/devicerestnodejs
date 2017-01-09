// run the test jasmine-node spec/
var express = require('express');
var bodyparser = require('body-parser');
var morgan = require('morgan');
var connection = require('./connection');
var routes = require('./routes');
var cors = require('cors');
var expressValidator = require('express-validator');
var moment = require('moment');
var env = process.env.NODE_ENV || "development";

 
var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
if (env === "development") {
  process.env.JWT_PRIVATE_KEY = "toomuchsecuretoken"
} else if (!process.env.JWT_PRIVATE_KEY) {
  throw "Missing JWT_PRIVATE_KEY env var" 
}


//app.use(morgan('dev'));
app.use(expressValidator({
  customValidators: {
     isDDMMYYYY: function(value) {
        return moment(value, "DD/MM/YYYY").isValid();
     },
     isLt255: function(value) {
     		if (value)
        	return value.length <= 255;
        else
        	return true;
     },
     isString: function(value) {
        return (typeof value === 'string' || value instanceof String || value === "" || value == null);
     },
     isProfile: function(value) {
        if (value === 'administrator' || value === 'incubator' || value === 'business' || value === 'tester' || value === 'savi')
          return true;
        else
          return false;
     }
  }
}));

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



