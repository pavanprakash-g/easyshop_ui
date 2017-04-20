var App = require('../../context/events');
var React = require('react');
var AppDefaults = require('../../lib/app_defaults');
var Loader = require('react-loader');
var _ = require('underscore');
var classnames = require('classnames');

var Address = React.createClass({
  updateAddress(){
    if(this.props.address.get('is_synced') === false)
      window.BUS.trigger(App.events.register.address.submitAddress, [this.props.address.get("addressId")]);
    else
      window.BUS.trigger(App.events.register.address.updateAddress, [this.props.address.get("addressId")]);
  },
  deleteAddress(){
    window.BUS.trigger(App.events.register.address.deleteAddress, [this.props.address.get("addressId")]);
  },
  render: function (){
    var btnLabel = this.props.address.get('is_synced') === false ? 'SAVE NEW ADDRESS' : 'UPDATE ADDRESS';
    return (
    <div className='address-container'>
     <span className='fa fa-trash addr-del' onClick={this.deleteAddress}/>
     <div style={{padding: '20px 10px'}}>
      <div className='field-container'>
        <p className='field-label'> Contact Number: </p>
        <input type='number' className='field' placeholder="Contact Number" value={this.props.address.get('phoneNumber')}
           onChange={(e) => window.BUS.trigger(App.events.register.address.autoSave, [this.props.address.get('addressId'), 'phoneNumber', e.target.value])} />
      </div>
      <div className='field-container addr-ele'>
        <p className='field-label'> Address1: </p>
        <textarea rows="4" cols='50' placeholder="Address Line 1" className='field' value={this.props.address.get('address1')}
           onChange={(e) =>
        window.BUS.trigger(App.events.register.address.autoSave, [this.props.address.get('addressId'), 'address1', e.target.value])} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Address2: </p>
        <textarea rows="4" cols='50' placeholder="Address Line 2" className='field' value={this.props.address.get('address2')}
           onChange={(e) =>
        window.BUS.trigger(App.events.register.address.autoSave, [this.props.address.get('addressId'), 'address2', e.target.value])} />
      </div>
      <div className='field-container'>
        <p className='field-label'> City: </p>
        <input className='field' placeholder="City" value={this.props.address.get('city')}
           onChange={(e) =>  window.BUS.trigger(App.events.register.address.autoSave, [this.props.address.get('addressId'), 'city', e.target.value])} />
      </div>
      <div className='field-container'>
        <p className='field-label'> State: </p>
        <input className='field' placeholder="State" value={this.props.address.get('state')}
           onChange={(e) =>  window.BUS.trigger(App.events.register.address.autoSave, [this.props.address.get('addressId'), 'state', e.target.value])} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Country: </p>
        <input className='field' placeholder="Country" value={this.props.address.get('country')}
           onChange={(e) =>  window.BUS.trigger(App.events.register.address.autoSave, [this.props.address.get('addressId'), 'country', e.target.value])} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Zip Code: </p>
        <input className='field' placeholder="Zip Code" value={this.props.address.get('zipcode')}
           onChange={(e) =>  window.BUS.trigger(App.events.register.address.autoSave, [this.props.address.get('addressId'), 'zipcode', e.target.value])} />
      </div>
      <div className='field-btn update-btn' onClick={this.updateAddress}> {btnLabel}</div>
     </div>
    </div>
    );
  }
});
module.exports = Address;