var App = require('./../../context/events');
var _ = require('underscore');
var $ = require('jquery');
var Immutable  = require('immutable');

var Order = class {
	constructor(eventBus, localstorage){
    this.eventBus = eventBus;
    this.localstorage = localstorage;
    this.addresses = [];
    this.cards = [];
    this.selectedAddress = 0;
    this.selectedCard = 0;
    this.loading = false;
	}

  getCustDetails(){
    var custId = this.localstorage.getItem('custId');
    $.ajax({
        method: 'GET',
        url: window.baseURL+'profile/custDetails?id='+custId,
        contentType: 'application/json',
        dataType: "json"
      }).done((response)=>{
        if(response != null){
          this.addresses = response.addresses;
          this.cards = response.cards;
        }
      }).fail((jqXHR, textStatus, errorThrown)=>{
          window.BUS.trigger(App.events.ui.alert,['problem in getting profile details', 'Info']);
      }).always(()=>{
        this.loading = false;
        this.eventBus.trigger(App.events.models.changed);
      });
  }

  saveAddress(addressId){
    this.selectedAddress = addressId;
    this.eventBus.trigger(App.events.models.changed);
  }

  saveCard(cardId){
    this.selectedCard = cardId;
    this.eventBus.trigger(App.events.models.changed);
  }
  
  getState(){
    return Immutable.fromJS({
      addresses: this.addresses,
      cards: this.cards,
      selectedAddress: this.selectedAddress,
      selectedCard: this.selectedCard
    });
  }
};

module.exports = Order;