var Backbone = require('backbone');

var Vehicle = Backbone.Model.extend({
  url: function() {
    return this.id ? '/vehicles/' + this.id :  '/vehicles';
  }
});

module.exports = Vehicle;