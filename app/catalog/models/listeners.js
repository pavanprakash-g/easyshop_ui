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

	eventBus.on(Events.catalog.deleteItem, (evt, id) => {
		model.deleteItem(id);
	});

	eventBus.on(Events.catalog.itemDetails, (evt, id) => {
		model.itemDetails(id);
	});

	eventBus.on(Events.catalog.itemDetails, (evt, id) => {
		model.addToCart(id);
	});
};

module.exports = listeners;