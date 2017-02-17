var App = require('../../context/events');
var React = require('react');
var AppDefaults = require('../../lib/app_defaults');
var Loader = require('react-loader');
var _ = require('underscore');
var classnames = require('classnames');
var TextField = require('material-ui').TextField;
var AppBar = require('material-ui').AppBar;

var SignIn = React.createClass({
  login(){
    window.BUS.trigger(App.events.login.perform);
  },
  usernameChanged(value){
  	window.BUS.trigger(App.events.login.updateUsername, [value]);
  },
  passwordChanged(value){
    window.BUS.trigger(App.events.login.updatePassword, [value]);
  },
  forgetPassword(){
      window.BUS.trigger(App.events.forgetPassword);
  },
  render: function () {
  var loaderStyle = this.props.details.get('loading') ? {} : {display: 'none'} ;
  return (
  <div className='login-page'>
  	<div style={loaderStyle}>
      <Loader options={AppDefaults.loaderOpts()}/>
    </div>
    <img src="./images/onlineshop.png" style={{paddingTop: '100px'}} />
    <p className='tag'>Everything you want is a CLICK away! </p>
    <div className='login-fields'>
       <TextField fullWidth={true} floatingLabelText="Username"
       				onChange={(e) => this.usernameChanged(e.target.value)} />
       <TextField fullWidth={true} floatingLabelText="Password" type='password'
       				onChange={(e) => this.passwordChanged(e.target.value)} />
    	<div className='login-btn' onClick={this.login} style={{marginBottom: '30px'}}> LOG IN </div>
    	<a href='#forgetPassword' className='pswd-link'> Forgot Password? </a>
    </div>
  </div>);
  }
});
module.exports = SignIn;
