var App = require('../../context/events');
var AppBar = require('../../lib/app_bar.jsx'); 
var _ = require('underscore');
var React = require('react');
var AppDefaults = require('../../lib/app_defaults');
var Loader = require('react-loader');

var Item = React.createClass({
  itemCountChanged(itemCount){
    var itemId=this.props.item.get('subsOrderItemId');
    var orderId=this.props.item.get('subsOrderId');
    window.BUS.trigger(App.events.subscription.itemCountChanged, [orderId, itemId,itemCount]);
  },
  render: function(){
    return (
     <div className="subr-ordr-item">
        <span style={{fontSize: '0.95rem', textDecoration: 'underline', paddingRight: '10px'}} 
            onClick={this.viewItem} >{this.props.item.get('subsOrderItemName')}</span><br/>
        <span>Quantity: <input className="itemCountField" type='text' value={this.props.item.get('subsOrderItemQuantity')} 
              onChange={(e) => this.itemCountChanged(e.target.value)} /></span><br/>
        <span>Price: $ {this.props.item.get('subsOrderItemPrice')}</span><br/>
        <span className='fa fa-close subr-item-del' 
            onClick={() => this.props.removeItem(this.props.item.get('subsOrderItemId'))}/>
      </div>
    );
  }
});


var Order = React.createClass({
  durationUpdate(evt){
    window.BUS.trigger(App.events.subscription.autoSave, [this.props.order.get('subsOrderHdrId'), 'subscriptionType', evt.target.value]);
  },
  showAddress(){
    window.router.setRoute('/addresses/'+this.props.order.get('subsOrderHdrId'));
  },
  showItems(){
    window.router.setRoute('/home/'+this.props.order.get('subsOrderHdrId'));
  },
  subscribe(){
    window.BUS.trigger(App.events.subscription.subscribe, [this.props.order.get('subsOrderHdrId')]);
  },
  deleteOrder(){
    window.BUS.trigger(App.events.subscription.deleteOrder, [this.props.order.get('subsOrderId')]);
  },
  removeItem(itemId){
    window.BUS.trigger(App.events.subscription.removeItem, [this.props.order.get('subsOrderId'), itemId]);
  },
  render: function(){
    var itemsList;
    var currentShipAddress =  _.find(this.props.addresses.toJS(), (d) => {return d.addressId === this.props.order.get('subsOrderAddressId')});
    var currentBillAddress =  _.find(this.props.addresses.toJS(), (d) => {return d.addressId === this.props.order.get('subsOrderBillingAddrId')});
    if(this.props.order.get('items')){
      itemsList = this.props.order.get('items').map(i => {
        return <Item key={i.get('subsOrderDtlId')} item={i} removeItem={this.removeItem}/>;
      });
    }
    var shippingAddress;
    var billingAddress;
    if(currentShipAddress){
      shippingAddress = (<div><b style={{'color':'gray'}}>Shipping Address:</b><br/> 
          <div className='addr'> <span className='fa fa-pencil edit-addr' onClick={this.showAddress}/> <span style={{'color':'gray'}}>Address Line 1: {currentShipAddress.address1} </span><br/>
          <span style={{'color':'gray'}}>Address Line 2: {currentShipAddress.address2} </span><br/>
          <span style={{'color':'gray'}}>Phone Number: {currentShipAddress.phoneNumber} </span><br/>
          <span style={{'color':'gray'}}>City: {currentShipAddress.city} </span> <br/>
          <span style={{'color':'gray'}}>State: {currentShipAddress.state}</span> <br/>
          <span style={{'color':'gray'}}>Country: {currentShipAddress.Country}</span> <br/>
          <span style={{'color':'gray'}}>ZipCode: {currentShipAddress.zipcode} </span><br/> </div> </div>);
    }
    if(currentBillAddress){
      billingAddress = (<div><b style={{'color':'gray'}}>Billing Address:</b><br/>  
          <div className='addr'> <span className='fa fa-pencil edit-addr' onClick={this.showAddress}/> <span style={{'color':'gray'}}>Address Line 1: {currentBillAddress.address1} </span><br/>
          <span style={{'color':'gray'}}>Address Line 2: {currentBillAddress.address2} </span><br/>
          <span style={{'color':'gray'}}>Phone Number: {currentBillAddress.phoneNumber} </span><br/>
          <span style={{'color':'gray'}}>City: {currentBillAddress.city} </span> <br/>
          <span style={{'color':'gray'}}>State: {currentBillAddress.state}</span> <br/>
          <span style={{'color':'gray'}}>Country: {currentBillAddress.Country}</span> <br/>
          <span style={{'color':'gray'}}>ZipCode: {currentBillAddress.zipcode} </span><br/> </div> </div>);
    }
    var addShipAddressVisible = currentShipAddress ? 'hidden' : '';
    var addBillAddressVisible = currentBillAddress ? 'hidden' : '';
    var shipAddrStyle = currentShipAddress ? {} : {display: 'block'};
    var billAddrStyle = currentBillAddress ? {} : {display: 'block'};
    var itemsEmptyMsgVisible = this.props.order.get('items').size === 0 ? '' : 'hidden';
    var label = this.props.order.get('is_synced') === false ? 'Subscribe Now!' : 'Update Subscription';
    var date;
    if(this.props.order.get('nextDueDate') != null){
      date = this.props.order.get('nextDueDate').split(" ")[0];
    }
   return (
      <div className="subr-ordr-container">
        <span className='fa fa-trash subr-delete' onClick={this.deleteOrder}/>
        <span onClick={this.showItems} className="subr-add-item">ADD ITEM</span>
        <span className='subr-title'>Subscription Order # {(this.props.index)+1}</span>
          <span className='subr-duration'>Frequency: &nbsp; &nbsp;
              <select value={this.props.order.get('subscriptionType')} onChange={this.durationUpdate}>
                <option value="1">Every 1 Month</option>
                <option value="2">Every 2 Months</option>
                <option value="3">Every 3 Months</option>
                <option value="6">Every 6 Months</option>
                <option value="12">Every 12 Months</option>
              </select>
          </span>
        <div>  
          <div className="subr-addr" style={shipAddrStyle}>
            {shippingAddress}
            <div onClick={this.showAddress} className={"addr-btn "+addShipAddressVisible}>SHIPPING ADDRESS</div>
          </div>
          <div className="subr-addr" style={billAddrStyle}>
            {billingAddress}
            <div onClick={this.showAddress} className={"addr-btn "+addBillAddressVisible}>BILLING ADDRESS</div>
          </div>
        </div> 
        <div style={{width: '75%', marginBottom: '15px'}}>
          <b style={{'color':'gray'}}>Items:</b><br/> 
          {itemsList}
          <div className={'empty-msg '+itemsEmptyMsgVisible}> Not added yet! </div>
        </div>
        <div style={{width: '75%', marginBottom: '15px'}}>
          <hr/>
            <span style={{'color':'gray'}}>Total Tax: $ {this.props.order.get('taxAmount')}</span><br/>
            <span style={{'color':'gray'}}>Total Amount: $ {this.props.order.get('subsOrderTotal')}</span><br/>
            <span style={{'color':'gray'}}>Next Order Date: {date}</span>

          <div className={'empty-msg '+itemsEmptyMsgVisible}> Not added yet! </div>
        </div>
        <div onClick={this.subscribe} className="subscribe-btn">{label}</div>
      </div>
    );
  }
});

var SubsOrders = React.createClass({
  addSubrOrder(){
  	window.BUS.trigger(App.events.subscription.addSubrOrder);
	},
  componentDidMount(){
    if(this.props.subscriptions.get('subsOrdersList').size === 0)
      window.BUS.trigger(App.events.subscription.getOrders);
  },
  render: function() {
  	var orders = this.props.subscriptions.get('subsOrdersList').map( (o, index) => {
  		return <Order key={o.get('subsOrderHdrId')} order={o} addresses={this.props.addresses} index={index}/>;
  	});
    var height = window.innerHeight - 62 + 'px';
    var loaderVisible = this.props.subscriptions.get('loading') ? '' : 'hidden' ;
    return (
      <div className='subscription-orders'>
        <div className={loaderVisible}>
          <Loader options={AppDefaults.loaderOpts()}/>
        </div>
      	{orders}
      	<div onClick={this.addSubrOrder} className="subscribe-order">ADD NEW SUBSCRIPTION ORDER</div>
      </div>);
  }
});

module.exports = SubsOrders;
