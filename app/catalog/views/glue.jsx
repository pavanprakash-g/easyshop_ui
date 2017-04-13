var React = require('react');
var Item = require('./Item.jsx');
var ItemDetails = require('./ItemDetails.jsx');

module.exports = function(components, props){
	if(props.page === 'item'){
		components.push(<Item details={props.catalogModel.get('currentItem')}/>);
	}else if(props.page === 'itemDetails'){
		components.push(<ItemDetails details={props.catalogModel.get('currentItem')} 
				routingOpts={props.catalogModel.get('routingOpts')} 
				cartCount={props.catalogModel.get('cartCount')} />);
	}
};