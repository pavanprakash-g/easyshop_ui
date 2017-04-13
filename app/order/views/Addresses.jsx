var App = require('../../context/events');
var AppBar = require('../../lib/app_bar.jsx'); 
var React = require('react');
var _ = require('underscore');
var Immutable = require('immutable');

var Address = React.createClass({
	saveShippingAddress(){
    window.BUS.trigger(App.events.subscription.autoSave, [this.props.routingOpts.orderId, 'subsOrderAddressId', this.props.address.get('addressId')]);
  },
  saveBillingAddress(){
    window.BUS.trigger(App.events.subscription.autoSave, [this.props.routingOpts.orderId, 'subsOrderBillingAddrId', this.props.address.get('addressId')]);
  },
	render:function(){
    var selectedShippingAddress = _.find(this.props.subscriptions.toJS(), s => {
      return s.subsOrderHdrId === this.props.routingOpts.orderId && s.subsOrderAddressId === this.props.address.get('addressId');
    });
    var selectedBillingAddress = _.find(this.props.subscriptions.toJS(), s => {
      return s.subsOrderHdrId === this.props.routingOpts.orderId && s.subsOrderBillingAddrId === this.props.address.get('addressId');
    });
    var button1 = selectedShippingAddress ? 'Selected Shipping Address':'As Shipping Address';
    var button2 = selectedBillingAddress? 'Selected Billing Address':'As Billing Address';
    var shipBtnStyle = selectedShippingAddress ? {backgroundColor: 'lightblue'} : {};
    var billBtnStyle = selectedBillingAddress ? {backgroundColor: 'lightblue'} : {};
    return (
      <div className="addressesDiv">
        <p>Phone No: {this.props.address.get('phoneNumber')}</p>
        <p>Address Line 1: {this.props.address.get('address1')}</p>
        <p>Address Line 2: {this.props.address.get('address2')}</p>
        <p>City: {this.props.address.get('city')}</p>
        <p>State: {this.props.address.get('state')}</p>
        <p>Zipcode: {this.props.address.get('zipcode')}</p>
        <input type="button" value={button1} onClick={this.saveShippingAddress} style={shipBtnStyle} />&nbsp;&nbsp;
        <input type="button" value={button2} onClick={this.saveBillingAddress} style={billBtnStyle} />
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
      return <Address address={u} subscriptions={this.props.subscriptionOrders}
                      routingOpts={this.props.routingOpts} />;
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
