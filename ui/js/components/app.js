var React = require('react');
var Navbar = require('./navbar');

var App = React.createClass({
  render: function() {
      return (
          <Navbar />
      );
  }
});

module.exports = App;