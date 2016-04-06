var React = require('react');

var Reserve = React.createClass({
  render: function () {
    return (
      <div id="teaser">
      	<div className="container-fluid max-width">
      		<div className="row-fluid">
            <div className="col-md-7 col-xs-12 pull-right">
              <h1 className="title">luxury cars available<span className="subtitle">Plan your trip now</span></h1>
              <div className="car-img">
                <img src="ui/imgs/car2.png" className="img-responsive" />
              </div>
            </div>
      			<div className="col-md-5 col-xs-12 pull-left">
              <div className="reservation-form-shadow">
                <form action="#" method="post" name="car-select-form" id="car-select-form">
                  <div className="styled-select-car">
                    <select name="car-select" id="car-select">
                      <option value="">Select your car type</option>
                      <option value="">VW Golf VII</option>
                      <option value="">Audi A1 S-LINE</option>
                      <option value="">Toyota Camry</option>
                      <option value="">BMW 320 ModernLine</option>
                      <option value="">Mercedes-Benz GLK</option>
                      <option value="">VW Passat CC</option>
                    </select>
                  </div>
                  <input type="submit" className="submit" value="reserve car now" id="checkoutModalLabel" />
                </form>
              </div>
            </div>
      		</div>
      	</div>
      </div>
    );
  }
});

module.exports = Reserve;