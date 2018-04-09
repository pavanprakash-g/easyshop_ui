var App = require('./../../context/events');
var _ = require('underscore');
var $ = require('jquery');
var Immutable  = require('immutable');

var Test = class {
	constructor(eventBus, localstorage){
    this.eventBus = eventBus;
    this.localstorage = localstorage;
    this.firstName = "Pavan Prakash";
    this.lastName = "Gonella";
  }
  
  firstNameChangedTest(value){
    this.firstName = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  getState(){
    return Immutable.fromJS({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }
};

module.exports = Test;