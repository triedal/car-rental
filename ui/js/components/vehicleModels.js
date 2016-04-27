var React = require('react');
var Router = require('../router');
var $ = require('jquery');
var _ = require('lodash');

var VehicleModels = React.createClass({
  getInitialState: function() {
    return {
      vehicle: {
        attributes: {
          cost_per_day: 37,
          make: 'Mercedes-Benz',
          model: 'GLK350',
          odometer: null,
          status: null,
          type: null,
          vehicle_id: null,
          vin_num: null,
          year: '2013'
        }
      }
    };
  },
  reserveClick: function() {
    // FIXME: This is super hacky
    $('.nav li').removeClass('active');
    $('.nav li').first().addClass('active');
    window.app.router.navigate('', true);
  },
  vehicleNavClick: function(vehicle, e) {
    this.setState({
      vehicle: vehicle.vehicle
    });    
  },
  buildVehicleList: function() {
    var _this = this;
    var vehicleChoices = [];
    _(this.props.vehicles.models).forEach(function(vehicle, index) {
      vehicleChoices.push(
        <li key={index} data-make={vehicle.attributes.make} data-model={vehicle.attributes.model} onClick={_this.vehicleNavClick.bind(null, {vehicle} )}>
          <a>{vehicle.attributes.make + ' ' + vehicle.attributes.model}</a>
          <span className="">&nbsp;</span>
        </li>
      );
    });
    var options = _.uniqBy(vehicleChoices, 'props.data-model');
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
              {/*
              <div className="vehicle-nav-control">
                <a className="vehicle-nav-scroll" data-direction="up" href="#"><i className="fa fa-chevron-up"></i></a>
                <a className="vehicle-nav-scroll" data-direction="down" href="#"><i className="fa fa-chevron-down"></i></a>
              </div>
              */}
            </div>
            <div className="vehicle-data">
              <div className="col-md-6">
                <div className="vehicle-img">
                  <img className="img-respnsive" src={"ui/imgs/" + this.state.vehicle.attributes.model + ".jpg"} alt="Vehicle" />
                </div>
              </div>
              <div className="col-md-3">
                <div className="vehicle-price">
                  $ {this.state.vehicle.attributes.cost_per_day} <span className="info">per day</span>
                </div>
                <table className="table vehicle-features">
                  <tbody>
                    <tr>
                      <td>Make</td>
                      <td>{this.state.vehicle.attributes.make}</td>
                    </tr>
                    <tr>
                      <td>Model</td>
                      <td>{this.state.vehicle.attributes.model}</td>
                    </tr>
                    <tr>
                      <td>Year</td>
                      <td>{this.state.vehicle.attributes.year}</td>
                    </tr>
                    <tr>
                      <td>Doors</td>
                      <td>{ this.state.vehicle.attributes.type === 'coupe' ? 2 : 4 }</td>
                    </tr>
                    <tr>
                      <td>Transmission</td>
                      <td>Automatic</td>
                    </tr>
                    <tr>
                      <td>Air conditioning</td>
                      <td>Yes</td>
                    </tr>
                  </tbody>
                </table>
                <a className="reserve-button scroll-to" onClick={this.reserveClick}><span className="glyphicon glyphicon-calendar"></span>reserve now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = VehicleModels;