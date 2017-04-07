var App = require('../../context/events');
var AppBar = require('../../lib/app_bar.jsx'); 
var React = require('react');
var SubsOrders = require('./SubsOrders.jsx');
var Item = React.createClass({
	changeStatus(status){
		window.BUS.trigger(App.events.order.changeItemStatus, [this.props.item.get('orderId'), this.props.item.get('orderItemId'), status]);
	},
	requestReturn(){
		window.BUS.trigger(App.events.order.changeItemStatus, [this.props.item.get('orderId'), this.props.item.get('orderItemId'), 'Return Initiated']);
	},
	render: function () {
		var optionsState = this.props.item.get('orderItemStatus');
		var buttonStyle = {display: 'none'};
		if(optionsState === 'Return Approved'){
			buttonStyle = {display: 'none'};
		}else if(optionsState === 'Ship'){
			buttonStyle = {};
		}
	return (
			<div className="borderedDivNoInline">
				<p style={{'display':'inline','color':'gray'}} ><b>Item Name:</b> {this.props.item.get('orderItemName')} </p>
				<p className="statusP"><b>Item Status:</b> {this.props.item.get('orderItemStatus')} </p>
				<p style={{'color':'gray'}}><b>Item Quantity:</b> {this.props.item.get('orderItemQuantity')} </p>
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
			<div className="orderDiv">
				<p style={{'display':'inline','color': 'gray'}}><b>OrderId:</b> {this.props.order.get('orderId')} </p>
				<p className="statusP"><b>Order Status:</b> {this.props.order.get('orderStatus')}</p>
				<p className="statusP"><b>Expected Delivery: </b> {this.props.order.get('expectedDeliveryDate')}</p>
				<p style={{'color':'gray'}}><b>Total Order Amount:</b> {this.props.order.get('orderTotal')}</p>
				<div className="borderedDivNoInline">
				<b style={{'color':'gray'}}>Shipping Address:</b><br/>
				<span style={{'color':'gray'}}>Address Line 1: {this.props.address.get('address1')} </span><br/>
			  <span style={{'color':'gray'}}>Address Line 2: {this.props.address.get('address2')} </span><br/>
				<span style={{'color':'gray'}}>Phone Number: {this.props.address.get('phoneNumber')} </span><br/>
				<span style={{'color':'gray'}}>City: {this.props.address.get('city')} </span> <br/>
				<span style={{'color':'gray'}}>State: {this.props.address.get('state')}</span> <br/>
				<span style={{'color':'gray'}}>Country: {this.props.address.get('country')}</span> <br/>
				<span style={{'color':'gray'}}>ZipCode {this.props.address.get('zipcode')} </span><br/>
				</div>
				{itemsList}
			</div>
		);
	}
});

var CustOrders = React.createClass({
	getInitialState(){
    return {
      tabId: 1
    };
  },
	getAddressDetail(id){
		window.BUS.trigger(App.events.order.addressById, [id]);
	},
  componentDidMount: function(){
    window.BUS.trigger(App.events.order.custOrdersList);
  },
  isActiveTab(tab){
    return this.state.tabId === tab ? 'active-tab' : '';
  },
  updateId(value){
    this.setState({tabId: value});
  },
  render: function () {
  	const {tabId} = this.state;
  	var tab1 = this.state.tabId === 1 ? {} : {display: 'none'} ;
  	var tab2 = this.state.tabId === 2 ? {} : {display: 'none'} ;
  	//var isHavingSubs = this.props.subscriptions.size > 0 ? true : false;
  	/*if(isHavingSubs){
  		//var subsCreate = return <SubsOrders order={}/>
  	}*/
  	var subscriptions = this.props.subscriptions.map(u => {
      return <SubsOrders order={u}/>;
    });
  	var ordersList = this.props.ordersList.map(u => {
  		if(this.props.address.size === 0){
  			this.getAddressDetail(u.get('orderAddressId'));
  		}
      return <Order order={u} address={this.props.address}/>;
    });
    return (
      <div>
        <AppBar />
        <div className='tab-container'>
      		<div className={'tabSpan '+this.isActiveTab(1)} onClick={() => this.updateId(1)} >Orders </div>
      		<div className={'tabSpan '+this.isActiveTab(2)} onClick={() => this.updateId(2)}> Subscriptions</div>
      	</div>
        <div style={tab1}>
        	{ordersList}
        </div>
        <div style={tab2}>
        	{subscriptions}
        </div>
      </div>
    );
  }
});
module.exports = CustOrders;
