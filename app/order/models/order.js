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
    this.selectedShippingAddress = 0;
    this.selectedBillingAddress = 0;
    this.selectedCard = 0;
    this.loading = false;
    this.itemCount = 0;
    this.finalAmount = 0;
    this.items = [];
    this.orderItems = [];
    this.ordersList = [];
    this.custOrdersList = [];
    this.addressDetails = [];
    this.subsOrdersList = [];
    this.taxPercentage = 0.0;
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

  saveShippingAddress(addressId){
    this.selectedShippingAddress = addressId;
    var index =  _.findIndex(this.addresses, (d) => d.addressId === addressId);
    var that = this;
    that.getTax(this.addresses[index].zipcode);
    this.eventBus.trigger(App.events.models.changed);
  }

  saveBillingAddress(addressId){
    debugger;
    this.selectedBillingAddress = addressId;
    this.eventBus.trigger(App.events.models.changed);
  }

  saveCard(cardId){
    this.selectedCard = cardId;
    this.eventBus.trigger(App.events.models.changed);
  }

  getTax(zipcode){
    $.ajax({
      type: 'GET',
      url: window.baseURL+'order/getTax?zipcode='+zipcode,
      contentType: 'application/json',
      dataType: "json"
    }).done((response)=>{
      this.taxPercentage = response.taxPercentage;
    }).fail((jqXHR, textStatus, errorThrown)=>{
        window.BUS.trigger(App.events.ui.alert,['problem in getting Order details', 'Info']);
    }).always(()=>{
      this.loading = false;
      this.eventBus.trigger(App.events.models.changed);
    });
  }

  formPayload() {
    this.updateitems();
    return ({
      custId: this.localstorage.getItem('custId'),
      orderItemCount: this.itemCount,
      orderTotal: this.finalAmount + (this.finalAmount *(this.taxPercentage/100)),
      taxAmount: this.finalAmount *(this.taxPercentage/100),
      orderAddressId: this.selectedShippingAddress,
      orderBillingAddrId: this.selectedBillingAddress,
      orderStatus: 'Pending',
      items:this.orderItems
    });
  }

  /*getTimeStamp(){
    return Math.round((new Date()).getTime() / 1000);
  }*/

  updateitems(){
    this.items.map(u => {
      var newItem = {};
      var index = _.findIndex(this.orderItems, (d) => d.itemId === u.get('itemId'));
      if(index > -1){
        this.items.get(i).itemCount = u.get('itemCount')+1;
      }else{
        newItem['orderItemId'] = u.get('itemId');
        newItem['orderItemQuantity'] = u.get('itemCount');
        newItem['orderItemPrice'] = u.get('itemPrice');
        newItem['orderItemStatus'] = 'Pick';
        this.orderItems.push(newItem);
      }
    });
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
        this.localstorage.setItem('carCount',0);
      }).fail((jqXHR, textStatus, errorThrown)=>{
          window.BUS.trigger(App.events.ui.alert,['problem in getting profile details', 'Info']);
      }).always(()=>{
        this.loading = false;
        this.eventBus.trigger(App.events.models.changed);
      });
  }

  ordersListAdmin(){
    $.ajax({
      type: 'GET',
      url: window.baseURL+'order/getOrders',
      contentType: 'application/json',
      dataType: "json"
    }).done((response)=>{
      this.ordersList = response;
    }).fail((jqXHR, textStatus, errorThrown)=>{
        window.BUS.trigger(App.events.ui.alert,['problem in getting Order details', 'Info']);
    }).always(()=>{
      this.loading = false;
      this.eventBus.trigger(App.events.models.changed);
    });
  }

  custOrders(){
    var custId = this.localstorage.getItem('custId');
    $.ajax({
      type: 'GET',
      url: window.baseURL+'order/getOrders?custId='+custId,
      contentType: 'application/json',
      dataType: "json"
    }).done((response)=>{
      this.custOrdersList = response;
    }).fail((jqXHR, textStatus, errorThrown)=>{
        window.BUS.trigger(App.events.ui.alert,['problem in getting Order details', 'Info']);
    }).always(()=>{
      this.loading = false;
      this.eventBus.trigger(App.events.models.changed);
    });

    $.ajax({
      type: 'GET',
      url: window.baseURL+'subscriptionOrder/getSubscriptionOrders?custId='+custId,
      contentType: 'application/json',
      dataType: "json"
    }).done((response)=>{
      this.subsOrdersList = response;
    }).fail((jqXHR, textStatus, errorThrown)=>{
        window.BUS.trigger(App.events.ui.alert,['problem in getting Order details', 'Info']);
    }).always(()=>{
      this.loading = false;
      this.eventBus.trigger(App.events.models.changed);
    });
  }

  addressById(addressId){
    $.ajax({
      type: 'GET',
      url: window.baseURL+'profile/address?addressId='+addressId,
      contentType: 'application/json',
      dataType: "json"
    }).done((response)=>{
      this.addressDetails = response;
    }).fail((jqXHR, textStatus, errorThrown)=>{
        window.BUS.trigger(App.events.ui.alert,['problem in getting Order details', 'Info']);
    }).always(()=>{
      this.loading = false;
      this.eventBus.trigger(App.events.models.changed);
    });
  }

  changeStatus(orderId, status){
    $.ajax({
      type: 'PUT',
      url: window.baseURL+'order/updateOrder?orderId='+orderId+'&orderStatus='+status,
      contentType: 'application/json',
      dataType: "json"
    }).done((response)=>{
      
    }).fail((jqXHR, textStatus, errorThrown)=>{
        window.BUS.trigger(App.events.ui.alert,['problem in getting Order details', 'Info']);
    }).always(()=>{
      this.loading = false;
      this.eventBus.trigger(App.events.models.changed);
    });
  }

  changeItemStatus(orderId, itemId, status){
    $.ajax({
      type: 'PUT',
      url: window.baseURL+'order/updateOrderItem?orderId='+orderId+'&orderItemStatus='+status+'&orderItemId='+itemId,
      contentType: 'application/json',
      dataType: "json"
    }).done((response)=>{
      
    }).fail((jqXHR, textStatus, errorThrown)=>{
        window.BUS.trigger(App.events.ui.alert,['problem in getting Order details', 'Info']);
    }).always(()=>{
      this.loading = false;
      this.eventBus.trigger(App.events.models.changed);
    });
  }

  approveReturn(orderId, itemId, status){
    $.ajax({
      type: 'PUT',
      url: window.baseURL+'order/updateOrderItem?orderId='+orderId+'&orderItemStatus='+status+'&orderItemId='+itemId,
      contentType: 'application/json',
      dataType: "json"
    }).done((response)=>{
      
    }).fail((jqXHR, textStatus, errorThrown)=>{
        window.BUS.trigger(App.events.ui.alert,['problem in getting Order details', 'Info']);
    }).always(()=>{
      this.loading = false;
      this.eventBus.trigger(App.events.models.changed);
    });
  }
  
  getState(){
    return Immutable.fromJS({
      addresses: this.addresses,
      cards: this.cards,
      selectedShippingAddress: this.selectedShippingAddress,
      selectedBillingAddress: this.selectedBillingAddress,
      selectedCard: this.selectedCard,
      ordersList: this.ordersList,
      custOrdersList: this.custOrdersList,
      subsOrdersList: this.subsOrdersList,
      addressDetails: this.addressDetails,
      itemName: this.itemName,
      taxPercentage: this.taxPercentage
    });
  }
};

module.exports = Order;