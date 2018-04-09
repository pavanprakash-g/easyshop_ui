var React = require('react');
var Test = require('./test.jsx');

module.exports = function(components, props){
	if(props.page === 'test'){
		components.push(<Test details={props.testModel}/>);
	}
};