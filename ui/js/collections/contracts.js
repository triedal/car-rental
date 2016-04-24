var Backbone = require('backbone');
var Contract = require('../models/Contract');

var Contracts = Backbone.Collection.extend({
  model: Contract,
  url: 'api/contracts',
  parse: function(res) {
    return res;
  }
});

module.exports = Contracts;