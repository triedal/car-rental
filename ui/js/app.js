var Router = require('./router');
var Backbone = require('backbone');
var $ = require('jquery');

var app = {
  init: function() {
    Backbone.$ = $;
    this.router = new Router();
    Backbone.history.start();
  }
}

module.exports = app;
app.init();