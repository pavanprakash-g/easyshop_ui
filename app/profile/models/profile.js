var App = require('./../../context/events');
var _ = require('underscore');
var $ = require('jquery');
var Immutable  = require('immutable');
var md5 = require('md5');

var Profile = class {
  constructor(eventBus,localStorage) {
    this.eventBus = eventBus;
    this.loading = false;
    this.username = null;
    this.password = null;
    this.localStorage = localStorage;
    this.details = [];
  }

 updateUsername(value){
    this.username = value;
  }

  updatePassword(value){
    this.password = value;
  }

  init(){
    $.ajax({
        method: 'GET',
        url: window.baseURL+'profile/custDetails',
        contentType: 'application/json',
        dataType: "json"
      }).done((response)=>{
        if(response != null){
          this.details = response;
        }
      }).fail((jqXHR, textStatus, errorThrown)=>{
          window.BUS.trigger(App.events.ui.alert,['problem in Login', 'Info']);
      }).always(()=>{
        this.loading = false;
        this.eventBus.trigger(App.events.models.changed);
      });
  }

  updateActiveStatus(custId, status){
    var query = _.find(this.details, (o) => parseInt(o.custId) === parseInt(custId));
    query.activeStatus = status;
    $.ajax({
        method: 'PUT',
        url: window.baseURL+'profile/custDetails',
        data: JSON.stringify(query),
        contentType: 'application/json',
        dataType: "json",
      }).done((response)=>{
        if(response != null){
          this.details = response;
        }
      }).fail((jqXHR, textStatus, errorThrown)=>{
          window.BUS.trigger(App.events.ui.alert,['problem in updating Status', 'Info']);
      }).always(()=>{
        this.loading = false;
        this.eventBus.trigger(App.events.models.changed);
      });
  }

  getState(){
    return Immutable.fromJS({
      username: this.username,
      password: this.password,
      isAdmin: this.isAdmin,
      details: this.details
    });
  }
};
module.exports = Profile;
