var Events = require('../../context/events').events;
var listeners = function(eventBus, model) {

	eventBus.on(Events.catalog.getAllItems, (evt) => {
		model.getAllItems();
	});

	eventBus.on(Events.catalog.currentItem, (evt, value) => {
		model.setCurrentItem(value);
	});

	eventBus.on(Events.catalog.autoSave, (evt, id, value) => {
		model.autoSave(id, value);
	});

	eventBus.on(Events.catalog.updateItem, (evt) => {
		model.updateItem();
	});

	eventBus.on(Events.catalog.createItem, (evt) => {
		model.createItem();
	});
};

module.exports = listeners;