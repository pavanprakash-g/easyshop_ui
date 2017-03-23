var App = require('../../context/events');
var AppBar = require('../../lib/app_bar.jsx'); 
var React = require('react');

var Item = React.createClass({
	changeStatus(status){
		window.BUS.trigger(App.events.order.changeItemStatus, [this.props.item.get('orderId'), this.props.item.get('orderItemId'), status]);
	},
	requestReturn(){
		window.BUS.trigger(App.events.order.changeItemStatus, [this.props.item.get('orderId'), this.props.item.get('orderItemId'), 'Return Initiated']);
	},
	render: function () {
		var optionsState = this.props.item.get('orderItemStatus');
		var buttonStyle;
		if(optionsState === 'Return Approved'){
			buttonStyle = {display: 'none'};
		}
	return (
			<div className="borderedDivNoInline">
				<p style={{'display':'inline'}}><b>Item Name:</b> {this.props.item.get('orderItemName')} </p>
				<p className="statusP"><b>Item Status:</b> {this.props.item.get('orderItemStatus')} </p>
				<p><b>Item Quantity:</b> {this.props.item.get('orderItemQuantity')} </p>
				<div style={buttonStyle}>
					<input type="button" value="Request Return" onClick={this.requestReturn}/>
				</div>
			</div>
		);
	}
});

var Order = React.createClass({
	changeStatus(status){
		window.BUS.trigger(App.events.order.changeStatus, [this.props.order.get('orderId'), status]);
	},
	render: function () {
		var itemsList = this.props.order.get('items').map(u =>{
			return <Item item={u} />
		});
	return (
			<div className="borderedDivNoInline">
				<p style={{'display':'inline'}}><b>OrderId:</b> {this.props.order.get('orderId')} </p>
				<p className="statusP"><b>Order Status:</b> {this.props.order.get('orderStatus')}</p>
				<p><b>Total Amount:</b> {this.props.order.get('orderTotal')}</p>
				<div className="borderedDivNoInline">
				<b>Shipping Address</b>
				<p> Address Line 1: {this.props.address.get('address1')} </p>
				<p> Address Line 2: {this.props.address.get('address2')} </p>
				<p> Phone Number: {this.props.address.get('phoneNumber')} </p>
				<p> City: {this.props.address.get('city')} </p>
				<p> State: {this.props.address.get('state')} </p>
				<p> Country: {this.props.address.get('country')} </p>
				<p> ZipCode {this.props.address.get('zipcode')} </p>
				</div>
				{itemsList}
			</div>
		);
	}
});

var CustOrders = React.createClass({
	getAddressDetail(id){
		window.BUS.trigger(App.events.order.addressById, [id]);
	},
  componentDidMount: function(){
    window.BUS.trigger(App.events.order.custOrdersList);
  },
  render: function () {
  	var ordersList = this.props.ordersList.map(u => {
  		if(this.props.address.size === 0){
  			this.getAddressDetail(u.get('orderAddressId'));
  		}
      return <Order order={u} address={this.props.address}/>;
    });
    return (
      <div>
        <AppBar />
        <div>
        	{ordersList}
        </div>
      </div>);
  }
});
module.exports = CustOrders;
