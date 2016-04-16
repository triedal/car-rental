var Backbone = require('backbone');

var Vehicles = Backbone.Collection.extend({
  model: Vehicle,
  url: '/vehicles'
});

module.exports = Vehicle;