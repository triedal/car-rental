var Backbone = require('backbone');
var Vehicle = require('../models/vehicle');

var Vehicles = Backbone.Collection.extend({
  model: Vehicle,
  url: 'api/vehicles',
  parse: function(res) {
    return res;
  }
});

module.exports = Vehicles;