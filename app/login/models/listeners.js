var Events = require('../../context/events').events;
var listeners = function(eventBus, model) {

  eventBus.on(Events.login.updateUsername, (evt, value) => {
    model.loginModel.updateUsername(value);
  });

  eventBus.on(Events.login.updatePassword, (evt, value) => {
    model.loginModel.updatePassword(value);
  });

  eventBus.on(Events.login.logout, () => {
    model.loginModel.logout();
  });

  eventBus.on(Events.forgetPassword.newPasswordChanged, (evt, value) => {
    model.loginModel.newPasswordChanged(value);
  });

  eventBus.on(Events.forgetPassword.confirmPasswordChanged, (evt, value) => {
    model.loginModel.confirmPasswordChanged(value);
  });

  eventBus.on(Events.login.perform, () => {
    model.loginModel.perform();
  });

  eventBus.on(Events.login.forgetPassword, () => {
    model.loginModel.forgetPassword();
  });

   eventBus.on(Events.forgetPassword.perform, () => {
    model.loginModel.forgetPasswordSuccess();
   });

  eventBus.on(Events.login.updateSecurityQuesAns, (evt, value) => {
    model.loginModel.updateSecurityQuesAns(value);
  });
  eventBus.on(Events.register.firstNameChanged, (evt, value) => {
    model.registerModel.firstNameChanged(value);
  });
  eventBus.on(Events.register.lastNameChanged, (evt, value) => {
    model.registerModel.lastNameChanged(value);
  });
  eventBus.on(Events.register.emailIdChanged, (evt, value) => {
    model.registerModel.emailIdChanged(value);
  });
  eventBus.on(Events.register.phoneNumberChanged, (evt, id, value) => {
    model.registerModel.phoneNumberChanged(id, value);
  });
  eventBus.on(Events.register.address1Changed, (evt, id, value) => {
    model.registerModel.address1Changed(id, value);
  });
  eventBus.on(Events.register.address2Changed, (evt, id, value) => {
    model.registerModel.address2Changed(id, value);
  });
  eventBus.on(Events.register.cityChanged, (evt, id, value) => {
    model.registerModel.cityChanged(id, value);
  });
  eventBus.on(Events.register.stateChanged, (evt, id, value) => {
    model.registerModel.stateChanged(id, value);
  });
  eventBus.on(Events.register.countryChanged, (evt, id, value) => {
    model.registerModel.countryChanged(id, value);
  });
  eventBus.on(Events.register.zipCodeChanged, (evt, id, value) => {
    model.registerModel.zipCodeChanged(id, value);
  });
  eventBus.on(Events.register.securityQuesAnsChanged, (evt, value) => {
    model.registerModel.securityQuesAnsChanged(value);
  });
  eventBus.on(Events.register.perform, () => {
    model.registerModel.perform();
  });
  eventBus.on(Events.register.custDetails, () => {
    model.registerModel.custDetails();
  });
  eventBus.on(Events.register.update, () => {
    model.registerModel.update();
  });
  eventBus.on(Events.register.passwordChanged, (evt, value) => {
    model.registerModel.passwordChanged(value);
  });
  eventBus.on(Events.register.addrPhoneNumberChanged, (evt, id, value) => {
    model.registerModel.addrPhoneNumberChanged(id, value);
  });
  eventBus.on(Events.register.updateAddress, (evt, id) => {
    model.registerModel.updateAddress(id);
  });
};

module.exports = listeners;
