var React = require('react');
var Navbar = require('./navbar');
var Reserve = require('./reserve');
var Router = require('../router');

var App = React.createClass({
  render: function() {
      var Handler = Router.getHandler(this.props.route.name);
      return (
        <div>
          <Navbar />
          <Handler route={this.props.route} />
        </div> 
      );
  }
});

module.exports = App;