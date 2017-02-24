var App = require('./../../context/events');
var _ = require('underscore');
var $ = require('jquery');
var Immutable  = require('immutable');

var Catalog = class {
	constructor(eventBus, localstorage){
    this.eventBus = eventBus;
    this.items = [];
    this.currentItem = [];
    this.localstorage = localstorage;
	}

	getAllItems(){
	$.ajax({
        method: 'GET',
        url: window.baseURL+'catalog/itemDetails',
        contentType: 'application/json',
        dataType: "json"
      }).done((response)=>{
        if(response != null){
          this.items = response;
        }
      }).fail((jqXHR, textStatus, errorThrown)=>{
          window.BUS.trigger(App.events.ui.alert,['problem in getting catalog details', 'Info']);
      }).always(()=>{
        this.loading = false;
        this.eventBus.trigger(App.events.models.changed);
      });
	}

  setCurrentItem(value){
    this.currentItem = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  autoSave(id, value){
    this.currentItem[id] = value;
    this.eventBus.trigger(App.events.models.changed); 
  }

  getState(){
    return Immutable.fromJS({
      items: this.items,
      currentItem: this.currentItem
    });
  }
};

module.exports = Catalog;