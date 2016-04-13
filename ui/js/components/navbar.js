var React = require('react');
var Router = require('../router');

var Navbar = React.createClass({
  handleClick: function(path, e) {
    Router.navigate(path, true);
  },
  render: function() {
    return (
      <nav className="navbar navbar-new" role="navigation">
          <div className="container-fluid max-width">
              <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar1">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" onClick={this.handleClick.bind(this, '')}>Renty</a>
              </div>
              <div className="collapse navbar-collapse navbar-right" id="navbar1">
                  <ul className="nav navbar-nav">
                      <li className="active"><a onClick={this.handleClick.bind(this, '')}>Home</a></li>
                      <li><a onClick={this.handleClick.bind(this, 'vehicle-models')}>Vehicle Models</a></li>
                      <li><a onClick={this.handleClick.bind(this, 'contact')}>Contact</a></li>
                  </ul>
              </div>
          </div>
      </nav>
    );
  }
});

module.exports = Navbar;