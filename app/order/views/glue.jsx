var React = require('react');
var Orders = require('./Orders.jsx');

module.exports = function(components, props){
	if(props.page === 'order'){
		components.push(<Orders cartCount={props.catalogModel.get('cartCount')} items={props.cartModel.get('items')}
			addresses={props.orderModel.get('addresses')} details={props.orderModel}
  			cards={props.orderModel.get('cards')} 
  			finalAmount={props.cartModel.get('finalAmount')}
			itemCount={props.cartModel.get('itemCount')}/>);
	}
};