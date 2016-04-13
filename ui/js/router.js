var Backbone = require('backbone');

var handlers = {
  index: require('./components/reserve'),
  models: require('./components/vehicleModels'),
  contact: require('./components/contact')
}

var Router = Backbone.Router.extend({

  routes: {
    '': 'index',
    'vehicle-models': 'models',
    'contact': 'contact'
  }

});

module.exports = new Router();
module.exports.getHandler = function(name) {
  return handlers[name]
}