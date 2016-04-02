var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var React = require('react');
var AppComponent = require('./components/app');


var Router = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  index: function() {
    console.log("This is the index page.");
    ReactDOM.render(<AppComponent />, document.getElementById('root'));
  }
});

module.exports = Router;