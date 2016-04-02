var React = require('react');
var Navbar = require('./navbar');
var Reserve = require('./reserve');

var App = React.createClass({
  render: function() {
      return (
        <div>
          <Navbar />
          <Reserve />
        </div> 
      );
  }
});

module.exports = App;