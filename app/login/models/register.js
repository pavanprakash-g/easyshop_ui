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
    this.cardNum = null;
    this.cardExpMon = null;
    this.cardExpYr = null;
    this.cardCvv = null;

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
    this.eventBus.trigger(App.events.models.changed);
  }

  phoneNumberChanged(id, value){
    if(value === undefined)
      this.contactNum = id;
    else{
      var index =  _.findIndex(this.details.addresses, (d) => d.addressId === id);
      this.details.addresses[index].phoneNumber = value;
    }
    this.eventBus.trigger(App.events.models.changed);
  }

  address1Changed(id, value){
    if(value === undefined)
      this.address1 = id;
    else{
      var index =  _.findIndex(this.details.addresses, (d) => d.addressId === id);
      this.details.addresses[index].address1 = value;
    }
    this.eventBus.trigger(App.events.models.changed);
  }

  address2Changed(id, value){
    if(value === undefined)
      this.address2 = id;
    else{
      var index =  _.findIndex(this.details.addresses, (d) => d.addressId === id);
      this.details.addresses[index].address2 = value;
    }
    this.eventBus.trigger(App.events.models.changed);
  }

  cityChanged(id, value){
    if(value === undefined)
      this.city = id;
    else{
      var index =  _.findIndex(this.details.addresses, (d) => d.addressId === id);
      this.details.addresses[index].city = value;
    }
    this.eventBus.trigger(App.events.models.changed);
  }

  stateChanged(id, value){
    if(value === undefined)
      this.state_name = id;
    else{
      var index =  _.findIndex(this.details.addresses, (d) => d.addressId === id);
      this.details.addresses[index].state = value;
    }
      this.eventBus.trigger(App.events.models.changed);
  }

  countryChanged(id, value){
    if(value === undefined)
      this.country = id;
    else{
      var index =  _.findIndex(this.details.addresses, (d) => d.addressId === id);
      this.details.addresses[index].country = value;
    }
      this.eventBus.trigger(App.events.models.changed);
  }

  zipCodeChanged(id, value){
    if(value === undefined)
      this.zipCode = id;
    else{
      var index =  _.findIndex(this.details.addresses, (d) => d.addressId === id);
      this.details.addresses[index].zipcode = value;
    }
      this.eventBus.trigger(App.events.models.changed);
  }  

  cardNumChanged(id, value){
    if(value === undefined)
      this.cardNum = id;
    else{
    var index =  _.findIndex(this.details.cards, (d) => d.cardId === id);
    this.details.cards[index].cardnum = value;
      }
      this.eventBus.trigger(App.events.models.changed);
    }

  cardCvvChanged(id, value){
    if(value === undefined)
      this.cardCvv = id;
    else{
    var index =  _.findIndex(this.details.cards, (d) => d.cardId === id);
    this.details.cards[index].cardCvv = value;
      }
      this.eventBus.trigger(App.events.models.changed);
    }
    
  cardExpMonChanged(id, value){
    if(value === undefined)
      this.cardExpMon = id;
    else{
    var index =  _.findIndex(this.details.cards, (d) => d.cardId === id);
    this.details.cards[index].cardExpMon = value;
      }
      this.eventBus.trigger(App.events.models.changed);
    }
    
    cardExpYrChanged(id, value){
    if(value === undefined)
      this.cardExpYr = id;
    else{
    var index =  _.findIndex(this.details.cards, (d) => d.cardId === id);
    this.details.cards[index].cardExpYr = value;
      }
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
      address: [],
      activeStatus: true
    });
  }
 

  addrPhoneNumberChanged(id, value){
    var index =  _.findIndex(this.details.addresses, (d) => d.id === id);
    this.details.addresses[index].phoneNumber = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  autoSave1(id, key, value){
    var index =  _.findIndex(this.details.addresses, (d) => d.id === id);
    this.details.addresses[index].key = value;
    this.eventBus.trigger(App.events.models.changed); 
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
          this.localStorage.setItem('username', response.info.firstName);
          this.localStorage.setItem('custId', response.info.custId);
          if(response.firstName === 'admin')
            this.localStorage.setItem('is_admin', true);
          else
            this.localStorage.setItem('is_admin', false);
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
          if(this.addresses.length === 0)
            this.addresses.push(this.emptyStateAddress());
          if(this.cards.length === 0)
            this.cards.push(this.emptyStateCard());
        }
      }).fail((jqXHR, textStatus, errorThrown)=>{
          window.BUS.trigger(App.events.ui.alert,['problem in getting registration details', 'Info']);
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
        window.BUS.trigger(App.events.ui.alert, [response.message || 'Updated Successfully', 'Info', () => {
          window.BUS.trigger(App.events.models.changed);
        }]);
      }).fail((jqXHR, textStatus, errorThrown)=>{
          window.BUS.trigger(App.events.ui.alert,['problem in updating profile details', 'Info']);
      }).always(()=>{
        this.loading = false;
        this.eventBus.trigger(App.events.models.changed);
      });
  }
  
  updateCard(cardId){
    var custId = localStorage.getItem("custId");
    var query =  _.find(this.details.cards, (d) => d.cardId === cardId);
    $.ajax({
        type: 'PUT',
        url: window.baseURL+'profile/card',
        data: JSON.stringify(query),
        contentType: 'application/json',
        dataType: "json"
      }).done((response)=>{
          window.BUS.trigger(App.events.ui.alert, ['Updated Successfully', 'Info', () => {
            window.BUS.trigger(App.events.models.changed);
          }]);
      }).fail((jqXHR, textStatus, errorThrown)=>{
          window.BUS.trigger(App.events.ui.alert,['problem in updating card details', 'Info']);
      }).always(()=>{
        this.loading = false;
        this.eventBus.trigger(App.events.models.changed);
      });
  }

// ** Address related methods in editProfile **

  emptyStateAddress() {
    return {
      "addressId":Date.now(),
      "custId":this.localStorage.getItem('custId'),
      "phoneNumber":null,
      "address1":null,
      "address2":null,
      "city":null,
      "state":null,
      "country":null,
      "zipcode":null,
      "is_synced": false
    };
  }
  autoSaveAddr(addressId, element, value){
    var currentAddressIndex = _.findIndex(this.addresses, a => {
      return a.addressId === addressId;
    });
    this.addresses[currentAddressIndex][element] = value;
    this.eventBus.trigger(App.events.models.changed);
  }
  addNewAddress() {
    this.addresses.push(this.emptyStateAddress());
    this.eventBus.trigger(App.events.models.changed);
  }
  deleteAddress(addressId){
    var that = this;
    var currentAddressIndex = _.findIndex(this.addresses, addr => {
      return addr.addressId === addressId;
    });
    if(this.addresses[currentAddressIndex].is_synced === false){
      window.BUS.trigger(App.events.ui.alert, ["Do you want to discard Newly added address details without saving?", "Confirmation", () => {
        that.addresses = _.filter(that.addresses, addr => {
          return addr.addressId !== addressId;
        });
        that.eventBus.trigger(App.events.models.changed);
      }]);
    }else{
      this.loading = true;
      this.eventBus.trigger(App.events.models.changed);
      var custId = this.localStorage.getItem('custId');
      $.ajax({
        type: 'DELETE',
        url: window.baseURL+ 'profile/address?addressId='+addressId,
        contentType: 'application/json',
        dataType: "json"
      }).done(()=>{
        window.BUS.trigger(App.events.ui.confirm, ["Removed address from saved list successfully!", "Info", () => {
          that.addresses = _.filter(that.addresses, addr => {
            return addr.addressId !== addressId;
          });
          if(that.addresses.length === 0)
            that.addresses.push(that.emptyStateAddress());
          that.eventBus.trigger(App.events.models.changed);
        }]);
      }).fail((jqXHR, textStatus, errorThrown)=>{
        window.BUS.trigger(App.events.ui.alert,['problem in deleting the address', 'Info']);
      }).always(()=>{
        this.loading = false;
        this.eventBus.trigger(App.events.models.changed);
      });
    }
  }
  submitAddress(addrId){
    var custId = localStorage.getItem("custId");
    var currentAddressIndex =  _.findIndex(this.addresses, (d) => d.addressId === addrId);
    var query = this.addresses[currentAddressIndex];
    delete query.is_synced;
    delete query.addressId;
    $.ajax({
        type: 'POST',
        url: window.baseURL+'profile/address',
        data: JSON.stringify(query),
        contentType: 'application/json',
        dataType: "json"
      }).done((response)=>{
          window.BUS.trigger(App.events.ui.alert, ['New Address saved Successfully', 'Info', () => {
            window.BUS.trigger(App.events.models.changed);
          }]);
          this.addresses[currentAddressIndex] = response;
      }).fail((jqXHR, textStatus, errorThrown)=>{
          window.BUS.trigger(App.events.ui.alert,['problem in adding new address', 'Info']);
      }).always(()=>{
        this.loading = false;
        this.eventBus.trigger(App.events.models.changed);
      });
  }
  updateAddress(addrId){
    var custId = localStorage.getItem("custId");
    var query =  _.find(this.addresses, (d) => d.addressId === addrId);
    $.ajax({
        type: 'PUT',
        url: window.baseURL+'profile/address',
        data: JSON.stringify(query),
        contentType: 'application/json',
        dataType: "json"
      }).done((response)=>{
          window.BUS.trigger(App.events.ui.alert, ['Updated Successfully', 'Info', () => {
            window.BUS.trigger(App.events.models.changed);
          }]);
          //this.addresses = response;
      }).fail((jqXHR, textStatus, errorThrown)=>{
          window.BUS.trigger(App.events.ui.alert,['problem in updating address details', 'Info']);
      }).always(()=>{
        this.loading = false;
        this.eventBus.trigger(App.events.models.changed);
      });
  }

  // ** Card related methods in editProfile ** 

  emptyStateCard() {
    return {
      "cardId":Date.now(),
      "custId": localStorage.getItem("custId"),
      "cardNumber": null,
      "cardCvv": null,
      "cardExpMon": null,
      "cardExpYr": null,
      "is_synced": false
    };
  }
  autoSaveCard(cardId, element, value){
    var currentCardIndex = _.findIndex(this.cards, c => {
      return c.cardId === cardId;
    });
    this.cards[currentCardIndex][element] = value;
    this.eventBus.trigger(App.events.models.changed);
  }
  addNewCard() {
    this.cards.push(this.emptyStateCard());
    this.eventBus.trigger(App.events.models.changed);
  }
  deleteCard(cardId){
    var that = this;
    var currentCardIndex = _.findIndex(this.cards, card => {
      return card.cardId === cardId;
    });
    if(this.cards[currentCardIndex].is_synced === false){
      window.BUS.trigger(App.events.ui.confirm, ["Do you want to discard Newly added card info without saving?", "Confirmation", () => {
        that.cards = _.filter(that.cards, card => {
          return card.cardId !== cardId;
        });
        that.eventBus.trigger(App.events.models.changed);
      }]);
    }else{
      this.loading = true;
      this.eventBus.trigger(App.events.models.changed);
      var custId = this.localStorage.getItem('custId');
      $.ajax({
        type: 'DELETE',
        url: window.baseURL+ 'profile/card?cardId='+cardId,
        contentType: 'application/json',
        dataType: "json"
      }).done(()=>{
        window.BUS.trigger(App.events.ui.alert, ["Removed card details from saved list successfully!", "Info", () => {
          that.cards = _.filter(that.cards, card => {
            return card.cardId !== cardId;
          });
          if(that.cards.length === 0)
            that.cards.push(that.emptyStateCard());
          that.eventBus.trigger(App.events.models.changed);
        }]);
      }).fail((jqXHR, textStatus, errorThrown)=>{
        window.BUS.trigger(App.events.ui.alert,['problem in deleting the Card details', 'Info']);
      }).always(()=>{
        this.loading = false;
        this.eventBus.trigger(App.events.models.changed);
      });
    }
  }
  submitCard(cardId){
    var custId = localStorage.getItem("custId");
    var currentCardIndex =  _.findIndex(this.cards, (d) => d.cardId === cardId);
    var query = this.cards[currentCardIndex];
    delete query.is_synced;
    delete query.cardId;
    $.ajax({
        type: 'POST',
        url: window.baseURL+'profile/card',
        data: JSON.stringify(query),
        contentType: 'application/json',
        dataType: "json"
      }).done((response)=>{
          window.BUS.trigger(App.events.ui.alert, ['New Card Info saved Successfully', 'Info', () => {
            window.BUS.trigger(App.events.models.changed);
          }]);
          this.cards[currentCardIndex] = response;
      }).fail((jqXHR, textStatus, errorThrown)=>{
          window.BUS.trigger(App.events.ui.alert,['problem in adding new card info', 'Info']);
      }).always(()=>{
        this.loading = false;
        this.eventBus.trigger(App.events.models.changed);
      });
  }
  updateCard(cardId){
    var custId = localStorage.getItem("custId");
    var query =  _.find(this.cards, (d) => d.cardId === cardId);
    $.ajax({
        type: 'PUT',
        url: window.baseURL+'profile/card',
        data: JSON.stringify(query),
        contentType: 'application/json',
        dataType: "json"
      }).done((response)=>{
          window.BUS.trigger(App.events.ui.alert, ['Updated Successfully', 'Info', () => {
            window.BUS.trigger(App.events.models.changed);
          }]);
      }).fail((jqXHR, textStatus, errorThrown)=>{
          window.BUS.trigger(App.events.ui.alert,['problem in updating card details', 'Info']);
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
