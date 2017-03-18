var App = require('../../context/events');
var React = require('react');
var AppDefaults = require('../../lib/app_defaults');
var Loader = require('react-loader');
var _ = require('underscore');
var classnames = require('classnames');
var Address = require('./address.jsx');
var Card = require('./card_detail.jsx');
var Immutable = require('immutable');

var EditProfile = React.createClass({
  getInitialState(){
    return {
      tabId: 1
    };
  },
  home(){
    window.router.setRoute('/login');
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
  logout(){
    window.BUS.trigger(App.events.login.logout);
  },
  register(){
    window.BUS.trigger(App.events.register.update);
  },
  updateId(value){
    this.setState({tabId: value});
  },
  componentDidMount: function(){
    window.BUS.trigger(App.events.register.custDetails);
  },
  render: function () {
  const {tabId} = this.state;
  var tab1 = this.state.tabId === 1 ? {} : {display: 'none'} ;
  var tab2 = this.state.tabId === 2 ? {} : {display: 'none'} ;
  var tab3 = this.state.tabId === 3 ? {} : {display: 'none'} ;
  var AddressesList;
  if(this.props.details && this.props.details.get('addresses') && this.props.details.get('addresses').size !==0){
    AddressesList = this.props.details.get('addresses').map(u => {
      return <Address address={u}/>;
    });
  }else {
     AddressesList = <Address address={Immutable.fromJS([])}/>
  }
  var cardsList;
  if(this.props.details && this.props.details.get('cards')){
    cardsList = this.props.cards.map(u => {
      return <Card card={u}/>;
    });
  }else {
    cardsList =  <Card card={Immutable.fromJS([])}/>
  }
  return (
  <div>
    <div className='appBar'> 
      <span className='homeButton'> <p onClick={this.home}>Home</p> </span>
      <span className='appBarButton'> <p onClick={this.openProfile}>Edit Profile</p> </span>
      <span className='cartButton'> <p onClick={this.openProfile}>Cart({this.props.cartCount})</p> </span>
      <span className='logout-button'> <p onClick={this.logout}>Logout</p> </span>
    </div>
    <div>
      <span className='tabSpan'> <p onClick={() => this.updateId(1)}>Personal Details</p> </span>
      <span className='tabSpan'> <p onClick={() => this.updateId(2)}>Addresses</p> </span>
      <span className='tabSpan'> <p onClick={() => this.updateId(3)}>Cards</p> </span>
    </div>
    <div style={tab1}>
      <div className='field-container'>
        <p className='field-label'> First Name: </p>
        <input type='text' className='field' placeholder="First Name" value={this.props.details.get('custFirstName')}
          onChange={(e) => this.firstNameChanged(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Last Name: </p>
        <input type='text' className='field' placeholder="Last Name" value={this.props.details.get('custLastName')}
           onChange={(e) => this.lastNameChanged(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Mail Id: </p>
        <input type='mail' className='field' placeholder="Mail Id" value={this.props.details.get('custEmailid')}
           onChange={(e) => this.emailIdChanged(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Contact Number: </p>
        <input className='field' placeholder="Contact Number" value={this.props.details.get('custPhoneNumber')}
           onChange={(e) => this.phoneNumberChanged(e.target.value)} />
      </div>
      <div className='field-container'>
        <div className='field-label' onClick={this.register}> Update</div>
      </div>
    </div>

    <div style={tab2}>
      {AddressesList}
    </div>

    <div style={tab3}>
      {cardsList}
    </div>
</div>);
  }
});
module.exports = EditProfile;
