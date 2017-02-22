var App = require('../../context/events');
var React = require('react');

var ItemCreate = React.createClass({
  openUsersList(){
    window.router.setRoute('/usersList');
  },
  home(){
    window.router.setRoute('/login');
  },
  logout(){
    window.BUS.trigger(App.events.login.logout);
  },
  itemCreatePage(){
    window.router.setRoute('/itemCreate');
  },
  render: function () {
  return (
  <div>
    <div className='appBar'> 
      <span className='homeButton'> <p onClick={this.home}>Home</p> </span>
      <span className='logout-button'> <p onClick={this.logout}>Logout</p> </span>
      <span className='appBarButton'> <p onClick={this.openUsersList}>Users List</p> </span>
    </div>
  </div>);
  }
});
module.exports = ItemCreate;
