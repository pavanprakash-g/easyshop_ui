var Events = require('../../context/events').events;
var listeners = function(eventBus, model) {

  eventBus.on(Events.profile.updateUsername, (evt, value) => {
    model.updateUsername(value);
  });

  eventBus.on(Events.profile.updatePassword, (evt, value) => {
    model.updatePassword(value);
  });
  eventBus.on(Events.profile.init, (evt) => {
    model.init();
  });
  eventBus.on(Events.profile.updateActiveStatus, (evt, custId, status) => {
    model.updateActiveStatus(custId, status);
  });

};

module.exports = listeners;
