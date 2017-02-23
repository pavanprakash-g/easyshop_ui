var Events = require('../../context/events').events;
var listeners = function(eventBus, model) {

	eventBus.on(Events.catalog.getAllItems, (evt) => {
		model.getAllItems();
	});

	eventBus.on(Events.catalog.currentItem, (evt, value) => {
		model.setCurrentItem(value);
	});
};

module.exports = listeners;