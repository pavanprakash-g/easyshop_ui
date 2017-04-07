var Events = require('../../context/events').events;
var listeners = function(eventBus, model) {

	eventBus.on(Events.order.getOrderDetails, (evt) => {
		model.getCartItems();
	});

	eventBus.on(Events.order.custDetails, (evt, itemCount, finalAmount, items) => {
		model.getCustDetails(itemCount, finalAmount, items);
	});

	eventBus.on(Events.order.saveShippingAddress, (evt, id) => {
		model.saveShippingAddress(id);
	});

	eventBus.on(Events.order.saveBillingAddress, (evt, id) => {
		model.saveBillingAddress(id);
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

	eventBus.on(Events.order.addressById, (evt, id) => {
		model.addressById(id);
	});

	eventBus.on(Events.order.custOrdersList, (evt) => {
		model.custOrders();
	});

	eventBus.on(Events.order.changeStatus, (evt, orderId, status) => {
		model.changeStatus(orderId, status);
	});

	eventBus.on(Events.order.changeItemStatus, (evt, orderId, itemId, status) => {
		model.changeItemStatus(orderId, itemId, status);
	});

	eventBus.on(Events.order.approveReturn, (evt, orderId, itemId, status) => {
		model.approveReturn(orderId, itemId, status);
	});
	
};

module.exports = listeners;