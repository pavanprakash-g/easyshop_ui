var React = require('react');
var Cart = require('./cart.jsx');

module.exports = function(components, props){
	if(props.page === 'cart'){
		components.push(<Cart cartCount={props.cartModel.get('cartCount')} items={props.cartModel.get('items')} finalAmount={props.cartModel.get('finalAmount')}
			itemCount={props.cartModel.get('itemCount')} />);
	}
};