var Router = require('director').Router;
var React = require('react');
var ReactDOM = require('react-dom');
var Application = require('./context/events');

var Routes = function(state) {
    var routingState = {
      page: 'login',
      state: null,
      router: null,
      options: {}
    };

    var routes = {
      '/login': function() {
        routingState.page = 'login';
        window.BUS.trigger(Application.events.ui.render, routingState.state);
      },
      '/sign_in': function() {
        routingState.page = 'sign_in';
        window.BUS.trigger(Application.events.ui.render, routingState.state);
      },
      '/register': function() {
        routingState.page = 'register';
        window.BUS.trigger(Application.events.ui.render, routingState.state);
      },
      '/after_register': function() {
        routingState.page = 'after_register';
        window.BUS.trigger(Application.events.ui.render, routingState.state);
      },
      '/forgetPasswordSuccess': function() {
         routingState.page = 'forgetPasswordSuccess';
         window.BUS.trigger(Application.events.ui.render, routingState.state);
      },
      '/forgetPassword': function() {
        routingState.page = 'forgetPassword';
        window.BUS.trigger(Application.events.ui.render, routingState.state);
      },
      '/adminProfile': function() {
        routingState.page = 'adminProfile';
        window.BUS.trigger(Application.events.ui.render, routingState.state);
      },
      '/usersList': function() {
        routingState.page = 'usersList';
        window.BUS.trigger(Application.events.ui.render, routingState.state);
      },
      '/home': function() {
        routingState.page = 'home';
        window.BUS.trigger(Application.events.ui.render, routingState.state);
      },
      '/editProfile': function() {
        routingState.page = 'editProfile';
        window.BUS.trigger(Application.events.ui.render, routingState.state);
      },
      '/item': function() {
        routingState.page = 'item';
        window.BUS.trigger(Application.events.ui.render, routingState.state);
      },
      '/itemDetails': function() {
        routingState.page = 'itemDetails';
        window.BUS.trigger(Application.events.ui.render, routingState.state);
      },
      '/cart': function() {
        routingState.page = 'cart';
        window.BUS.trigger(Application.events.ui.render, routingState.state);
      },
      '/order': function() {
        routingState.page = 'order';
        window.BUS.trigger(Application.events.ui.render, routingState.state);
      },
      '/ordersList': function() {
        routingState.page = 'ordersList';
        window.BUS.trigger(Application.events.ui.render, routingState.state);
      },
      '/custOrders': function() {
        routingState.page = 'custOrders';
        window.BUS.trigger(Application.events.ui.render, routingState.state);
      }
    };

    window.router = Router(routes);
    router.init('/login');
    routingState.router = router;
    routingState.state = state;
    return routingState;
};

module.exports = Routes;
