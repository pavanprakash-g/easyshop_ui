var App = require('../../context/events');
var React = require('react');
var AppDefaults = require('../../lib/app_defaults');
var Loader = require('react-loader');
var _ = require('underscore');
var classnames = require('classnames');
import Checkbox from 'material-ui/Checkbox';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

var CustRegister = React.createClass({
  getInitialState(){
    return {
      finished: false,
      stepIndex: 0
    };
  },
register(){
    window.BUS.trigger(App.events.register.perform);
  },

firstNameChanged(value){
  	window.BUS.trigger(App.events.register.firstNameChanged, [value]);
  },
lastNameChanged(value){
  	window.BUS.trigger(App.events.register.lastNameChanged, [value]);
  },

emailIdChanged(value){
   	window.BUS.trigger(App.events.register.emailIdChanged, [value]);
    },

passwordChanged(value){
   	window.BUS.trigger(App.events.register.passwordChanged, [value]);
    },

phoneNumberChanged(value){
   	window.BUS.trigger(App.events.register.phoneNumberChanged, [value]);
    },

address1Changed(value){
   	window.BUS.trigger(App.events.register.address1Changed, [value]);
    },

address2Changed(value){
   	window.BUS.trigger(App.events.register.address2Changed, [value]);
    },

cityChanged(value){
   	window.BUS.trigger(App.events.register.cityChanged, [value]);
    },

stateChanged(value){
   	window.BUS.trigger(App.events.register.stateChanged, [value]);
    },

zipCodeChanged(value){
   	window.BUS.trigger(App.events.register.zipCodeChanged, [value]);
    },
countryChanged(value){
    window.BUS.trigger(App.events.register.countryChanged, [value]);
    },
securityQuesAnsChanged(value){
   	window.BUS.trigger(App.events.register.securityQuesAnsChanged, [value]);
    },
confirmPasswordChanged(value){
  if(this.props.details.get('password') !== value)
      window.BUS.trigger(App.events.ui.alert, ['Password is not matching',  'Error']);
  },
addressCheckboxChanged(value){
  if(this.props.details.get('password') !== value)
      window.BUS.trigger(App.events.ui.alert, ['Password is not matching',  'Error']);
  },
getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Help us with few of your details...';
      case 1:
        return 'A bit we really care about your Info!';
      case 2:
        return 'Done with your profile :) Start journey with us to enjoy unlimited offers.';
      default:
        return ;
    }
  },
  handleNext(){
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 1,
    });
  },

  handlePrev(){
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  },
  render: function () {
    const {finished, stepIndex} = this.state;
    var loaderStyle = this.props.details.get('loading') ? {} : {display: 'none'} ;
    var personalInfoStyle = this.state.stepIndex === 0 ? {} : {display: 'none'};
    var securityInfoStyle = this.state.stepIndex === 1 ? {} : {display: 'none'};
    var registerStyle = this.state.stepIndex === 2 ? {padding: '40px'} : {display: 'none'};
    var nextHidden = this.state.stepIndex === 2 ? {display: 'none'} : {} ;
    var prevHidden = this.state.stepIndex === 0 ? {display: 'none'} : {marginRight: '30px'} ;
    return (
    <div className='login-page' style={{height: 'initial'}}>
      <div style={loaderStyle}>
        <Loader options={AppDefaults.loaderOpts()}/>
      </div>
      <img src="./images/f3.png" />
      <p className='tag'>Join with us!! </p>
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel style={{color: 'white'}}>Personal Details</StepLabel>
          </Step>
          <Step>
            <StepLabel style={{color: 'white'}}>Security Info</StepLabel>
          </Step>
          <Step>
            <StepLabel style={{color: 'white'}}>Complete the Registration</StepLabel>
          </Step>
        </Stepper>
      </div>
      <div className='login-fields' style={{width: '70%'}}>
        <p style={{color: '#E0E0E0', fontStyle:'italic', paddingBottom: '20px'}}>{this.getStepContent(stepIndex)}</p>
         <div style={personalInfoStyle} >
          <div className='field-container'>
           <p className='field-label'> First Name: </p>
           <input type='text' className='field' placeholder="First Name" value={this.props.details.get('custFirstName')}
                  onChange={(e) => this.firstNameChanged(e.target.value)} />
          </div>
          <div className='field-container'>
           <p className='field-label'> Last Name: </p>
           <input type='text' className='field' placeholder="Last Name" value={this.props.details.get('lastName')}
                  onChange={(e) => this.lastNameChanged(e.target.value)} />
          </div>
          <div className='field-container'>
           <p className='field-label'> Mail Id: </p>
           <input type='mail' className='field' placeholder="Mail Id" value={this.props.details.get('mailId')}
                        onChange={(e) => this.emailIdChanged(e.target.value)} />
          </div>
          <div className='field-container'>
           <p className='field-label'> Contact Number: </p>
           <input type='number' className='field' placeholder="Contact Number" value={this.props.details.get('contactNum')}
                        onChange={(e) => this.phoneNumberChanged(e.target.value)} />
           </div>
           <div className='field-container'>
            <p className='field-label'> Address1: </p>
            <textarea rows="4" cols='50' placeholder="Address 1" className='field' value={this.props.details.get('address1')}
                        onChange={(e) => this.address1Changed(e.target.value)} />
           </div>
           <div className='field-container'>
            <p className='field-label'> Address2: </p>
            <textarea rows="4" cols='50' placeholder="Address 2" className='field' value={this.props.details.get('address2')}
                        onChange={(e) => this.address2Changed(e.target.value)} />
           </div>
           <div className='field-container'>
            <p className='field-label'> City: </p>
            <input className='field' placeholder="City" value={this.props.details.get('city')}
                        onChange={(e) => this.cityChanged(e.target.value)} />
           </div>
           <div className='field-container'>
            <p className='field-label'> State: </p>
            <input className='field' placeholder="State" value={this.props.details.get('state_name')}
                        onChange={(e) => this.stateChanged(e.target.value)} />
           </div>
           <div className='field-container'>
            <p className='field-label'> Country: </p>
            <input className='field' placeholder="Country" value={this.props.details.get('country')}
                        onChange={(e) => this.countryChanged(e.target.value)} />
           </div>
           <div className='field-container'>
            <p className='field-label'> Zip Code: </p>
            <input className='field' placeholder="Zip Code" value={this.props.details.get('zipCode')}
                        onChange={(e) => this.zipCodeChanged(e.target.value)} />
           </div>
          </div>

          <div style={securityInfoStyle}>
           <div className='field-container'>
            <p className='field-label'> New Password: </p>
            <input type='Password' placeholder="Password" className='field' value={this.props.details.get('password')}
                        onChange={(e) => this.passwordChanged(e.target.value)} />
           </div>
           <div className='field-container'>
            <p className='field-label'> Confirm Password: </p>
            <input type='Password' placeholder="Confirm Password" className='field'
                        onBlur={(e) => this.confirmPasswordChanged(e.target.value)} />
           </div>
           <div className='field-container'>
            <p className='field-label'> Mother&apos;s Maiden Name: </p>
            <input type='text' placeholder="Security Answer" className='field' value={this.props.details.get('securityQuesAns')}
                        onChange={(e) => this.securityQuesAnsChanged(e.target.value)} />
          </div>
      </div>
      <div style={registerStyle}>
            <div className='register-btn' onClick={this.register}> Register Now!</div>
      </div>
      <div style={{marginTop: 12, padding: '20px 0px 420px 0px'}}>
        <span onClick={this.handlePrev} style={prevHidden} className='step-button'>{"<< Prev"} </span>
        <span onClick={this.handleNext} style={nextHidden} className='step-button'> {"Next >>"} </span>
      </div>
    </div>
   </div>);
  }
});
module.exports = CustRegister;
