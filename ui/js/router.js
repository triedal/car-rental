var Backbone = require('backbone');

var handlers = {
  index: require('./components/reserve'),
  models: require('./components/vehicleModels'),
  contact: require('./components/contact'),
  dashboard: require('./components/dashboard')
}

var Router = Backbone.Router.extend({

  routes: {
    '': 'index',
    'vehicle-models': 'models',
    'contact': 'contact',
    'dashboard': 'dashboard'
  }

});

module.exports = new Router();
module.exports.getHandler = function(name) {
  return handlers[name]
}