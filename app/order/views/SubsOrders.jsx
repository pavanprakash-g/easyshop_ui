var App = require('../../context/events');
var AppBar = require('../../lib/app_bar.jsx'); 
var _ = require('underscore');
var React = require('react');

var Item = React.createClass({
  render: function(){
    return (
      <div className="subr-ordr-item">
        <span>{this.props.item.get('subsOrderItemName')}</span><br/>
        <span>Item Quantity: {this.props.item.get('subsOrderItemQuantity')}</span><br/>
        <span>Price: {this.props.item.get('subsOrderItemPrice')}</span><br/>
      </div>
    );
  }
});


var Order = React.createClass({
  getInitialState(){
    return {
      subscriptionType: null,
      subsOrderAddressId: null,
      subsOrderBillingAddrId: null,
      items: []
    }
  },
  durationUpdate(evt){
    this.setState(_.defaults({subscriptionType: evt.target.value},this.state));
  },
  shipAddrUpdate(){
    window.router.setRoute('/addresses/ship');
  },
  billAddrUpdate(){
    window.router.setRoute('/addresses/bill');
  },
  showItems(){
    window.router.setRoute('subscription/home');
  },
  subscribe(){
    window.BUS.trigger(App.events.order.subscriptionOrders.subscribe, [this.state]);
  },
  render: function(){
    var optionState = this.props.order.get('subscriptionType');
    var itemsList;
    var currentShipAddress =  _.find(this.props.addresses.toJS(), (d) => {return d.addressId === this.props.order.get('subsOrderAddressId')});
    var currentBillAddress =  _.find(this.props.addresses.toJS(), (d) => {return d.addressId === this.props.order.get('subsOrderBillingAddrId')});
    if(this.props.order.get('items')){
      itemsList = this.props.order.get('items').map(i => {
        return <Item key={i.get('subsOrderDtlId')} item={i} />;
      });
    }
    var shippingAddress;
    var billingAddress;
    if(currentShipAddress){
      shippingAddress = (<div><b style={{'color':'gray'}}>Shipping Address:</b><br/> <div className='addr'> <span className='fa fa-pencil edit-addr'/> <span style={{'color':'gray'}}>Address Line 1: {currentShipAddress.address1} </span><br/>
          <span style={{'color':'gray'}}>Address Line 2: {currentShipAddress.address2} </span><br/>
          <span style={{'color':'gray'}}>Phone Number: {currentShipAddress.phoneNumber} </span><br/>
          <span style={{'color':'gray'}}>City: {currentShipAddress.city} </span> <br/>
          <span style={{'color':'gray'}}>State: {currentShipAddress.state}</span> <br/>
          <span style={{'color':'gray'}}>Country: {currentShipAddress.Country}</span> <br/>
          <span style={{'color':'gray'}}>ZipCode: {currentShipAddress.zipcode} </span><br/> </div> </div>);
    }
    if(currentBillAddress){
      billingAddress = (<div><b style={{'color':'gray'}}>Billing Address:</b><br/>  <div className='addr'> <span className='fa fa-pencil edit-addr'/> <span style={{'color':'gray'}}>Address Line 1: {currentBillAddress.address1} </span><br/>
          <span style={{'color':'gray'}}>Address Line 2: {currentBillAddress.address2} </span><br/>
          <span style={{'color':'gray'}}>Phone Number: {currentBillAddress.phoneNumber} </span><br/>
          <span style={{'color':'gray'}}>City: {currentBillAddress.city} </span> <br/>
          <span style={{'color':'gray'}}>State: {currentBillAddress.state}</span> <br/>
          <span style={{'color':'gray'}}>Country: {currentBillAddress.Country}</span> <br/>
          <span style={{'color':'gray'}}>ZipCode: {currentBillAddress.zipcode} </span><br/> </div> </div>);
    }
    var addShipAddressVisible = currentShipAddress ? 'hidden' : '';
    var addBillAddressVisible = currentBillAddress ? 'hidden' : '';
   return (
      <div className="subr-ordr-container">
        <span className='subr-title'>Subscription Order # {this.props.order.get('subsOrderId')}</span>
          <span className='subr-duration'>Frequency: 
              <select value={optionState} onChange={this.durationUpdate}>
                <option value="1">Every 1 Month</option>
                <option value="2">Every 2 Months</option>
                <option value="3">Every 3 Months</option>
                <option value="6">Every 6 Months</option>
                <option value="12">Every 12 Months</option>
              </select>
          </span>
        <div className="subr-addr" >
          {shippingAddress}
          <div onClick={this.shipAddrUpdate} className={"addr-btn "+addShipAddressVisible}>Add Shipping Address</div>
        </div>
        <div className="subr-addr">
          {billingAddress}
          <div onClick={this.confirmOrder} className={"addr-btn "+addBillAddressVisible}>Add Billing Address</div>
        </div>
        <div>
          {itemsList}
        </div>
       	<div onClick={this.showItems} className="blackregister-btn addItemButton">Add Item</div>
        <div onClick={this.subscribe} className="blackregister-btn addItemButton">Subscribe Now!</div>
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
