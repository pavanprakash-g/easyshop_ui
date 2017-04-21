var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var localStorage = require('localStorage');
var Context = require('./context/context');
var Application = require('./context/events');
var Router = require('director').Router;
var Routes = require('./routes.js');
var _ = require('underscore');
var loginDetails = "login.details";
var LoginView = require('./login/views/glue.jsx');
var ProfileView = require('./profile/views/glue.jsx');
var CatalogView = require('./catalog/views/glue.jsx');
var CartView = require('./cart/views/glue.jsx');
var OrderView = require('./order/views/glue.jsx');

/*Material*/
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/*const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});*/

const muiTheme = getMuiTheme({darkBaseTheme});

$(function() {
  var bus = $({});
  window.BUS = bus;
  window.storage = localStorage;
  window.baseURL = "http://localhost:7070/";
  bus.on(Application.events.initComplete, function(event, state) {
    var routingState = Routes(state);
    ReactDOM.render(React.createElement(App, _.defaults(routingState, state)), document.getElementById('app'));

    bus.on(Application.events.ui.route, function(evt, route){
      window.router.setRoute(route);
    });

    bus.on(Application.events.ui.alert, function(evt, msg, title, callback, buttonLabel = null){
      if(_.isEmpty(msg)) {
        return;
      }
      title = title || 'Info';
      callback = callback || null;
      navigator.notification ? navigator.notification.alert(msg, callback, title, buttonLabel) : alert(msg)
      if(!navigator.notification && callback){
        callback();
      }
    });

    bus.on(Application.events.ui.confirm, function(evt, msg, title, callback){
      title = title || 'Confirm your action';
      callback = callback || null;
      var res = confirm(msg);
      if(res){
        callback();
      }
    });


    bus.on(Application.events.ui.render, function(event, state) {
      routingState.state = state;
      ReactDOM.render(React.createElement(App, _.defaults({
        router: routingState.router,
        page: routingState.page,
        options: routingState.options
      }, state)), document.getElementById('app'));
    });
  });
  new Context(bus, localStorage);
});


var App = React.createClass({
  render: function() {
    var components = [];
    /*if(localStorage.getItem(loginDetails) == null && (this.props.page != "login" && this.props.page != "sign_in")){
      window.router.setRoute("/login");
    }

    if(localStorage.getItem(loginDetails) == null && (this.props.page == "login" || this.props.page == "sign_in")){
      window.router.setRoute("/profile");
    } */
    if (!this.props.authInfo.get('login').get('loggedIn') && this.props.page !== 'login' &&  this.props.page !== 'sign_in' 
      && this.props.page !== 'register' && this.props.page !== 'forgetPassword' && this.props.page !== 'forgetPasswordSuccess') {
        this.props.router.setRoute('/login');
        return (<div/>);
    }
  
  if(this.props.authInfo.get('login').get('loggedIn')  && (this.props.page === 'login' || this.props.page === 'sign_in')) {
    if(this.props.authInfo.get('login').get('isAdmin')){
      this.props.router.setRoute('/adminProfile');
    }else{
      this.props.router.setRoute('/home');
    }
    return (<div/>);
  }else {
    if (this.props.page === 'login' || this.props.page == "sign_in" || this.props.page === 'register' || 
      this.props.page === 'after_register' || this.props.page === 'forgetPassword' || this.props.page === 'forgetPasswordSuccess') {
      LoginView(components, this.props);
    }else if (this.props.page === 'adminProfile' || this.props.page === 'home' || this.props.page === 'editProfile' || this.props.page === 'usersList') {
      ProfileView(components, this.props);
    }else if (this.props.page === 'item' || this.props.page === 'itemDetails'){
      CatalogView(components, this.props);
    }else if (this.props.page === 'cart'){
      CartView(components, this.props);
    }else if (this.props.page === 'order' || this.props.page === 'ordersList' || this.props.page === 'custOrders' || this.props.page === 'addresses'){
      OrderView(components, this.props);
    }
}
return (
  <MuiThemeProvider muiTheme={muiTheme}>
  <div id="content" style={{fontFamily: 'sanfrancisco'}}>
  {components}
  </div>
  </MuiThemeProvider>
  )
}
});
