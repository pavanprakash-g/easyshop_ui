var Events = require('../../context/events').events;
var listeners = function(eventBus, model) {

	eventBus.on(Events.subscription.addSubrOrder, () => {
		model.addSubrOrder();
	});
	eventBus.on(Events.subscription.addItem, (e, orderId, item) => {
		model.addItem(orderId, item);
	});
	eventBus.on(Events.subscription.removeItem, (e, orderId, item) => {
		model.removeItem(orderId, item);
	});
	eventBus.on(Events.subscription.subscribe, (e, order) => {
		model.subscribe(order);
	});
	eventBus.on(Events.subscription.getOrders, () => {
		model.getOrders();
	})
	eventBus.on(Events.subscription.autoSave, (e, orderId, element, value) => {
		model.autoSave(orderId, element, value);
	})
	eventBus.on(Events.subscription.resetSubscriptionsList, () => {
		model.resetSubscriptionsList();
	})
	eventBus.on(Events.subscription.deleteOrder, (e, orderId) => {
		model.deleteOrder(orderId);
	})
	eventBus.on(Events.subscription.itemCountChanged, (e, orderId, itemId, itemCount) => {
		model.itemCountChanged(orderId, itemId, itemCount);
	})
	
};

module.exports = listeners;