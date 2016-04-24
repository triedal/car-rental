var React = require('react');
var _ = require('lodash');
var Vehicle = require('../models/vehicle');
var $ = require('jquery');
var moment = require('moment');

var Dashboard = React.createClass({
  deleteRow: function(e) {
    _this = this;
    var $row = $(e.target).parents()[2];
    var id = $($row).children(0).html();
    var tableName = $($row).closest('.row-fluid').find('h3').html();

    var victim = tableName === 'Vehicles' ? window.app.vehicles.get(id) : tableName === 'Customers' ? window.app.customers.get(id) : window.app.contracts.get(id);

    victim.destroy({
      success: function() {
        _this.forceUpdate();
      }
    });
  },
  contractRows: function() {
    var _this = this;
    var rows = [];
    _(this.props.contracts.models).forEach(function(contract, index) {
      rows.push(
        <tr key={index}>
          <td>{contract.id}</td>
          <td>{contract.attributes.cust_id}</td>
          <td>{contract.attributes.vehicle_id}</td>
          <td>{contract.attributes.meter_out} mi.</td>
          <td>{contract.attributes.meter_in} mi.</td>
          <td>${contract.attributes.cost_per_day}</td>
          <td>{moment(contract.attributes.pick_up).format('M/D/YYYY')}</td>
          <td>{moment(contract.attributes.pick_up).format('h:mm A')}</td>
          <td>{moment(contract.attributes.drop_off).format('M/D/YYYY')}</td>
          <td>{moment(contract.attributes.drop_off).format('h:mm A')}</td>
          <td><a onClick={_this.deleteRow} className="btn btn-circle-micro"><span className="glyphicon glyphicon-remove"></span> </a></td>
        </tr>
      );
    });
    return rows;
  },
  customerRows: function() {
    var _this = this;
    var rows = [];
    _(this.props.customers.models).forEach(function(customer, index) {
      rows.push(
        <tr key={index}>
          <td>{customer.id}</td>
          <td>{customer.attributes.firstname}</td>
          <td>{customer.attributes.lastname}</td>
          <td><a onClick={_this.deleteRow} className="btn btn-circle-micro"><span className="glyphicon glyphicon-remove"></span> </a></td>
        </tr>
      );
    });
    return rows;
  },
  vehicleRows: function() {
    var _this = this;
    var rows = [];
    _(this.props.vehicles.models).forEach(function(vehicle, index) {
      rows.push(
        <tr key={index}>
          <td>{vehicle.id}</td>
          <td>{vehicle.attributes.year}</td>
          <td>{vehicle.attributes.make}</td>
          <td>{vehicle.attributes.model}</td>
          <td>{vehicle.attributes.odometer} mi.</td>
          <td>{vehicle.attributes.status}</td>
          <td>{vehicle.attributes.vin_num}</td>
          <td>{vehicle.attributes.type}</td>
          <td>${vehicle.attributes.cost_per_day}</td>
          <td><a onClick={_this.deleteRow} className="btn btn-circle-micro"><span className="glyphicon glyphicon-remove"></span> </a></td>
        </tr>
      );
    });
    return rows;
  },
  submitForm: function(e) {
    var _this = this; 

    e.preventDefault()
    var form = document.getElementsByName('vehicle-post')[0];
    
    var id = form.elements['id'].value
    var year = form.elements['year'].value
    var make = form.elements['make'].value
    var model = form.elements['model'].value
    var vin = form.elements['vin'].value
    var odometer = form.elements['odometer'].value
    var cost = form.elements['cost'].value
    var type = form.elements['type'].value

    
    if (id) {
      // PUT request
      var vehicle = window.app.vehicles.get(id)
      vehicle.set({
        cost_per_day: cost,
        make: make,
        model: model,
        odometer: odometer,
        type: type,
        year: year,
        vin_num: vin
      });

      vehicle.save(null, {
        dataType: 'text',
        success: function() {
          _this.forceUpdate();
        },
        error: function() {
          alert('An error occured :(');
        }
      });
    } else {
      // POST request
      var vehicle = new Vehicle({
        cost_per_day: cost,
        make: make,
        model: model,
        odometer: odometer,
        type: type,
        year: year,
        vin_num: vin
      });

      vehicle.save(null, {
        success: function() {
          vehicle.set({vehicle_id: window.app.vehicles.length + 1})
          window.app.vehicles.add(vehicle);
          _this.forceUpdate();
        }
      });
    }

    form.reset();
  },
	render: function() {
    var vehicleRows = this.vehicleRows();
    var customerRows = this.customerRows();
    var contractRows = this.contractRows();
		return (
      <div id="dashboard">
        <div className="container-fluid max-width">
          <h1>Welcome!</h1>
          <div className="row-fluid">
            <h3>Vehicles</h3>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Year</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Odometer</th>
                    <th>Status</th>
                    <th>VIN</th>
                    <th>Type</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleRows}
                </tbody>
              </table>
            </div>
            <form name="vehicle-post" action="/api/vehicles" method="post">
              
                <select name="type">
                  <option value="coupe">Coupe</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="truck">Truck</option>
                  <option value="other">Other</option>
                </select>
                      
                <input type="number" name="id" placeholder="#"/>       
                <input type="number" name="year" placeholder="Year" required />             
                <input type="text" name="make" placeholder="Make" required />        
                <input type="text" name="model" placeholder="Model" required />  
                <input type="text" name="vin" placeholder="Vin number" required/> 
                <input type="number" name="odometer" placeholder="Odometer" required/> 
                <input type="number" name="cost" placeholder="Cost per day" required/>
                
                <button type="button" onClick={this.submitForm}>Add Vehicle</button> 
            </form>
          </div>
          <div className="row-fluid">
            <h3>Customers</h3>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                  </tr>
                </thead>
                <tbody>
                  {customerRows}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row-fluid">
            <h3>Rental Contracts</h3>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Cust #</th>
                    <th>Vehicle #</th>
                    <th>Odometer Out</th>
                    <th>Odometer In</th>
                    <th>Cost</th>
                    <th>Pick Up Day</th>
                    <th>Pick Up Time</th>
                    <th>Drop Off Day</th>
                    <th>Drop Off Time</th>
                  </tr>
                </thead>
                <tbody>
                  {contractRows}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
		);
	}
});

module.exports = Dashboard;