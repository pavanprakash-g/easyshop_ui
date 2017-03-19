var App = require('./../../context/events');
var _ = require('underscore');
var $ = require('jquery');
var Immutable  = require('immutable');

var Cart = class {
	constructor(eventBus, localstorage){
    this.eventBus = eventBus;
    this.items = [];
    this.currentItem = [];
    this.localstorage = localstorage;
    this.itemId = 0;
    this.loading = false;
	}

  getCartItems(){
    $.ajax({
        method: 'GET',
        url: window.baseURL+'/cart/getCart',
        contentType: 'application/json',
        dataType: "json"
      }).done((response)=>{
          this.items = response.data;
          this.localstorage.setItem('cartCount',response.cartCount);
      }).fail((jqXHR, textStatus, errorThrown)=>{
          window.BUS.trigger(App.events.ui.alert,['problem in Login', 'Info']);
      }).always(()=>{
        this.loading = false;
        this.eventBus.trigger(App.events.models.changed);
      });
  }

  deleteItem(itemId){
    $.ajax({
        method: 'PUT',
        url: window.baseURL+'/cart/updateCart?type=remove&itemId='+itemId,
        contentType: 'application/json',
        dataType: "json"
      }).done((response)=>{
          this.items = response;
          this.items = response.data;
          this.localstorage.setItem('cartCount',response.cartCount);
      }).fail((jqXHR, textStatus, errorThrown)=>{
          window.BUS.trigger(App.events.ui.alert,['problem in Login', 'Info']);
      }).always(()=>{
        this.loading = false;
        this.eventBus.trigger(App.events.models.changed);
      });
  }

  reduceQuantity(itemId){
    $.ajax({
        method: 'PUT',
        url: window.baseURL+'/cart/updateCart?type=reduce&itemId='+itemId,
        contentType: 'application/json',
        dataType: "json"
      }).done((response)=>{
          this.items = response;
          this.items = response.data;
          this.localstorage.setItem('cartCount',response.cartCount);
      }).fail((jqXHR, textStatus, errorThrown)=>{
          window.BUS.trigger(App.events.ui.alert,['problem in Login', 'Info']);
      }).always(()=>{
        this.loading = false;
        this.eventBus.trigger(App.events.models.changed);
      });
  }

  validateStock(){
    $.ajax({
        method: 'GET',
        url: window.baseURL+'/cart/validateCart',
      contentType: 'application/json',
      dataType: "json"
    }).done((response)=>{
        if(response.status){
          window.router.setRoute('/order');
        }else{
          window.BUS.trigger(App.events.ui.alert,[response.message, 'Info']);  
        }
    }).fail((jqXHR, textStatus, errorThrown)=>{
        window.BUS.trigger(App.events.ui.alert,['problem in Login', 'Info']);
    }).always(()=>{
      this.loading = false;
      this.eventBus.trigger(App.events.models.changed);
    }); 
  }
  
  getState(){
    return Immutable.fromJS({
      items: this.items,
      loading: this.loading,
      currentItem: this.currentItem,
      cartCount: this.localstorage.getItem('cartCount')
    });
  }
};

module.exports = Cart;