var express = require('express');
var mysql = require('mysql');

var app = express();
var router = express.Router();

var port = process.env.PORT || 3000;

// API Router Stuff
router.get('/', function(req, res) {
  
});

// Vehicles ----------------------------
router.route('/vehicles')
  // Get all vehicles
  .get(function(req, res) {

  })

  .post(function(req, res) {

  });

router.route('/vehicles/:id')
  .get(function(req, res) {

  })

  // Update vehicle by ID
  .put(function(req, res) {

  })

  .delete(function(req, res) {

  });

// Customers --------------------------
router.route('/customers')
  // Get all customers
  .get(function(req, res) {

  })

  .post(function(req, res) {

  });

router.route('/customers/:id')
  .get(function(req, res) {

  })

  // Update customer by ID
  .put(function(req, res) {

  })

  .delete(function(req, res) {

  });

// Rental contracts ------------------
router.route('/contracts')
  // Get all customers
  .get(function(req, res) {

  })

  .post(function(req, res) {

  });

router.route('/contracts/:id')
  .get(function(req, res) {

  })

  // Update contract by ID
  .put(function(req, res) {

  })

  .delete(function(req, res) {

  });


app.use('/api', router);

// This serves the web app on the specified port (localhost:3000)
app.listen(port);
console.log('The magic happens on port ' + port);