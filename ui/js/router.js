var Backbone = require('backbone');

var handlers = {
  index: require('./components/reserve'),
  models: require('./components/vehicleModels')
}

var Router = Backbone.Router.extend({

  routes: {
    '': 'index',
    'vehicle-models': 'models'
  }

});

module.exports = new Router();
module.exports.getHandler = function(name) {
  return handlers[name]
}