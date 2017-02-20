var Login = require('./../login/models/login_wrapper');
var Profile = require('./../profile/models/profile');
var LoginListeners = require('./../login/models/listeners');
var ProfileListeners = require('./../profile/models/listeners');
var App = require('./events');
var $ = require('jquery');

var Context = function(eventBus, storage) {
  this.eventBus = eventBus;
  var self = this;
  var login = new Login(eventBus, storage);
  var profile = new Profile(eventBus, storage);
  this.models = {
    userLogin: login,
    profileModel: profile
  };

  $.ajaxPrefilter(function(options, localOptions, jqXHR) {
    var loginState = self.models.userLogin.getState();
    if (loginState.get('loggedIn')) {
      jqXHR.setRequestHeader('X-AUTH-TOKEN', localstorage.get('authtoken'));
    }
  });

  eventBus.on(App.events.models.changed, function() {
    self.eventBus.trigger(App.events.ui.render, self.getState());
  });

  LoginListeners(eventBus, this.models.userLogin);
  ProfileListeners(eventBus, this.models.profileModel);

  eventBus.trigger(App.events.initComplete, this.getState());
};

Context.prototype.getState = function() {
  var self = this;
  return {
    authInfo: self.models.userLogin.getState(),
    profileModel: self.models.profileModel.getState()
  };
};

module.exports = Context;
