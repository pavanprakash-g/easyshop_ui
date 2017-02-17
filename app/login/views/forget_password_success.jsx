var App = require('../../context/events');
var React = require('react');
var AppDefaults = require('../../lib/app_defaults');
var Loader = require('react-loader');
var _ = require('underscore');
var classnames = require('classnames');
var TextField = require('material-ui').TextField;
var AppBar = require('material-ui').AppBar;
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';


var ForgetPasswordSuccess = React.createClass({
  newPasswordChanged(value){
    window.BUS.trigger(App.events.forgetPassword.newPasswordChanged, [value]);
  },
  confirmPasswordChanged(value){
    window.BUS.trigger(App.events.forgetPassword.confirmPasswordChanged, [value]);
  },
  forgetCheck(){
    window.BUS.trigger(App.events.forgetPassword.perform);
  },
  render: function () {
  var loaderStyle = this.props.details.get('loading') ? {} : {display: 'none'} ;
  return (  
  <div className='login-page'>
      <div style={loaderStyle}>
        <Loader options={AppDefaults.loaderOpts()}/>
      </div>
      <img style={{paddingTop: '35px'}} src="./images/password.png" />
      <p className='tag'>Forgot Password? Don&apos;t worry!! Follow the steps </p>
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={1}>
          <Step>
            <StepLabel style={{color: 'white'}}>Security Verification</StepLabel>
          </Step>
          <Step>
            <StepLabel style={{color: 'white'}}>Change Password</StepLabel>
          </Step>
        </Stepper>
      </div>
      <div className='login-fields'>
      <p style={{color: '#E0E0E0', fontStyle:'italic', paddingBottom: '20px'}}>Change your Password!!</p>
       <TextField fullWidth={true} floatingLabelText="Give New Password" onChange={(e) => this.newPasswordChanged(e.target.value)} />
       <TextField fullWidth={true} floatingLabelText="Confirm Password"  onChange={(e) => this.confirmPasswordChanged(e.target.value)} />
      	<div className='login-btn' style={{fontSize: '1.3rem', padding: '10px',width: '200px'}} 
          onClick={this.forgetCheck}> Update Password </div>
    </div>
  </div>);
  }
});
module.exports = ForgetPasswordSuccess;
