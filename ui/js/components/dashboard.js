var React = require('react');
var _ = require('lodash');

var Dashboard = React.createClass({
  vehicleRows: function() {
    var _this = this;
    var rows = [];
    _(this.props.vehicles).forEach(function(vehicle, index) {
      rows.push(
        <tr>
          <td>{vehicle.vehicle_id}</td>
          <td>{vehicle.year}</td>
          <td>{vehicle.make}</td>
          <td>{vehicle.model}</td>
          <td>{vehicle.odometer} mi.</td>
          <td>{vehicle.status}</td>
          <td>{vehicle.vin_num}</td>
          <td>{vehicle.type}</td>
        </tr>
      );
    });
    return rows;
  },
  submitForm: function(e) {
    var form = document.getElementsByName('vehicle-post')[0];
    if (form.checkValidity()) {
      form.submit();
      form.reset();
      return false;
    } else {
      alert('Please check required fields.');
    }
  },
	render: function() {
    var vehicleRows = this.vehicleRows();
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
        </div>
      </div>
		);
	}
});

module.exports = Dashboard;