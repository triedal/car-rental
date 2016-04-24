var Backbone = require('backbone');

var Customer = Backbone.Model.extend({
  idAttribute: 'cust_id',
  url: function() {
    return this.id ? 'api/customers/' + this.id :  'api/customers';
  }
});

module.exports = Customer;