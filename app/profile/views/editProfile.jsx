var App = require('../../context/events');
var React = require('react');
var AppDefaults = require('../../lib/app_defaults');
var Loader = require('react-loader');
var _ = require('underscore');
var classnames = require('classnames');
var Address = require('./address.jsx');
var Card = require('./card_detail.jsx');
var Immutable = require('immutable');
var AppBar = require('../../lib/app_bar.jsx');

var EditProfile = React.createClass({
  getInitialState(){
    return {
      tabId: 1
    };
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
  register(){
    window.BUS.trigger(App.events.register.update);
  },
  updateId(value){
    this.setState({tabId: value});
  },
  componentDidMount: function(){
    window.BUS.trigger(App.events.register.custDetails);
  },
  isActiveTab(tab){
    return this.state.tabId === tab ? 'active-tab' : '';
  },
  addNewAddress(){
    window.BUS.trigger(App.events.register.address.addNewAddress);
  },
  addNewCard(){
    window.BUS.trigger(App.events.register.cards.addNewCard);
  },
  render: function () {
  const {tabId} = this.state;
  var tab1 = this.state.tabId === 1 ? {} : {display: 'none'} ;
  var tab2 = this.state.tabId === 2 ? {} : {display: 'none'} ;
  var tab3 = this.state.tabId === 3 ? {} : {display: 'none'} ;
  var AddressesList = this.props.addresses.map(addr => {
    return <Address address={addr} key={addr.get('addressId')}/>;
  });
  var cardsList = this.props.cards.map(card => {
    return <Card card={card} key={card.get('cardId')}/>; 
  });
  
  return (
  <div style={{height: '100%', overflowY: 'hidden'}}>
   <AppBar />
   <div>
    <div className='tab-container'>
      <div className={'tabSpan '+this.isActiveTab(1)} onClick={() => this.updateId(1)} >Personal Details </div>
      <div className={'tabSpan '+this.isActiveTab(2)} onClick={() => this.updateId(2)}> Addresses</div>
      <div className={'tabSpan '+this.isActiveTab(3)} onClick={() => this.updateId(3)} >Cards </div>
    </div>
    <div className='tab-data'>
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
      <div className='field-btn' onClick={this.register}> UPDATE </div>
     </div>

     <div style={tab2}>
      {AddressesList}
      <div onClick={this.addNewAddress} style={{marginBottom: '50px'}} className="subscribe-order">ADD NEW ADDRESS</div>
     </div>

     <div style={tab3}>
      {cardsList}
      <div onClick={this.addNewCard} style={{marginBottom: '50px'}} className="subscribe-order">ADD NEW CARD</div>
     </div>
    </div>
  </div>
</div>);
  }
});
module.exports = EditProfile;
