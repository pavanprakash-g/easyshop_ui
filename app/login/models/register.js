var App = require('./../../context/events');
var _ = require('underscore');
var $ = require('jquery');
var Immutable  = require('immutable');
var md5 = require('md5');

var Registration = class {
  constructor(eventBus,localStorage) {
    this.eventBus = eventBus;
    this.loading = false;
    this.firstName = null;
    this.lastName = null;
    this.contactNum = null;
    this.mailId = null;
    this.address1 = null;
    this.address2 = null;
    this.city = null;
    this.state_name = null;
    this.country = null;
    this.zipCode = null;
    this.password = "";
    this.securityQuesAns = "";
    this.localStorage = localStorage;
  }

  firstNameChanged(value){
    this.firstName = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  lastNameChanged(value){
    this.lastName = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  emailIdChanged(value){
    this.mailId = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  phoneNumberChanged(value){
    this.contactNum = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  address1Changed(value){
    this.address1 = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  address2Changed(value){
    this.address2 = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  cityChanged(value){
    this.city = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  stateChanged(value){
    this.state_name = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  countryChanged(value){
    this.country = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  zipCodeChanged(value){
    this.zipCode = value;
    this.eventBus.trigger(App.events.models.changed);
  }  

  securityQuesAnsChanged(value){
    this.securityQuesAns = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  passwordChanged(value){
    this.password = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  formPayload() {
    return ({
      custFirstName: this.firstName,
      custLastName: this.lastName,
      custEmailid: this.mailId,
      custPhoneNumber: this.contactNum,
      address1: this.address1,
      address2: this.address2,
      city: this.city,
      state: this.state_name,
      country: this.country,
      zipcode: this.zipCode,
      custPassword: md5(this.password),
      securityQuesAns: md5(this.securityQuesAns),
      securityQuesId: 2,
      activeStatus: true
    });
  }
  perform(){
    var that = this;
    this.loading = true;
    var query = this.formPayload();
    this.eventBus.trigger(App.events.models.changed);
    $.ajax({
        type: 'POST',
        url: window.baseURL+'login/createUser',
        data: JSON.stringify(query),
        contentType: 'application/json',
        dataType: "json"
      }).done((response)=>{
        if(response.status === 'success'){
          this.localStorage.setItem('authtoken', response.uuid);
          window.BUS.trigger(App.events.ui.alert, [response.message || 'Registered Successfully', 'Info', () => {
            window.BUS.trigger(App.events.models.changed);
            window.router.setRoute('/login');
          }]);
        }
      }).fail((jqXHR, textStatus, errorThrown)=>{
          window.BUS.trigger(App.events.ui.alert,['problem in Registration', 'Info']);
      }).always(()=>{
        this.loading = false;
        this.eventBus.trigger(App.events.models.changed);
      });
  }
  getState(){
    return Immutable.fromJS({
      firstName: this.firstName,
      lastName: this.lastName,
      mailId: this.mailId,
      contactNum: this.contactNum,
      address1: this.address1,
      address2: this.address2,
      city: this.city,
      state_name: this.state_name,
      country: this.country,
      zipCode: this.zipCode,
      password: this.password,
      securityQuesAns: this.securityQuesAns,
      loading: this.loading
    });
  }

};

module.exports = Registration;
