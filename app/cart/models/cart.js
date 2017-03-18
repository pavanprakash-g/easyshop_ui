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
          this.items = response;
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
      currentItem: this.currentItem
    });
  }
};

module.exports = Cart;