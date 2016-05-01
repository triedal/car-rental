var React = require('react');
var Navbar = require('./navbar');
var Reserve = require('./reserve');
var Router = require('../router');
var Vehicles = require('../collections/vehicles');
var Customers = require('../collections/customers')
var Contracts = require('../collections/contracts');

var App = React.createClass({
  getInitialState: function() {
    return {vehicles: [], customers: [], contracts: []};
  },
  componentDidMount: function() {
    var _this = this;
    window.app = window.app || {};
    window.app.router = Router;
    
    window.app.vehicles = new Vehicles();
    window.app.vehicles.fetch({
      success: function(vehicles) {
        this.setState({vehicles: vehicles});
      }.bind(this),
      error: function() {
        console.log('error fetching vehicles');
      }.bind(this)
    });

    window.app.customers = new Customers();
    window.app.customers.fetch({
      success: function(customers) {
        this.setState({customers: customers});
      }.bind(this),
      error: function() {
        console.log('error fetching customers');
      }.bind(this)
    });

    window.app.contracts = new Contracts();
    window.app.contracts.fetch({
      success: function(contracts) {
        this.setState({contracts: contracts});
      }.bind(this),
      error: function() {
        console.log('error fetching contracts');
      }.bind(this)
    });
  },
  render: function() {
      var Handler = Router.getHandler(this.props.route.name);
      return (
        <div>
          { this.props.route.name !== 'dashboard' ? <Navbar /> : null }
          <Handler route={this.props.route} vehicles={this.state.vehicles} customers={this.state.customers} contracts={this.state.contracts} />
        </div> 
      );
  }
});

module.exports = App;