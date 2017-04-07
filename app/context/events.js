var App = {
	events: {
		login: {
			perform: 'app::login::perform',
			updateUsername: 'app::login::updateUsername',
			updatePassword: 'app::login::updatePassword',
			forgetPassword: 'app::login::forgetPassword',
			updateSecurityQuesAns: 'app::login::updateSecurityQuesAns',
			logout: 'app::login::updateSecurityQuesAns'
		},
		forgetPassword: {
			perform: 'app::forgetPassword::perform',
			newPasswordChanged: 'app::forgetPassword::newPasswordChanged',
			confirmPasswordChanged: 'app::forgetPassword::confirmPasswordChanged'
		},
		profile: {
			init: 'app::profile::init',
			perform: 'app::profile::perform',
			updateUsername: 'app::profile::updateUsername',
			updatePassword: 'app::profile::updatePassword',
			updateActiveStatus: 'app::profile::updateActiveStatus'
		},
		models: {
			changed: 'app::models_changed'
		},
		initComplete: 'app::initComplete',
		ui: {
			render: 'app::state_changed',
			route: 'app::ui::route(route)',
			alert: 'app::ui::alert',
			confirm: 'app::ui::confirm'
		},
		register: {
		    perform: 'app::register::perform',
		    update: 'app::register::update',
		    autoSave: 'app::register::autoSave',
		    custDetails: 'app::register::custDetails',
            firstNameChanged: 'app::register::firstNameChanged',
            lastNameChanged: 'app::register::lastNameChanged',
            emailIdChanged: 'app::register::emailIdChanged',
            passwordChanged: 'app::register::passwordChanged',
            phoneNumberChanged: 'app::register::phoneNumberChanged',
            address1Changed: 'app::register::address1Changed',
            address2Changed: 'app::register::address2Changed',
            cityChanged: 'app:register::cityChanged',
            stateChanged: 'app:register::stateChanged',
            zipCodeChanged: 'app:register::zipCodeChanged',
            securityQuesAnsChanged: 'app:register::securityQuesAnsChanged',
            countryChanged: 'app::register::countryChanged',
            addrPhoneNumberChanged: 'app::register::addrPhoneNumberChanged',
            updateAddress: 'app::register::updateAddress',
            cardNumChanged: 'app::register::cardNumChanged',
            cardCvvChanged: 'app::register::cardCvvChanged',
            cardExpMonChanged: 'app::register::cardExpMonChanged',
            updateCard: 'app::register::updateCard',
            cardExpYrChanged: 'app::register::cardExpYrChanged'
		},
		catalog: {
			getAllItems: 'app::catalog::getAllItems',
			currentItem: 'app::catalog::currentItem',
			autoSave: 'app::catalog::autoSave',
			updateItem: 'app::catalog::updateItem',
			createItem: 'app::catalog::createItem',
			deleteItem: 'app::catalog::deleteItem',
			itemDetails: 'app::catalog::itemDetails',
			addToCart: 'app::catalog::addToCart'
		},
		cart: {
			getCartItems: 'app::cart::getCartItems',
			deleteItem: 'app::cart::deleteItem',
			reduceQuantity: 'app::cart::reduceQuantity',
			increaseQuantity: 'app::cart::increaseQuantity',
			validateStock: 'app::cart::validateStock'
		},
		order: {
			getOrderItems: 'app::order::getOrderItems',
			custDetails: 'app::order::custDetails',
			saveAddress: 'app::order::saveAddress',
			saveCard: 'app::order::saveCard',
			createOrder: 'app::order::createOrder',
			ordersListAdmin: 'app::order::ordersListAdmin',
			custOrdersList: 'app::order::custOrdersList',
			changeStatus: 'app::order::changeStatus',
			addressById: 'app::order::addressById',
			changeItemStatus: 'app::order::changeItemStatus',
			saveShippingAddress: 'app::order::saveShippingAddress',
			saveBillingAddress: 'app::order::saveBillingAddress',
			approveReturn: 'app::order::approveReturn'
		}
	}
};

module.exports = App;
