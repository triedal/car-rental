var React = require('react');

var Contact = React.createClass({
  onSubmit: function (e) {
    e.preventDefault();
    
  },
  render: function() {
    return (
      <div id="contact" className="container-fluid max-width">
        <div className="row">
          <div className="col-12">
            <p className="contact-info">You have any questions or need additional information?</p>
              <form onSubmit={this.onSubmit} id="contact-form" name="contact-form">
                <input type="hidden" name="action" value="send_contact_form" />

                <div className="alert hidden" id="contact-form-msg"></div>

                <div className="form-group">
                  <input type="text" className="form-control first-name text-field" name="first-name" placeholder="First Name:" />
                  <input type="text" className="form-control last-name text-field" name="last-name" placeholder="Last Name:" />
                  <div className="clearfix"></div>
                </div>

                <div className="form-group">
                  <input type="tel" className="form-control telephone text-field" name="telephone" placeholder="Telephone:" />
                </div>

                <div className="form-group">
                  <input type="email" className="form-control email text-field" name="email" placeholder="Email:" />
                </div>

                <div className="form-group">
                  <textarea className="form-control message" name="message" placeholder="Message:"></textarea>
                </div>

                <input type="submit" className="btn submit-message" name="submit-message" value="Submit Message" />
              </form>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Contact;