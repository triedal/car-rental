var Backbone = require('backbone');

var Vehicle = Backbone.Model.extend({
  idAttribute: 'vehicle_id',
  url: function() {
    return this.id ? 'api/vehicles/' + this.id :  'api/vehicles';
  },
  defaults: {
    status: 'available'
  }
});

module.exports = Vehicle;