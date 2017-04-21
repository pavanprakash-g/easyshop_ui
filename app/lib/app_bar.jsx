var App = require('./../context/events');
var React = require('react');
var Loader = require('react-loader');

var AppBar = React.createClass({
  openProfile(){
    window.router.setRoute('/editProfile');
  },
  home(){
    window.router.setRoute('/login');
  },
  logout(){
    window.BUS.trigger(App.events.login.logout);
  },
  openCart(){
    window.router.setRoute('/cart');
  },
  usersList(){
    window.router.setRoute('/usersList');
  },
  ordersList(){
  window.router.setRoute('/ordersList');
  },
  custOrder(){
    window.BUS.trigger(App.events.subscription.resetSubscriptionsList);
    window.router.setRoute('/orders/regular');
  },
  openMessages(){
    window.router.setRoute('/messages');
  },
  render: function () {
    var is_admin = window.storage.is_admin ? JSON.parse(window.storage.is_admin) : false;
    var profileEditVisible = is_admin ? 'hidden' : '';
    var cartVisible = is_admin ? 'hidden' : '';
    var messageVisible = is_admin ? 'hidden' : '';
    var usersListVisible = is_admin ? '' : 'hidden';
    var orderListVisible = is_admin ? '' : 'hidden';
    var custOrderVisible = is_admin ? 'hidden' : '';
    var adminStyle = is_admin ? {top: '10px'} : {};
    return (
    <div className='app-bar'> 
      <div className='home-button fa fa-home' onClick={this.home}> Easyshop </div>
      <div className='tool-bar' style={adminStyle}>
        <div className={'profile-edit fa fa-pencil '+profileEditVisible} onClick={this.openProfile}> Profile </div>
        <div className={'cart fa fa-shopping-cart '+cartVisible} onClick={this.openCart}> 
          <span className='cart-count'> {window.storage.cartCount} </span>
        </div>
        <div className={'cart fa fa-comments '+messageVisible} onClick={this.openMessages}> 
          <span className='cart-count'> {window.storage.messageCount} </span>
        </div>
        <div className={'tool-bar-item fa fa-users '+usersListVisible} onClick={this.usersList} />
        <div className={'tool-bar-item fa fa-shopping-bag '+orderListVisible} onClick={this.ordersList} />
        <div className={'tool-bar-item fa fa-shopping-bag '+custOrderVisible} onClick={this.custOrder} />

        <div className='tool-bar-item fa fa-power-off' onClick={this.logout}/>
      </div>
    </div>);
  }
});
module.exports = AppBar;
