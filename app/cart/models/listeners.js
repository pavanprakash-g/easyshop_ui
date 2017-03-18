var Events = require('../../context/events').events;
var listeners = function(eventBus, model) {

	eventBus.on(Events.cart.getCartItems, (evt) => {
		model.getCartItems();
	});
};

module.exports = listeners;