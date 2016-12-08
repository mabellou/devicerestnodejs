// run the test jasmine-node spec/
var express = require('express');
var bodyparser = require('body-parser');
var morgan = require('morgan');
var connection = require('./connection');
var routes = require('./routes');
var cors = require('cors');
var expressValidator = require('express-validator');
var moment = require('moment');

 
var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

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



