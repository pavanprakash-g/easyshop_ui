var Events = require('../../context/events').events;

var listeners = function(eventBus, model) {

	eventBus.on(Events.test.firstNameChangedTest, (evt, value) => {
		model.firstNameChangedTest(value);
	});

};

module.exports = listeners;