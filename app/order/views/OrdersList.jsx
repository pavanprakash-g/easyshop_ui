var App = require('../../context/events');
var AppBar = require('../../lib/app_bar.jsx'); 
var React = require('react');

var Item = React.createClass({
	changeStatus(status){
		window.BUS.trigger(App.events.order.changeItemStatus, [this.props.item.get('orderId'), this.props.item.get('orderItemId'), status]);
	},
	approveReturn(status){
		window.BUS.trigger(App.events.order.approveReturn, [this.props.item.get('orderId'), this.props.item.get('orderItemId'), 'Return Approved']);
	},
	render: function () {
		var optionsState = this.props.item.get('orderItemStatus');
		var statusStyle;
		var buttonStyle;
		var textStyle;
		if(optionsState === 'Return Initiated'){
			statusStyle = {display: 'none'};
			textStyle = {display: 'none'};
			buttonStyle = {'marginLeft':"10%", display:'inline'};
		}else if(optionsState === 'Return Approved'){
			statusStyle = {display: 'none'};
			buttonStyle = {display: 'none'};
			textStyle = {'marginLeft':"10%", display:'inline'};
		}else{
			statusStyle = {'marginLeft':"10%", display:'inline'};
			buttonStyle = {display: 'none'};
			textStyle = {display: 'none'};
		}
		return (
				<div className="borderedDivNoInline">
					<p style={{'display':'inline'}}><b>Item Name:</b> {this.props.item.get('orderItemName')} </p>
					<div style={statusStyle}>
						<select onChange={(e) => this.changeStatus(e.target.value)} value={optionsState}>
							<option value="Pick">Pick</option>
							<option value="Pack">Pack</option>
							<option value="Ship">Ship</option>
						</select>
					</div>
					<div style={buttonStyle}>
						<input type="button" value="Approve Return" onClick={this.approveReturn}/>
					</div>
					<div style={textStyle}>
						<b>Status:</b> {optionsState}
					</div>
					<p><b>Item Quantity:</b> {this.props.item.get('orderItemQuantity')} </p>
				</div>
			);
		}
});

var Order = React.createClass({
	changeStatus(status){
		window.BUS.trigger(App.events.order.changeStatus, [this.props.order.get('orderId'), status]);
	},
	render: function () {
		var optionsState = this.props.order.get('orderStatus');
		var itemsList = this.props.order.get('items').map(u =>{
			return <Item item={u} />
		});
	return (
			<div className="borderedDivNoInline">
				<p style={{'display':'inline'}}><b>OrderId:</b> {this.props.order.get('orderId')} </p>
				<select style={{'marginLeft':"10%"}} onChange={(e) => this.changeStatus(e.target.value)} value={optionsState}>
					<option value="Pending">Pending</option>
					<option value="Ship">Ship</option>
					<option value="Deliver">Deliver</option>
				</select>
				<p><b>Total Amount:</b> {this.props.order.get('orderTotal')}</p>
				{itemsList}
			</div>
		);
	}
});

var OrdersList = React.createClass({

  componentDidMount: function(){
    window.BUS.trigger(App.events.order.ordersListAdmin);
  },
  render: function () {
  	var ordersList = this.props.ordersList.map(u => {
      return <Order order={u} />;
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
module.exports = OrdersList;
