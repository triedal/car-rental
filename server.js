var express = require('express');
var mysql = require('mysql');

var app = express();
var router = express.Router();

var port = process.env.PORT || 3000;

// API Router Stuff
router.get('/', function(req, res) {
	res.send('API index');
});

app.use('/api', router);

app.listen(port);
console.log('The magic happens on port ' + port);