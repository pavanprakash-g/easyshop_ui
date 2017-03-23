var Events = require('../../context/events').events;
var listeners = function(eventBus, model) {

	eventBus.on(Events.order.getOrderDetails, (evt) => {
		model.getCartItems();
	});

	eventBus.on(Events.order.custDetails, (evt, itemCount, finalAmount, items) => {
		model.getCustDetails(itemCount, finalAmount, items);
	});

	eventBus.on(Events.order.saveAddress, (evt, id) => {
		model.saveAddress(id);
	});

	eventBus.on(Events.order.saveCard, (evt, id) => {
		model.saveCard(id);
	});

	eventBus.on(Events.order.createOrder, (evt, id) => {
		model.createOrder(id);
	});
	eventBus.on(Events.order.ordersListAdmin, (evt) => {
		model.ordersListAdmin();
	});
	
};

module.exports = listeners;