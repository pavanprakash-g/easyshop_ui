var Events = require('../../context/events').events;
var listeners = function(eventBus, model) {

	eventBus.on(Events.order.getOrderDetails, (evt) => {
		model.getCartItems();
	});

	eventBus.on(Events.order.custDetails, (evt) => {
		model.getCustDetails();
	});

	eventBus.on(Events.order.saveAddress, (evt, id) => {
		model.saveAddress(id);
	});

	eventBus.on(Events.order.saveCard, (evt, id) => {
		model.saveCard(id);
	});
};

module.exports = listeners;