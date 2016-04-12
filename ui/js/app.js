var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('./router');
var Backbone = require('backbone');
var $ = require('jquery');
var App = require('./components/app');



Router.on('route', function(name, params) {
  var route = {name: name, params: params};
  ReactDOM.render(<App route={route} />, document.getElementById('root'));
});

Backbone.$ = $;
Backbone.history.start({pushState: true});