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

var ForgetPassword = React.createClass({
  getInitialState(){
    return {
      stepIndex: 0
    };
  },
  forgetPassword(){
    window.BUS.trigger(App.events.login.forgetPassword);
  },
  updateUsername(value){
     	window.BUS.trigger(App.events.login.updateUsername, [value]);
   },
  updateSecurityQuesAns(value){
     	window.BUS.trigger(App.events.login.updateSecurityQuesAns, [value]);
   },
  render: function () {
  const {stepIndex} = this.state;
  var loaderStyle = this.props.details.get('loading') ? {} : {display: 'none'} ;
  var isSecurityQuestion = this.state.stepIndex ===0 ? {} : {display: 'none'} ;
  var isPasswordChange = this.state.stepIndex ===1 ? {} : {display: 'none'} ;
  return (
  <div className='login-page'>
    <div style={loaderStyle}>
      <Loader options={AppDefaults.loaderOpts()}/>
    </div>
    <img style={{paddingTop: '35px'}} src="./images/password.png" />
    <p className='tag'>Forgot Password? Don&apos;t worry!! Follow the steps </p>
    <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
      <Stepper activeStep={0}>
        <Step>
          <StepLabel style={{color: 'white'}}>Security Verification</StepLabel>
        </Step>
        <Step>
          <StepLabel style={{color: 'white'}}>Change Password</StepLabel>
        </Step>
      </Stepper>
    </div>
    <div className='login-fields' style={isSecurityQuestion}>
    <p style={{color: '#E0E0E0', fontStyle:'italic', paddingBottom: '20px'}}>Answer the security Question :)</p>
     <TextField fullWidth={true} floatingLabelText="Email Id"
     				onChange={(e) => this.updateUsername(e.target.value)} />
      <TextField fullWidth={true} floatingLabelText="What is ur Mother's Maiden Name??"
     				onChange={(e) => this.updateSecurityQuesAns(e.target.value)} />
  	<div className='login-btn' style={{fontSize: '1.3rem', padding: '10px',width: '200px'}} 
          onClick={this.forgetPassword}> Forget Password </div>
    </div>
  </div>);
  }
});
module.exports = ForgetPassword;
