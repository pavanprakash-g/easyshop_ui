var LoginModel = require('./login');
var Immutable = require('immutable');
var RegisterModel = require('./register');

var Login = class {
  constructor(eventBus, localStorage){
    this.eventBus = eventBus;
    this.loginModel = new LoginModel(eventBus, localStorage);
    this.registerModel = new RegisterModel(eventBus, localStorage);
  }
  getState(){
    return Immutable.fromJS(
      {
        login: this.loginModel.getState(),
        register: this.registerModel.getState()
      }
    );
  }
}

module.exports = Login;