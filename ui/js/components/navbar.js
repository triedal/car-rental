var React = require('react');

var Navbar = React.createClass({
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
                  <a className="navbar-brand" href="#">Renty</a>
              </div>
              <div className="collapse navbar-collapse navbar-right" id="navbar1">
                  <ul className="nav navbar-nav">
                      <li className="active"><a href="#">Home</a></li>
                      <li><a href="#">Vehicle Models</a></li>
                      <li><a href="#">Contact</a></li>
                  </ul>
              </div>
          </div>
      </nav>
    );
  }
});

module.exports = Navbar;