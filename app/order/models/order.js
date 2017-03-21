var App = require('./../../context/events');
var _ = require('underscore');
var $ = require('jquery');
var Immutable  = require('immutable');
var moment = require('moment');

var Order = class {
	constructor(eventBus, localstorage){
    this.eventBus = eventBus;
    this.localstorage = localstorage;
    this.addresses = [];
    this.cards = [];
    this.selectedAddress = 0;
    this.selectedCard = 0;
    this.loading = false;
    this.itemCount = 0;
    this.finalAmount = 0;
    this.items = [];
    this.orderItems = [];
	}

  getCustDetails(itemCount, finalAmount, items){
    var custId = this.localstorage.getItem('custId');
    this.itemCount = itemCount;
    this.finalAmount = finalAmount;
    this.items = items;
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

  getItems(){
    
  }

  formPayload() {
    this.updateitems();
    return ({
      custId: this.localstorage.getItem('custId'),
      orderItemCount: this.itemCount,
      orderTotal: this.finalAmount,
      orderAddressId: this.selectedAddress,
      orderCreatedDate: this.getTimeStamp(),
      orderUpdatedDate: this.getTimeStamp(),
      orderStatus: 'Pending',
      items:this.orderItems
    });
  }

  getTimeStamp(){
    return Math.round((new Date()).getTime() / 1000);
  }

  updateitems(){
    for(var i=0; i< this.items.size; i++){
      var newItem = {};
      newItem['orderItemId'] = this.items.get(i).get('itemId');
      newItem['orderItemQuantity'] = this.items.get(i).get('itemCount');
      newItem['orderItemPrice'] = this.items.get(i).get('itemPrice');
      newItem['orderItemStatus'] = 'Pending';
      this.orderItems.push(newItem);
    }
  }

  createOrder(){
    var payload = this.formPayload();
    $.ajax({
        type: 'POST',
        url: window.baseURL+'order/createOrders',
        data: JSON.stringify(payload),
        contentType: 'application/json',
        dataType: "json"
      }).done((response)=>{
        if(response != null){
          window.router.setRoute('/home');
        }
      }).fail((jqXHR, textStatus, errorThrown)=>{
          window.BUS.trigger(App.events.ui.alert,['problem in getting profile details', 'Info']);
      }).always(()=>{
        this.loading = false;
        this.eventBus.trigger(App.events.models.changed);
      });
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