var App = require('../../context/events');
var React = require('react');

var ItemDetails = React.createClass({

  openProfile(){
    window.router.setRoute('/editProfile');
  },
  home(){
    window.router.setRoute('/login');
  },
  logout(){
    window.BUS.trigger(App.events.login.logout);
  },
  autoSave(id, value){
    window.BUS.trigger(App.events.catalog.autoSave, [id, value]);
  },
  update(){
    window.BUS.trigger(App.events.catalog.updateItem);
    window.history.back();
  },
  insert(){
    window.BUS.trigger(App.events.catalog.createItem);
    window.router.setRoute('/adminProfile');
  },
  render: function () {
  this.props.details.get('itemName');
  return (
  <div>
    <div className='appBar'> 
      <span className='homeButton'> <p onClick={this.home}>Home</p> </span>
      <span className='appBarButton'> <p onClick={this.openProfile}>Edit Profile</p> </span>
      <span className='logout-button'> <p onClick={this.logout}>Logout</p> </span>
    </div>
    <div>
      <div id="leftCol">
        <img src={this.props.details.get('itemImage')} />
      </div>
      <div id="centerCol">
        <span>{this.props.details.get('itemName')}</span>
      </div>
      <div id="rightCol">
        <img src={this.props.details.get('itemImage')} />
      </div>
    </div>
  </div>);
  }
});
module.exports = ItemDetails;
