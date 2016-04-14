var React = require('react');

var VehicleModel = React.createClass({
  render: function() {
    return (
      <div id="vehicles" className="container-fluid max-width">
        <div className="row">
          <div className="col-md-12">
            <h2 className="title">
              Vehicle Models - <span className="subtitle"> Our rental fleet at a glance</span>
            </h2>
            <div className="col-md-3">

            </div>
            <div className="vehicle-data">
              <div className="col-md-6">
                <div className="vehicle-img">
                  <img className="img-respnsive" src="ui/imgs/vehicle5.jpg" alt="Vehicle" />
                </div>
              </div>
              <div className="col-md-3">
                <div className="vehicle-price">
                  $ 100.40 <span className="info">per day</span>
                </div>
                <table className="table vehicle-features">
                  <tbody>
                    <tr>
                      <td>Model</td>
                      <td>Limousine</td>
                    </tr>
                    <tr>
                      <td>Doors</td>
                      <td>4</td>
                    </tr>
                    <tr>
                      <td>Seats</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <td>Luggage</td>
                      <td>2 Suitcases / 2 Bags</td>
                    </tr>
                    <tr>
                      <td>Transmission</td>
                      <td>Automatic</td>
                    </tr>
                    <tr>
                      <td>Air conditioning</td>
                      <td>Yes</td>
                    </tr>
                    <tr>
                      <td>Minimum age</td>
                      <td>25 years</td>
                    </tr>
                  </tbody>
                </table>
                <a className="reserve-button scroll-to"><span className="glyphicon glyphicon-calendar"></span>reserve now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = VehicleModel;