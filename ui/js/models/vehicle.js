var Backbone = require('backbone');

var Vehicle = Backbone.Model.extend({
  url: function() {
    return this.id ? 'api/vehicles/' + this.id :  'api/vehicles';
  }
});

module.exports = Vehicle;