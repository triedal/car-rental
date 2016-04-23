var React = require('react');
var Navbar = require('./navbar');
var Reserve = require('./reserve');
var Router = require('../router');
var Vehicles = require('../collections/vehicles');

var App = React.createClass({
  getInitialState: function() {
    return {vehicles: []};
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
      console.log('error');
    }.bind(this)
  });
  },
  render: function() {
      var Handler = Router.getHandler(this.props.route.name);
      return (
        <div>
          { this.props.route.name !== 'dashboard' ? <Navbar /> : null }
          <Handler route={this.props.route} vehicles={this.state.vehicles} />
        </div> 
      );
  }
});

module.exports = App;