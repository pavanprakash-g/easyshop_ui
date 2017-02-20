var React = require('react');
var AdminProfile = require('./AdminProfile.jsx');
var Home = require('./home.jsx');
var EditProfile = require('./editProfile.jsx');

module.exports = function(components, props){
	if(props.page === 'adminProfile')
  		components.push(<AdminProfile details={props.profileModel.get('details')}/>);
	else if(props.page === 'home')
  		components.push(<Home details={props.profileModel.get('details')}/>);
  	else if(props.page === 'editProfile')
  		components.push(<EditProfile details={props.authInfo.get('register').get('details')} addresses={props.authInfo.get('register').get('addresses')} cards={props.authInfo.get('register').get('cards')}/>);
  return components;
};
