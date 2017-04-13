var App = require('./../../context/events');
var _ = require('underscore');
var $ = require('jquery');
var Immutable  = require('immutable');

var SubscriptionOrders = class {
	constructor(eventBus, localstorage){
    this.eventBus = eventBus;
    this.localstorage = localstorage;
    this.loading = false;
    this.subsOrdersList = [];
	}
  emptyStateSubscription() {
  return {
      "subsOrderHdrId":Date.now(),
      "custId":this.localstorage.getItem('custId'),
      "subsOrderItemCount":0,
      "subsOrderTotal":0,
      "subsOrderStatus":"Pending",
      "taxAmount":0,
      "subsOrderAddressId":null,
      "subsOrderBillingAddrId":null,
      "subsOrderCreatedDate":null,
      "subsOrderUpdatedDate":null,
      "subscriptionType":1,
      "nextDueDate":null,
      "items":[],
      "is_synced": false
    };
  }
  resetSubscriptionsList(){
    this.subsOrdersList = [];
    this.eventBus.trigger(App.events.models.changed);
  }
  autoSave(orderId, element, value){
    var currentOrderIndex = _.findIndex(this.subsOrdersList, o => {
      return o.subsOrderHdrId === orderId;
    });
    this.subsOrdersList[currentOrderIndex][element] = value;
    this.eventBus.trigger(App.events.models.changed);
    window.router.setRoute('/orders/subscription');
  }
  addSubrOrder() {
    this.subsOrdersList.push(this.emptyStateSubscription());
    this.eventBus.trigger(App.events.models.changed);
  }
  itemCountChanged(orderId,itemId,itemCount){
    this.subsOrdersList.map(order => {
      if(order.subsOrderId === orderId){
        order.items.map(u => {
          if(u.subsOrderItemId === itemId){
            u.subsOrderItemQuantity = itemCount;
          }   
        });
      }
    });
    this.eventBus.trigger(App.events.models.changed);
  }
  addItem(orderId, item){
    var currentOrderIndex = _.findIndex(this.subsOrdersList, o => {
      return o.subsOrderHdrId === orderId;
    });
    var existingItems = this.subsOrdersList[currentOrderIndex]['items'];
    existingItems.push({"subsOrderDtlId":Date.now(),
            "subsOrderId": this.subsOrdersList[currentOrderIndex]['subsOrderId'],
            "subsOrderItemId":item.get('itemId'),
            "subsOrderItemQuantity":1,
            "subsOrderItemPrice":item.get('itemPrice'),
            "subsOrderItemStatus":"Pending",
            "subsOrderItemName":item.get('itemName')});
    this.subsOrdersList[currentOrderIndex]['items'] = existingItems;
    this.eventBus.trigger(App.events.models.changed);
    window.router.setRoute('/orders/subscription');
  }
  removeItem(orderId, itemId){
    var currentOrderIndex = _.findIndex(this.subsOrdersList, o => {
      return o.subsOrderId === orderId;
    });

    var existingItems = this.subsOrdersList[currentOrderIndex]['items'];
    var currentItemIndex = _.findIndex(existingItems, i => {
      return i.subsOrderItemId === itemId;
    });
    existingItems.splice(currentItemIndex, 1);
    this.subsOrdersList[currentOrderIndex]['items'] = existingItems;
    //this.eventBus.trigger(App.events.models.changed);
    //window.router.setRoute('/orders/subscription');
    $.ajax({
      type: 'DELETE',
      url: window.baseURL+'subscriptionOrder/deleteSubscriptionOrderItem?itemId='+itemId+'&orderId='+orderId,
      contentType: 'application/json',
      dataType: "json"
    }).done((response)=>{
        var msg = "Item is deleted from the order succesfully";
        window.BUS.trigger(App.events.ui.alert, [response.message || msg, 'Info', () => {
          window.BUS.trigger(App.events.models.changed);
        }]);
    }).fail((jqXHR, textStatus, errorThrown)=>{
        window.BUS.trigger(App.events.ui.alert,['problem in subscription orders. Please try again later!', 'Info']);
    }).always(()=>{
      this.loading = false;
      this.eventBus.trigger(App.events.models.changed);
    });
  }
  subscribe(orderId){
    var currentOrderIndex = _.findIndex(this.subsOrdersList, o => {
      return o.subsOrderHdrId === orderId;
    });
    var url;
    var query = this.subsOrdersList[currentOrderIndex];
    if(this.subsOrdersList[currentOrderIndex].is_synced === false){
      url = window.baseURL+'subscriptionOrder/createSubscriptionOrders'
      delete query.subsOrderHdrId;
      query.items.map(u => {
        delete u.subsOrderDtlId;
      });
    }else{
      url = window.baseURL+'subscriptionOrder/updateSubscriptionOrders?order_id=' + this.subsOrdersList[currentOrderIndex].subsOrderHdrId;
    }
    delete query.is_synced;
    var that = this;
    this.loading = true;
    this.eventBus.trigger(App.events.models.changed);
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(query),
        contentType: 'application/json',
        dataType: "json"
      }).done((response)=>{
          var msg;
          if(that.subsOrdersList[currentOrderIndex].is_synced === false)
            msg = "Created subscription order successfully. Relax and sit back!";
          else
            msg = "Updated subscription order succesfully";
          //that.subsOrdersList[currentOrderIndex] = response;
          window.BUS.trigger(App.events.ui.alert, [response.message || msg, 'Info', () => {
            window.BUS.trigger(App.events.models.changed);
          }]);
      }).fail((jqXHR, textStatus, errorThrown)=>{
          window.BUS.trigger(App.events.ui.alert,['problem in subscription orders. Please try again later!', 'Info']);
      }).always(()=>{
        this.loading = false;
        this.eventBus.trigger(App.events.models.changed);
      });
  }
  getOrders(){
    this.loading = true;
    this.eventBus.trigger(App.events.models.changed);
    var custId = this.localstorage.getItem('custId');
    $.ajax({
      type: 'GET',
      url: window.baseURL+'subscriptionOrder/getSubscriptionOrders?custId='+custId,
      contentType: 'application/json',
      dataType: "json"
    }).done((response)=>{
      this.subsOrdersList = response;
      if(this.subsOrdersList.length === 0)
        this.subsOrdersList.push(this.emptyStateSubscription());
    }).fail((jqXHR, textStatus, errorThrown)=>{
        window.BUS.trigger(App.events.ui.alert,['problem in getting Order details', 'Info']);
    }).always(()=>{
      this.loading = false;
      this.eventBus.trigger(App.events.models.changed);
    });
  }
  deleteOrder(orderId){
    var currentOrderIndex = _.findIndex(this.subsOrdersList, o => {
      return o.subsOrderId === orderId;
    });
    if(this.subsOrdersList[currentOrderIndex].is_synced === false){
      window.BUS.trigger(App.events.ui.alert, ["Do you want to discard added order changes", "Confirmation", () => {
        this.subsOrdersList = _.filter(this.subsOrdersList, o => {
          return o.subsOrderId !== orderId;
        });
        this.eventBus.trigger(App.events.models.changed);
      }]);
    }else{
      var that = this;
      this.loading = true;
      this.eventBus.trigger(App.events.models.changed);
      var custId = this.localstorage.getItem('custId');
      $.ajax({
        type: 'DELETE',
        url: window.baseURL+'subscriptionOrder/deleteSubscriptionOrder?orderId='+orderId,
        contentType: 'application/json',
        dataType: "json"
      }).done(()=>{
        window.BUS.trigger(App.events.ui.alert, ["Unsubscribed Order #"+orderId+" successfully!", "Info", () => {
          that.subsOrdersList = _.filter(that.subsOrdersList, s => {
            return s.subsOrderId !== orderId;
          });
          if(that.subsOrdersList.length === 0)
            that.subsOrdersList.push(that.emptyStateSubscription());
          that.eventBus.trigger(App.events.models.changed);
        }]);
      }).fail((jqXHR, textStatus, errorThrown)=>{
        window.BUS.trigger(App.events.ui.alert,['problem in deleting the subscription Order', 'Info']);
      }).always(()=>{
        this.loading = false;
        this.eventBus.trigger(App.events.models.changed);
      });
    }
  }
  getState(){
    return Immutable.fromJS({
      subsOrdersList: this.subsOrdersList,
      loading: this.loading
    });
  }
};

module.exports = SubscriptionOrders;