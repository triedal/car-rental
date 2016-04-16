var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');
var subdomain = require('express-subdomain');

var app = express();
var router = express.Router();
var dashRouter = express.Router();

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

// Subdomain router for dashboard.renty.com
dashRouter.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/dashboard.html'));
});

dashRouter.get('/*', function(req, res) {
  res.sendStatus(404);
});



app.use(subdomain('dashboard', dashRouter));

// bodyParser setup
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// API Router Stuff
//
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
    pool.getConnection(function(err,connection){
      if (err) throw err;

      var type = req.body.type;
      var year = req.body.year;
      var make = req.body.make;
      var model = req.body.model;
      var vin = req.body.vin;
      var odometer = req.body.odometer;
      var cost = req.body.cost;
      
      connection.query('INSERT INTO Vehicles (type, year, make, model, vin_num, odometer, cost_per_day) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [type, year, make, model, vin, odometer, cost],
        function(err,rows) {
          if (err) throw err;
          connection.release();
          if(!err) res.json(rows);      
        });
    });
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
    pool.getConnection(function(err,connection){
      if (err) throw err;
      
      connection.query('UPDATE Vehicles SET ? WHERE ?', [req.body, req.params.id], function(err,rows) {
        if (err) throw err;
        connection.release();
        if(!err) res.json(rows);      
      });
    });
  })

  .delete(function(req, res) {
    pool.getConnection(function(err,connection){
      if (err) throw err;
      connection.query('DELETE FROM Vehicles WHERE vehicle_id = ?', [req.params.id], function(err,rows) {
        if (err) throw err;
        connection.release();
        if(!err) res.json(rows);      
      });
    });
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
    pool.getConnection(function(err,connection){
      if (err) throw err;

      var firstname = req.body.firstname;
      var lastname = req.body.lastname;

      connection.query('INSERT INTO Customers (firstname, lastname) VALUES (?, ?)', [firstname, lastname], function(err,rows) {
        if (err) throw err;
        connection.release();
        if(!err) res.json(rows);      
      });
    });
  });

router.route('/customers/:id')
  .get(function(req, res) {
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
    pool.getConnection(function(err,connection){
      if (err) throw err;
      
      connection.query('UPDATE Customers SET ? WHERE ?', [req.body, req.params.id], function(err,rows) {
        if (err) throw err;
        connection.release();
        if(!err) res.json(rows);      
      });
    });
  })

  .delete(function(req, res) {
    pool.getConnection(function(err,connection){
      if (err) throw err;
      connection.query('DELETE FROM Customers WHERE cust_id = ?', [req.params.id], function(err,rows) {
        if (err) throw err;
        connection.release();
        if(!err) res.json(rows);      
      });
    });
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
    pool.getConnection(function(err,connection){
      if (err) throw err;

      var custId = req.body.custId;
      var vehicleId = req.body.vehicleId;
      var meterOut = req.body.meterOut;
      var meterIn = null;
      var costPerMile = req.body.costPerMile;
      var date = req.body.date;

      connection.query('INSERT INTO RentalContracts (cust_id, vehicle_id, meter_out, meter_in, cost_per_mile, reg_date) VALUES (?, ?, ?, ?, ?, NOW())',
        [custId, vehicleId, meterOut, meterIn, costPerMile],
        function(err,rows) {
          if (err) throw err;
          connection.release();
          if(!err) res.json(rows);      
        });
    });
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
    pool.getConnection(function(err,connection){
      if (err) throw err;
      
      connection.query('UPDATE RentalContracts SET ? WHERE ?', [req.body, req.params.id], function(err,rows) {
        if (err) throw err;
        connection.release();
        if(!err) res.json(rows);      
      });
    });
  })

  .delete(function(req, res) {
    pool.getConnection(function(err,connection){
      if (err) throw err;
      connection.query('DELETE FROM RentalContracts WHERE contract_id = ?', [req.params.id], function(err,rows) {
        if (err) throw err;
        connection.release();
        if(!err) res.json(rows);      
      });
    });
  });

app.use('/api', router);

// Serve up static files needed
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist/')));

// This serves as the entry point into the app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// This serves the web app on the specified port (localhost:3000)
app.listen(port);
console.log('The magic happens on port ' + port);