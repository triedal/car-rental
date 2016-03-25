var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

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

// bodyParser setup
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// API Router Stuff
app.get('/', function(req, res) {
  //res.sendFile(path.join(__dirname, '/ui/index.html'));
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
    pool.getConnection(function(err,connection){
      if (err) throw err;

      var type = req.body.type;
      var status = req.body.status;
      var vin = req.body.vin;
      var meterReading = req.body.meterReading;
      var costPerMile = req.body.costPerMile;

      connection.query('INSERT INTO Vehicles (type, status, vin_num, meter_reading, cost_per_mile) VALUES (?, ?, ?, ?, ?)',
        [type, status, vin, meterReading, costPerMile],
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

// This serves the web app on the specified port (localhost:3000)
app.listen(port);
console.log('The magic happens on port ' + port);