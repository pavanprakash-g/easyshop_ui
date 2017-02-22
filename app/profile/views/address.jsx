var App = require('../../context/events');
var React = require('react');
var AppDefaults = require('../../lib/app_defaults');
var Loader = require('react-loader');
var _ = require('underscore');
var classnames = require('classnames');

var Address = React.createClass({
  phoneNumberChanged(value){
    window.BUS.trigger(App.events.register.phoneNumberChanged, [this.props.address.get('addressId'), value]);
  },

  address1Changed(value){
    window.BUS.trigger(App.events.register.address1Changed, [this.props.address.get("addressId"), value]);
  },

  address2Changed(value){
    window.BUS.trigger(App.events.register.address2Changed, [this.props.address.get("addressId"), value]);
  },

  cityChanged(value){
    window.BUS.trigger(App.events.register.cityChanged, [this.props.address.get("addressId"), value]);
  },

  stateChanged(value){
    window.BUS.trigger(App.events.register.stateChanged, [this.props.address.get("addressId"), value]);
  },

  zipCodeChanged(value){
    window.BUS.trigger(App.events.register.zipCodeChanged, [this.props.address.get("addressId"), value]);
  },
  countryChanged(value){
    window.BUS.trigger(App.events.register.countryChanged, [this.props.address.get("addressId"), value]);
  },
  updateAddress(){
    window.BUS.trigger(App.events.register.updateAddress, [this.props.address.get("addressId")]);
  },
  render: function (){
    return (
    <div className='borderedDiv'>
      <div className='field-container'>
        <p className='field-label'> Contact Number: </p>
        <input type='number' className='field' placeholder="Contact Number" value={this.props.address.get('phoneNumber')}
           onChange={(e) => this.phoneNumberChanged(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Address1: </p>
        <textarea rows="4" cols='50' placeholder="Address Line 1" className='field' value={this.props.address.get('address1')}
           onChange={(e) =>
        this.address1Changed(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Address2: </p>
        <textarea rows="4" cols='50' placeholder="Address Line 2" className='field' value={this.props.address.get('address2')}
           onChange={(e) =>
        this.address2Changed(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> City: </p>
        <input className='field' placeholder="City" value={this.props.address.get('city')}
           onChange={(e) => this.cityChanged(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> State: </p>
        <input className='field' placeholder="State" value={this.props.address.get('state')}
           onChange={(e) => this.stateChanged(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Country: </p>
        <input className='field' placeholder="Country" value={this.props.address.get('country')}
           onChange={(e) => this.countryChanged(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Zip Code: </p>
        <input className='field' placeholder="Zip Code" value={this.props.address.get('zipcode')}
           onChange={(e) => this.zipCodeChanged(e.target.value)} />
      </div>
       <div className='field-container'>
       <br/>
       <br/>
        <div className='field-label' onClick={this.updateAddress}> Update</div>
      </div>
    </div>
    );
  }
});
module.exports = Address;