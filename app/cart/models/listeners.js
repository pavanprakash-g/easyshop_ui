var Events = require('../../context/events').events;
var listeners = function(eventBus, model) {

	eventBus.on(Events.cart.getCartItems, (evt) => {
		model.getCartItems();
	});

	eventBus.on(Events.cart.deleteItem, (evt, id) => {
		model.deleteItem(id);
	});

	eventBus.on(Events.cart.reduceQuantity, (evt, id) => {
		model.reduceQuantity(id);
	});

	eventBus.on(Events.cart.validateStock, (evt) => {
		model.validateStock();
	});
};

module.exports = listeners;