var App = require('../../context/events');
var AppBar = require('../../lib/app_bar.jsx'); 
var _ = require('underscore');
var React = require('react');

var Item = React.createClass({
  render: function(){
    return (
      <div className="borderedDiv1">
        <span>Item Id #: {this.props.item.get('subsOrderItemId')}</span><br/>
        <span>Item Quantity: {this.props.item.get('subsOrderItemQuantity')}</span><br/>
        <span>Current Price: {this.props.item.get('subsOrderItemPrice')}</span><br/>
      </div>
    );
  }
});


var Order = React.createClass({
  render: function(){
    var optionState = this.props.order.get('subscriptionType');
    var currentAddress =  _.filter(this.props.addresses.toJS(), (d) => {return d.addressId === this.props.order.get('subsOrderAddressId')});
    var alreadyExists = currentAddress === 'undefined' ? {'display':'none'} :{}
    var isNew = currentAddress === 'undefined' ? {} : {'display':'none'}
    if(this.props.order.get('items') !== undefined){
      var itemsList = this.props.order.get('items').map(i => {
        return <Item key={i.get('subsOrderDtlId')} item={i} />;
      });
    }
   return (
      <div className="borderedDiv1">
        <div className="borderedDiv1">
          <span>Subscription Order #: {this.props.order.get('subsOrderId')}</span>
          <span style={{'margin-left':'100px'}}>Frequency: 
              <select value={optionState}>
                <option value="1">Every 1 Month</option>
                <option value="2">Every 2 Months</option>
                <option value="3">Every 3 Months</option>
                <option value="6">Every 6 Months</option>
                <option value="12">Every 12 Months</option>
              </select>
          </span>
        </div>
        <div className="borderedDivNoInline" style={alreadyExists}>
        <b style={{'color':'gray'}}>Shipping Address:</b><br/>
          <span style={{'color':'gray'}}>Address Line 1: {currentAddress[0].address1} </span><br/>
          <span style={{'color':'gray'}}>Address Line 2: {currentAddress[0].address2} </span><br/>
          <span style={{'color':'gray'}}>Phone Number: {currentAddress[0].phoneNumber} </span><br/>
          <span style={{'color':'gray'}}>City: {currentAddress[0].city} </span> <br/>
          <span style={{'color':'gray'}}>State: {currentAddress[0].state}</span> <br/>
          <span style={{'color':'gray'}}>Country: {currentAddress[0].Country}</span> <br/>
          <span style={{'color':'gray'}}>ZipCode {currentAddress[0].zipcode} </span><br/>
          <div onClick={this.confirmOrder} className="blackregister-btn addItemButton">Update Address</div>
        </div>
        <div className="borderedDivNoInline" style={isNew}>
          <div onClick={this.confirmOrder} className="blackregister-btn addItemButton">Add Address</div>
        </div>
        <div>
          {itemsList}
        </div>
       	<div onClick={this.confirmOrder} className="blackregister-btn addItemButton">Add Item</div>
      </div>
    );
  }
});

var SubsOrders = React.createClass({
  addSubrOrder(){
  	window.BUS.trigger(App.events.order.subscriptionOrders.addSubrOrder);
	},
  render: function() {
  	var orders = this.props.orders.map(o => {
  		return <Order key={o.get('subsOrderHdrId')} order={o} addresses={this.props.addresses}/>;
  	});
    var height = window.innerHeight - 62 + 'px'
    return (
      <div className='subscription-orders'>
      	{orders}
      	<div onClick={this.addSubrOrder} className="subscribe-order">Subscribe another Order!</div>
      </div>);
  }
});

module.exports = SubsOrders;
