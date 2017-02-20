var App = require('../../context/events');
var React = require('react');
var AppDefaults = require('../../lib/app_defaults');
var Loader = require('react-loader');
var _ = require('underscore');
var classnames = require('classnames');

var Card = React.createClass({
  render: function(){
    return(
      <div className='borderedDiv'>
      <div className='field-container'>
        <p className='field-label'> Contact Number: </p>
        <input type='number' className='field' placeholder="Contact Number" value={this.props.card.get('billingPhoneNumber')}
           onChange={(e) => this.phoneNumberChanged(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Address1: </p>
        <textarea rows="4" cols='50' placeholder="Address 1" className='field' value={this.props.card.get('billingAddress1')}
           onChange={(e) =>
        this.address1Changed(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Address2: </p>
        <textarea rows="4" cols='50' placeholder="Address 2" className='field' value={this.props.card.get('billingAddress2')}
           onChange={(e) =>
        this.address2Changed(e.target.value)} />
      </div>
    </div>
    );
  }
});

var Addresses = React.createClass({
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
  render: function (){
    return (
    <div className='borderedDiv'>
      <div className='field-container'>
        <p className='field-label'> Contact Number: </p>
        <input type='number' className='field' placeholder="Contact Number" value={this.props.address.get('phoneNumber')}
           onChange={(e) => this.phoneNumberChanged(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Address1: </p>
        <textarea rows="4" cols='50' placeholder="Address Line 1" className='field' value={this.props.address.get('address1')}
           onChange={(e) =>
        this.address1Changed(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Address2: </p>
        <textarea rows="4" cols='50' placeholder="Address Line 2" className='field' value={this.props.address.get('address2')}
           onChange={(e) =>
        this.address2Changed(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> City: </p>
        <input className='field' placeholder="City" value={this.props.address.get('city')}
           onChange={(e) => this.cityChanged(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> State: </p>
        <input className='field' placeholder="State" value={this.props.address.get('state')}
           onChange={(e) => this.stateChanged(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Country: </p>
        <input className='field' placeholder="Country" value={this.props.address.get('country')}
           onChange={(e) => this.countryChanged(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Zip Code: </p>
        <input className='field' placeholder="Zip Code" value={this.props.address.get('zipcode')}
           onChange={(e) => this.zipCodeChanged(e.target.value)} />
      </div>
    </div>
    );
  }
});

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
  var AddressesList = this.props.addresses.map(u => {
      return <Addresses address={u}/>;
  });

  var cardsList = this.props.cards.map(u => {
      return <Card card={u}/>;
  });
  return (
  <div>
    <div className='appBar'> 
      <span className='appBarButton'> <p onClick={this.openProfile}>Edit Profile</p> </span>
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
        <input type='number' className='field' placeholder="Contact Number" value={this.props.details.get('custPhoneNumber')}
           onChange={(e) => this.phoneNumberChanged(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Address1: </p>
        <textarea rows="4" cols='50' placeholder="Address 1" className='field' value={this.props.details.get('address1')}
           onChange={(e) =>
        this.address1Changed(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Address2: </p>
        <textarea rows="4" cols='50' placeholder="Address 2" className='field' value={this.props.details.get('address2')}
           onChange={(e) =>
        this.address2Changed(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> City: </p>
        <input className='field' placeholder="City" value={this.props.details.get('city')}
           onChange={(e) => this.cityChanged(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> State: </p>
        <input className='field' placeholder="State" value={this.props.details.get('state')}
           onChange={(e) => this.stateChanged(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Country: </p>
        <input className='field' placeholder="Country" value={this.props.details.get('country')}
           onChange={(e) => this.countryChanged(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Zip Code: </p>
        <input className='field' placeholder="Zip Code" value={this.props.details.get('zipcode')}
           onChange={(e) => this.zipCodeChanged(e.target.value)} />
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
