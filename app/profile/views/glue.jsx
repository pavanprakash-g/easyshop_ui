var React = require('react');
var AdminProfile = require('./AdminProfile.jsx');
var EditProfile = require('./EditProfile.jsx');

module.exports = function(components, props){
	if(props.page === 'adminProfile')
  		components.push(<AdminProfile details={props.profileModel.get('details')}/>);
	else if(props.page === 'editProfile')
  		components.push(<EditProfile details={props.profileModel.get('details')}/>);
  return components;
};
