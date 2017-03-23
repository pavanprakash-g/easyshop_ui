var App = require('../../context/events');
var AppBar = require('../../lib/app_bar.jsx'); 
var React = require('react');

var Order = React.createClass({
	render: function () {
	return (
			<div>
				<p>OrderId: {this.props.order.get('orderId')} </p>
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
