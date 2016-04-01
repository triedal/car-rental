var Backbone = require('backbone');



var Router = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  index: function() {
    console.log("This is the index page.");
  }
});

module.exports = Router;
