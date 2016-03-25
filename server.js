var express = require('express');
var mysql = require('mysql');

var app = express();
var router = express.Router();

var port = process.env.PORT || 3000;

var pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'CarRental',
  debug: false, 
  acquireTimeout: 30000 // 30s
});

// API Router Stuff
app.get('/', function(req, res) {
  // will serve index.html here
  res.send('index');
});

// Vehicles ----------------------------
router.route('/vehicles')
  // Get all vehicles
  .get(function(req, res) {
    pool.getConnection(function(err,connection){
      if (err) throw err;
      connection.query('SELECT * FROM Vehicles', function(err,rows) {
        if (err) throw err;
        connection.release();
        if(!err) res.json(rows);      
      });
    });
  })

  .post(function(req, res) {

  });

router.route('/vehicles/:id')
  .get(function(req, res) {
    pool.getConnection(function(err,connection){
      if (err) throw err;
      connection.query('SELECT * FROM Vehicles WHERE vehicle_id = ?', [req.params.id], function(err,rows) {
        if (err) throw err;
        connection.release();
        if(!err) res.json(rows);      
      });
    });
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
    pool.getConnection(function(err,connection){
      if (err) throw err;
      connection.query('SELECT * FROM Customers', function(err,rows) {
        if (err) throw err;
        connection.release();
        if(!err) res.json(rows);      
      });
    });
  })

  .post(function(req, res) {

  });

router.route('/customers/:id')
  .get(function(req, res) {
    // TODO: Add support for id
    pool.getConnection(function(err,connection){
      if (err) throw err;
      connection.query('SELECT * FROM Customers WHERE cust_id = ?', [req.params.id], function(err,rows) {
        if (err) throw err;
        connection.release();
        if(!err) res.json(rows);      
      });
    });
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
    pool.getConnection(function(err,connection){
      if (err) throw err;
      connection.query('SELECT * FROM RentalContracts', function(err,rows) {
        if (err) throw err;
        connection.release();
        if(!err) res.json(rows);      
      });
    });
  })

  .post(function(req, res) {

  });

router.route('/contracts/:id')
  .get(function(req, res) {
    pool.getConnection(function(err,connection){
      if (err) throw err;
      connection.query('SELECT * FROM RentalContracts WHERE contract_id = ?', [req.params.id], function(err,rows) {
        if (err) throw err;
        connection.release();
        if(!err) res.json(rows);      
      });
    });
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