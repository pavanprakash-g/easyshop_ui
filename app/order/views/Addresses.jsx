var App = require('../../context/events');
var AppBar = require('../../lib/app_bar.jsx'); 
var React = require('react');
var _ = require('underscore');
var Immutable = require('immutable');

var Address = React.createClass({
	saveShippingAddress(){
    window.BUS.trigger(App.events.order.saveShippingAddress, [this.props.address.get('addressId')]);
  },
  saveBillingAddress(){
    window.BUS.trigger(App.events.order.saveBillingAddress, [this.props.address.get('addressId')]);
  },
	render:function(){
    var button1 = this.props.address.get('addressId') == this.props.selectedShippingAddress? 'Shipping Address Selected':'As Shipping Address';
    var button2 = this.props.address.get('addressId') == this.props.selectedBillingAddress? 'Billing Address Selected':'As Billing Address';
    return (
      <div className="addressesDiv">
        <p>Phone No: {this.props.address.get('phoneNumber')}</p>
        <p>Address Line 1: {this.props.address.get('address1')}</p>
        <p>Address Line 2: {this.props.address.get('address2')}</p>
        <p>City: {this.props.address.get('city')}</p>
        <p>State: {this.props.address.get('state')}</p>
        <p>Zipcode: {this.props.address.get('zipcode')}</p>
        <input type="button" value={button1} onClick={this.saveShippingAddress} />&nbsp;
        <input type="button" value={button2} onClick={this.saveBillingAddress} />
      </div>
    );
	}
});

var Addresses = React.createClass({

  componentDidMount: function(){
    window.BUS.trigger(App.events.order.custDetails);
  },
  render:function(){
  	var selectedShippingAddress = this.props.selectedShippingAddress;
    var selectedBillingAddress = this.props.selectedBillingAddress;
  	var AddressList = this.props.addresses.map(u => {
      return <Address address={u} selectedShippingAddress={selectedShippingAddress} selectedBillingAddress={selectedBillingAddress}/>;
    });
  	return(
  		<div>
  			<AppBar/>
  			{AddressList}
  		</div>
  	);
  }
});
module.exports = Addresses;
