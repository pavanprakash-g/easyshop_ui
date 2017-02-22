var App = require('../../context/events');
var React = require('react');
var AppDefaults = require('../../lib/app_defaults');
var Loader = require('react-loader');
var _ = require('underscore');
var classnames = require('classnames');

var Card = React.createClass({
  render: function(){
    return(
      <div className='borderedDiv'>
      <div className='field-container'>
        <p className='field-label'> Contact Number: </p>
        <input type='number' className='field' placeholder="Contact Number" value={this.props.card.get('billingPhoneNumber')}
           onChange={(e) => this.phoneNumberChanged(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Address1: </p>
        <textarea rows="4" cols='50' placeholder="Address 1" className='field' value={this.props.card.get('billingAddress1')}
           onChange={(e) =>
        this.address1Changed(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Address2: </p>
        <textarea rows="4" cols='50' placeholder="Address 2" className='field' value={this.props.card.get('billingAddress2')}
           onChange={(e) =>
        this.address2Changed(e.target.value)} />
      </div>
    </div>
    );
  }
});
module.exports = Card;