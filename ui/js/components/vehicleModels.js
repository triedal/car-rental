var React = require('react');

var VehicleModel = React.createClass({
  buildVehicleList: function() {
    var vehicleChoices = [];
    _(this.props.vehicles).forEach(function(vehicle, index) {
      vehicleChoices.push(
        <li key={index} className="" name={vehicle.make + ' ' + vehicle.model}>
          <a>{vehicle.make + ' ' + vehicle.model}</a>
          <span className="">&nbsp;</span>
        </li>
      );
    });
    console.log(vehicleChoices);
    var options = _.uniqBy(vehicleChoices, 'props.name');
    return options;
  },
  render: function() {
    var vehicles = this.buildVehicleList();
    return (
      <div id="vehicles" className="container-fluid max-width">
        <div className="row">
          <div className="col-md-12">
            <h2 className="title">
              Vehicle Models - <span className="subtitle"> Our rental fleet at a glance</span>
            </h2>
            <div className="col-md-3">
              <div id="vehicle-nav-container">
                <ul className="vehicle-nav">
                  {vehicles}
                </ul>
              </div>
              <div className="vehicle-nav-control">
                <a className="vehicle-nav-scroll" data-direction="up" href="#"><i className="fa fa-chevron-up"></i></a>
                <a className="vehicle-nav-scroll" data-direction="down" href="#"><i className="fa fa-chevron-down"></i></a>
              </div>
            </div>
            <div className="vehicle-data">
              <div className="col-md-6">
                <div className="vehicle-img">
                  <img className="img-respnsive" src="ui/imgs/vehicle5.jpg" alt="Vehicle" />
                </div>
              </div>
              <div className="col-md-3">
                <div className="vehicle-price">
                  $ 100.40 <span className="info">per day</span>
                </div>
                <table className="table vehicle-features">
                  <tbody>
                    <tr>
                      <td>Model</td>
                      <td>Limousine</td>
                    </tr>
                    <tr>
                      <td>Doors</td>
                      <td>4</td>
                    </tr>
                    <tr>
                      <td>Seats</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <td>Luggage</td>
                      <td>2 Suitcases / 2 Bags</td>
                    </tr>
                    <tr>
                      <td>Transmission</td>
                      <td>Automatic</td>
                    </tr>
                    <tr>
                      <td>Air conditioning</td>
                      <td>Yes</td>
                    </tr>
                    <tr>
                      <td>Minimum age</td>
                      <td>25 years</td>
                    </tr>
                  </tbody>
                </table>
                <a className="reserve-button scroll-to"><span className="glyphicon glyphicon-calendar"></span>reserve now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = VehicleModel;