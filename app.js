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
	console.log('==> Received Request ==> ', req.method, req.url);
	console.log('==> Received Body ==> ', req.body);
	console.log('==============');
	return next();
});

app.use(cors());

/*app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
	return next();
});*/


 
connection.init();
routes.configure(app);

var server = app.listen(process.env.PORT || 8001, function() {
  console.log('Server listening on port ' + server.address().port);
});



