var React = require('react');
var Orders = require('./Orders.jsx');
var OrdersList = require('./OrdersList.jsx');
var CustOrders = require('./CustOrders.jsx');

module.exports = function(components, props){
	if(props.page === 'order'){
		components.push(<Orders cartCount={props.catalogModel.get('cartCount')} items={props.cartModel.get('items')}
				addresses={props.orderModel.get('addresses')} details={props.orderModel}
  			cards={props.orderModel.get('cards')} 
  			finalAmount={props.cartModel.get('finalAmount')}
				itemCount={props.cartModel.get('itemCount')}
				tax={props.orderModel.get('taxPercentage')} />);
	}else if(props.page === 'ordersList'){
		components.push(<OrdersList ordersList={props.orderModel.get('ordersList')}/>);
	}else if(props.page === 'custOrders'){
		components.push(<CustOrders ordersList={props.orderModel.get('custOrdersList')} address={props.orderModel.get('addressDetails')}
											subscriptions={props.orderModel.get('subsOrdersList')}
											addresses={props.orderModel.get('addresses')} />);
	}
};