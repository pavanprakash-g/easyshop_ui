var React = require('react');
var Item = require('./Item.jsx');

module.exports = function(components, props){
	if(props.page === 'item'){
		components.push(<Item details={props.catalogModel.get('currentItem')}/>);
	}
};