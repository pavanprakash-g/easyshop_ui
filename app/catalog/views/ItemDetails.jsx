var App = require('../../context/events');
var React = require('react');
var AppDefaults = require('../../lib/app_defaults');
var Loader = require('react-loader');

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
  openCart(){
    window.router.setRoute('/cart');
  },
  addToCart(itemId){
    window.BUS.trigger(App.events.catalog.addToCart, [itemId]);
  },
  render: function () {
  return (
  <div>
    <div className='appBar'> 
      <span className='homeButton'> <p onClick={this.home}>Home</p> </span>
      <span className='appBarButton'> <p onClick={this.openProfile}>Edit Profile</p> </span>
      <span className='cartButton'> <p onClick={this.openCart}>Cart({this.props.cartCount})</p> </span>
      <span className='logout-button'> <p onClick={this.logout}>Logout</p> </span>
    </div>
    <div className='multipleColumn'>
      <div id="leftCol">
        <img src={this.props.details.get('itemImage')} />
      </div>
      <div id="centerCol">
        <h1><span>{this.props.details.get('itemName')}</span></h1>
        <p>{this.props.details.get('itemDescription')}</p>
        <hr/>
        <p>$ {this.props.details.get('itemPrice')}</p>
        <div className='normal-btn' onClick={(e) => this.addToCart(this.props.details.get('itemId'))}>Add to cart</div>
        <p>{this.props.details.get('itemDescription')}</p>
      </div>
      <div id="rightCol">
        
      </div>
    </div>
  </div>);
  }
});
module.exports = ItemDetails;
