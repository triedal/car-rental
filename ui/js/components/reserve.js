var React = require('react');
var _ = require('lodash');
var $ = require('jquery');
var Customer = require('../models/customer');
var Contract = require('../models/contract');

var Reserve = React.createClass({
  formatDate: function(date) {
    var dateParts = date.split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    return dateParts[3] + "-" + dateParts[1] + "-" + dateParts[2];
  },
  convertTime: function(format, str) {
    var time = str;
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;

    return (sHours + ":" + sMinutes);
  },
  resetForms: function() {
    $('form').trigger('reset');
  },
  completeReservation: function() {
    var $modalFormData = $('#reserveForm').serializeArray();
    var fName = $modalFormData[0].value;
    var lName = $modalFormData[1].value;

    var $carSelectFormData = $('#car-select-form').serializeArray();
    var [make, model] = $carSelectFormData[0].value.split(' ');
    var pickUpDate = $carSelectFormData[1].value;
    var pickUpTime = $carSelectFormData[2].value;
    var dropOffDate = $carSelectFormData[3].value;
    var dropOffTime = $carSelectFormData[4].value;

    var pickUp = this.formatDate(pickUpDate) + ' ' + this.convertTime(24, pickUpTime) + ':00';
    var dropOff = this.formatDate(dropOffDate) + ' ' + this.convertTime(24, dropOffTime) + ':00';

    this.resetForms();

    // Get first available car
    var vehicle = window.app.vehicles.findWhere({
      make: make,
      model: model,
      status: 'available'
    });

    if (!vehicle) {
      alert('Sorry, there are no more of those cars available.');
      return;
    }

    // Try to find customer in collection
    var customer = window.app.customers.findWhere({
      firstname: fName,
      lastname: lName
    });
    
    if (!customer) {
      // Find customer if its not in the collection
      var customer = new Customer({
        firstname: fName,
        lastname: lName
      });

      customer.save(null, {
        success: function() {
          customer.set({cust_id: window.app.customers.length + 1});
          window.app.customers.add(customer);
        }
      });
    }

    // Create contract
    var contract = new Contract({
      cust_id: customer.id ? customer.id : window.app.customers.length + 1,
      vehicle_id: vehicle.id,
      meter_out: vehicle.attributes.odometer,
      cost_per_day: vehicle.attributes.cost_per_day,
      pick_up: pickUp,
      drop_off: dropOff
    });

    contract.save(null, {
      success: function() {
        console.log('success!');
        contract.set({contract_id: window.app.contracts.length + 1});
        window.app.contracts.add(contract);
        alert('Your reservation has been made.');
      }
    });

  },
  buildOptions: function() {
    var vehicleChoices = [];
    _(this.props.vehicles.models).forEach(function(vehicle, index) {
      vehicleChoices.push(
        <option key={index} value={vehicle.attributes.make + ' ' + vehicle.attributes.model}>{vehicle.attributes.make} {vehicle.attributes.model}</option>
      );
    });
    var options = _.uniqBy(vehicleChoices, 'props.value');
    return options;
  },
  render: function () {
    var options = this.buildOptions();
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
                  <h1>book a car</h1>
                  <div className="styled-select-car">
                    <select name="car-select" id="car-select">
                      {options}
                    </select>
                  </div><div className="datetime pick-up">
                      <div className="date pull-left">
                        <div className="input-group">
                          <span className="input-group-addon pixelfix"><span className="glyphicon glyphicon-calendar"></span> Pick-up</span>
                          <input type="text" name="pick-up-date" id="pick-up-date" className="form-control datepicker" placeholder="mm/dd/yyyy"/>
                        </div>
                      </div>
                      <div className="time pull-right">
                        <div className="styled-select-time">
                          <select name="pick-up-time" id="pick-up-time">
                            <option value="12:00 AM">12:00 AM</option>
                            <option value="12:30 AM">12:30 AM</option>
                            <option value="01:00 AM">01:00 AM</option>
                            <option value="01:30 AM">01:30 AM</option>
                            <option value="02:00 AM">02:00 AM</option>
                            <option value="02:30 AM">02:30 AM</option>
                            <option value="03:00 AM">03:00 AM</option>
                            <option value="03:30 AM">03:30 AM</option>
                            <option value="04:00 AM">04:00 AM</option>
                            <option value="04:30 AM">04:30 AM</option>
                            <option value="05:00 AM">05:00 AM</option>
                            <option value="05:30 AM">05:30 AM</option>
                            <option value="06:00 AM">06:00 AM</option>
                            <option value="06:30 AM">06:30 AM</option>
                            <option value="07:00 AM">07:00 AM</option>
                            <option value="07:30 AM">07:30 AM</option>
                            <option value="08:00 AM">08:00 AM</option>
                            <option value="08:30 AM">08:30 AM</option>
                            <option value="09:00 AM">09:00 AM</option>
                            <option value="09:30 AM">09:30 AM</option>
                            <option value="10:00 AM">10:00 AM</option>
                            <option value="10:30 AM">10:30 AM</option>
                            <option value="11:00 AM">11:00 AM</option>
                            <option value="11:30 AM">11:30 AM</option>
                            <option value="12:00 PM">12:00 PM</option>
                            <option value="12:30 PM">12:30 PM</option>
                            <option value="01:00 PM">01:00 PM</option>
                            <option value="01:30 PM">01:30 PM</option>
                            <option value="02:00 PM">02:00 PM</option>
                            <option value="02:30 PM">02:30 PM</option>
                            <option value="03:00 PM">03:00 PM</option>
                            <option value="03:30 PM">03:30 PM</option>
                            <option value="04:00 PM">04:00 PM</option>
                            <option value="04:30 PM">04:30 PM</option>
                            <option value="05:00 PM">05:00 PM</option>
                            <option value="05:30 PM">05:30 PM</option>
                            <option value="06:00 PM">06:00 PM</option>
                            <option value="06:30 PM">06:30 PM</option>
                            <option value="07:00 PM">07:00 PM</option>
                            <option value="07:30 PM">07:30 PM</option>
                            <option value="08:00 PM">08:00 PM</option>
                            <option value="08:30 PM">08:30 PM</option>
                            <option value="09:00 PM">09:00 PM</option>
                            <option value="09:30 PM">09:30 PM</option>
                            <option value="10:00 PM">10:00 PM</option>
                            <option value="10:30 PM">10:30 PM</option>
                            <option value="11:00 PM">11:00 PM</option>
                            <option value="11:30 PM">11:30 PM</option>
                          </select>
                        </div>
                      </div>
                      <div className="clearfix"></div>
                  </div>
                  <div className="datetime drop-off">
                      <div className="date pull-left">
                        <div className="input-group">
                          <span className="input-group-addon pixelfix"><span className="glyphicon glyphicon-calendar"></span> Drop-off</span>
                          <input type="text" name="drop-off-date" id="drop-off-date" className="form-control datepicker" placeholder="mm/dd/yyyy"/>
                        </div>
                      </div>
                      <div className="time pull-right">
                        <div className="styled-select-time">
                          <select name="drop-off-time" id="drop-off-time">
                            <option value="12:00 AM">12:00 AM</option>
                            <option value="12:30 AM">12:30 AM</option>
                            <option value="01:00 AM">01:00 AM</option>
                            <option value="01:30 AM">01:30 AM</option>
                            <option value="02:00 AM">02:00 AM</option>
                            <option value="02:30 AM">02:30 AM</option>
                            <option value="03:00 AM">03:00 AM</option>
                            <option value="03:30 AM">03:30 AM</option>
                            <option value="04:00 AM">04:00 AM</option>
                            <option value="04:30 AM">04:30 AM</option>
                            <option value="05:00 AM">05:00 AM</option>
                            <option value="05:30 AM">05:30 AM</option>
                            <option value="06:00 AM">06:00 AM</option>
                            <option value="06:30 AM">06:30 AM</option>
                            <option value="07:00 AM">07:00 AM</option>
                            <option value="07:30 AM">07:30 AM</option>
                            <option value="08:00 AM">08:00 AM</option>
                            <option value="08:30 AM">08:30 AM</option>
                            <option value="09:00 AM">09:00 AM</option>
                            <option value="09:30 AM">09:30 AM</option>
                            <option value="10:00 AM">10:00 AM</option>
                            <option value="10:30 AM">10:30 AM</option>
                            <option value="11:00 AM">11:00 AM</option>
                            <option value="11:30 AM">11:30 AM</option>
                            <option value="12:00 PM">12:00 PM</option>
                            <option value="12:30 PM">12:30 PM</option>
                            <option value="01:00 PM">01:00 PM</option>
                            <option value="01:30 PM">01:30 PM</option>
                            <option value="02:00 PM">02:00 PM</option>
                            <option value="02:30 PM">02:30 PM</option>
                            <option value="03:00 PM">03:00 PM</option>
                            <option value="03:30 PM">03:30 PM</option>
                            <option value="04:00 PM">04:00 PM</option>
                            <option value="04:30 PM">04:30 PM</option>
                            <option value="05:00 PM">05:00 PM</option>
                            <option value="05:30 PM">05:30 PM</option>
                            <option value="06:00 PM">06:00 PM</option>
                            <option value="06:30 PM">06:30 PM</option>
                            <option value="07:00 PM">07:00 PM</option>
                            <option value="07:30 PM">07:30 PM</option>
                            <option value="08:00 PM">08:00 PM</option>
                            <option value="08:30 PM">08:30 PM</option>
                            <option value="09:00 PM">09:00 PM</option>
                            <option value="09:30 PM">09:30 PM</option>
                            <option value="10:00 PM">10:00 PM</option>
                            <option value="10:30 PM">10:30 PM</option>
                            <option value="11:00 PM">11:00 PM</option>
                            <option value="11:30 PM">11:30 PM</option>
                          </select>
                        </div>
                      </div>
                      <div className="clearfix"></div>
                    </div>
                  <input type="button" className="submit" value="reserve car now" id="checkoutModalLabel" data-toggle="modal" data-target="#reserveModal" />
                </form>
              </div>
            </div>
      		</div>

          
          <div className="modal fade" id="reserveModal" role="dialog">
            <div className="modal-dialog">
            
              
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">Complete Reservation</h4>
                </div>
                <div className="modal-body">
                  <p>Almost done! We just need a bit more information from you.</p>
                  <form id="reserveForm">
                      <div className="form-group">
                          <label>First Name:</label>
                          <input type="text" className="form-control" name="firstName" placeholder="Enter your first name" />
                      </div>
                      <div className="form-group">
                          <label>Last Name:</label>
                          <input type="text" className="form-control" name="lastName" placeholder="Enter your last name" />
                      </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                  <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.completeReservation}>Reserve</button>
                </div>
              </div>
              
            </div>
          </div>


      	</div>
      </div>
    );
  }
});

module.exports = Reserve;