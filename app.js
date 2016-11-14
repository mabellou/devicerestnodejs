
var express = require('express');
var bodyparser = require('body-parser');
var morgan = require('morgan');
var connection = require('./connection');
var routes = require('./routes');
 
var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use(morgan('dev'));

app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	return next();
});

 
connection.init();
routes.configure(app);

var server = app.listen(process.env.PORT || 8001, function() {
  console.log('Server listening on port ' + server.address().port);
});



