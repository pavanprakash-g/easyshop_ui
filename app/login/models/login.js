var App = require('./../../context/events');
var _ = require('underscore');
var $ = require('jquery');
var Immutable  = require('immutable');
var md5 = require('md5');
var loginDetails = 'login.details';

var Login = class {
  constructor(eventBus,localStorage) {
    this.eventBus = eventBus;
    this.loading = false;
    this.username = null;
    this.password = null;
    this.securityQuesAns = null;
    this.newPassword = "";
    this.confirmPassword = "";
    this.localStorage = localStorage;
  }

  updateUsername(value){
    this.username = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  updatePassword(value){
    this.password = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  updateSecurityQuesAns(value){
    this.securityQuesAns = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  newPasswordChanged(value){
    this.newPassword = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  confirmPasswordChanged(value){
    this.confirmPassword = value;
    this.eventBus.trigger(App.events.models.changed);
  }

  perform(){
    this.loading = true;
    var pwd = md5(this.password);
    this.eventBus.trigger(App.events.models.changed);
    $.ajax({
        method: 'GET',
        url: window.baseURL+'login/verifyLogin?email='+this.username+'&pwd='+pwd,
        contentType: 'application/json',
        dataType: "json"
      }).done((response)=>{
        if(response.verifyLogin.status){
          this.localStorage.setItem('authtoken', response.verifyLogin.uuid);
          this.localStorage.setItem('username', response.verifyLogin.firstName);
          this.localStorage.setItem('custId', response.verifyLogin.custId);
          this.localStorage.setItem('cartCount', response.verifyLogin.cartCount);
          this.localStorage.setItem('is_admin', response.verifyLogin.firstName === 'admin');
          window.router.setRoute("/login");
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
      username: this.username,
      password: this.password,
      loading: this.loading,
      cartCount: this.localStorage.getItem('cartCount'),
      securityQuesAns: this.securityQuesAns,
      loggedIn: _.isEmpty(this.localStorage.getItem('authtoken'))? false : true,
      isAdmin: this.localStorage.getItem('username')==='admin'? true : false
    });
  }

  forgetPassword(){
    var that = this;
    this.loading = true;
    this.eventBus.trigger(App.events.models.changed);
    $.ajax({
      method: 'GET',
      url: window.baseURL+'login/forgetPassword?email='+this.username+'&securityAns='+this.securityQuesAns,
      contentType: 'application/json',
      dataType: "json"
    }).done((response)=>{
      if(response.forgetPassword.status){
        window.router.setRoute("/forgetPasswordSuccess");
      }
    }).fail((jqXHR, textStatus, errorThrown)=>{
        window.BUS.trigger(App.events.ui.alert,['UserName or Answer to Security Question does not match', 'Info']);
    }).always(()=>{
      this.loading = false;
      this.eventBus.trigger(App.events.models.changed);
    });
  };

   forgetPasswordSuccess(){
      var that = this;
      this.loading = true;
      var pwd = md5(this.newPassword);
      this.eventBus.trigger(App.events.models.changed);
      var data = {emailId: this.username, password: md5(this.newPassword)};
      $.ajax({
          method: 'PUT',
          url: window.baseURL+'/login/updatePassword',
          data: JSON.stringify(data),
          contentType: 'application/json',
          dataType: "json"
        }).done((response)=>{
          if(response.status){
            window.router.setRoute("/login");
          }
        }).fail((jqXHR, textStatus, errorThrown)=>{
            window.BUS.trigger(App.events.ui.alert,['Unable to update the password...Try again after some time', 'Info']);
        }).always(()=>{
          this.loading = false;
          this.eventBus.trigger(App.events.models.changed);
        });
        };
    
    logout(){
      this.localStorage.clear();
      window.BUS.trigger(App.events.models.changed);
    }

};
module.exports = Login;
