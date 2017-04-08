var React = require('react');
var UsersList = require('./UsersList.jsx');
var AdminProfile = require('./AdminProfile.jsx');
var Home = require('./home.jsx');
var EditProfile = require('./editProfile.jsx');

module.exports = function(components, props){
	if(props.page === 'usersList')
  		components.push(<UsersList details={props.profileModel.get('details')}/>);
	else if(props.page === 'home')
  		components.push(<Home details={props.profileModel.get('details')} items={props.catalogModel.get('items')} 
  			cartCount={props.catalogModel.get('cartCount')} action={props.options.action}/>);
  	else if(props.page === 'adminProfile')
  		components.push(<AdminProfile items={props.catalogModel.get('items')}/>);
  	else if(props.page === 'editProfile')
  		components.push(<EditProfile details={props.authInfo.get('register').get('details')} 
  			addresses={props.authInfo.get('register').get('addresses')} 
  			cards={props.authInfo.get('register').get('cards')}
  			cartCount={props.catalogModel.get('cartCount')}/>);
  return components;
};
