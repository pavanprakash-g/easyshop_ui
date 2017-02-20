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
    this.billingAddress = [];
    this.shipmentAddress = [];
    //billingaddress
    this.billingAddress1 = null;
    this.billingAddress2 = null;
    this.billingCity = null;
    this.billingState = null;
    this.billingCountry = null;
    this.billingZipcode = null;
    this.details = [];
    this.addresses = [];
    this.cards = [];

    this.localStorage = localStorage;
  }

  firstNameChanged(value){
    this.firstName = value;
    this.details.custFirstName = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  lastNameChanged(value){
    this.lastName = value;
    this.details.custLastName = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  emailIdChanged(value){
    this.mailId = value;
    this.details.custLastName = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  phoneNumberChanged(value){
    this.contactNum = value;
    this.details.custPhoneNumber = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  address1Changed(value){
    this.address1 = value;
    this.details.address1 = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  address2Changed(value){
    this.address2 = value;
    this.details.address2 = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  cityChanged(value){
    this.city = value;
    this.details.city = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  stateChanged(value){
    this.state_name = value;
    this.details.state = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  countryChanged(value){
    this.country = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  zipCodeChanged(value){
    this.zipCode = value;
    this.details.zipcode = value;
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

  addressCheckboxChanged(value){
    if(value == true){
      this.billingAddress = this.billingaddress();
      this.shipmentAddress = this.shipmentaddress();
    }
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
      address: this.billingAddress,
      activeStatus: true
    });
  }
  billingaddress() {
    return ({
      //billingaddress
      billingAddress1: this.address1,
      billingAddress2: this.address2,
      billingCity: this,city,
      billingState: this.state_name,
      billingCountry: this.country,
      billingZipcode: this.zipcode
    })
  }
  shippmentaddress() {
    return ({
      //shipmentAddress
      shipmentAddress1: this.address1,
      shipmentAddress2: this.address2,
      shipmentCity: this.city,
      shipmentState: this.state_name,
      shipmentCountry: this.country,
      shipmentZipcode: this.zipcode
    })
  }

  perform(){
    var that = this;
    this.loading = true;
    this.billingaddress = this.billingaddress();
    this.shipmentaddress = this.shipmentaddress();
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
  custDetails(){
    var custId = localStorage.getItem("custId");
    $.ajax({
        method: 'GET',
        url: window.baseURL+'profile/custDetails?id='+custId,
        contentType: 'application/json',
        dataType: "json"
      }).done((response)=>{
        if(response != null){
          this.details = response;
          this.addresses = response.addresses;
          this.cards = response.cards;
        }
      }).fail((jqXHR, textStatus, errorThrown)=>{
          window.BUS.trigger(App.events.ui.alert,['problem in Login', 'Info']);
      }).always(()=>{
        this.loading = false;
        this.eventBus.trigger(App.events.models.changed);
      });
  }

  update(){
    var custId = localStorage.getItem("custId");
    var query = this.details;
    $.ajax({
        type: 'PUT',
        url: window.baseURL+'profile/custDetails?id='+custId,
        data: JSON.stringify(query),
        contentType: 'application/json',
        dataType: "json"
      }).done((response)=>{
        if(response.status === 'success'){
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
      loading: this.loading,
      details: this.details,
      addresses: this.addresses,
      cards: this.cards
    });
  }

};

module.exports = Registration;
