var Backbone = require('backbone');
var Customer = require('../models/customer');

var Customers = Backbone.Collection.extend({
  model: Customer,
  url: 'api/customers',
  parse: function(res) {
    return res;
  }
});

module.exports = Customers;