var Backbone = require('backbone');

var Contract = Backbone.Model.extend({
  idAttribute: 'contract_id',
  url: function() {
    return this.id ? 'api/contracts/' + this.id :  'api/contracts';
  }
});

module.exports = Contract;