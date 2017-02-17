var React = require('react');
var Login = require('./login.jsx');
var SignIn = require('./sign_in.jsx');
var CustRegister = require('./cust_register.jsx');
var ForgetPassword = require('./forget_password.jsx');
var ForgetPasswordSuccess = require('./forget_password_success.jsx')

module.exports = function(components, props){
	if(props.page === 'login')
  		components.push(<Login />);
  else if(props.page === 'forgetPasswordSuccess')
    components.push(<ForgetPasswordSuccess details={props.authInfo.get('login')}/>);
  else if(props.page === 'forgetPassword')
    components.push(<ForgetPassword details={props.authInfo.get('login')} />);
  else if(props.page === 'sign_in')
  	components.push(<SignIn details={props.authInfo.get('login')} />);
  else if(props.page === 'register')
  	components.push(<CustRegister details={props.authInfo.get('register')} />);
  return components;
};
