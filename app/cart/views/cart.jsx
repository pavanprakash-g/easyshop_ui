var App = require('../../context/events');
var React = require('react');

var CartItem = React.createClass({
  deleteItem(){
    window.BUS.trigger(App.events.catalog.deleteItem, [this.props.item.get('itemId')]);
    window.router.setRoute('/adminProfile');
  },
  render: function(){
      return (
        <div className="borderedDivNoInline">
          <div className="inline">
            <h1>{this.props.item.get('itemName')}</h1>
            <p><b>Price:</b> {this.props.item.get('itemPrice')}</p>
            <p><b>Quantity:</b> {this.props.item.get('itemCount')}</p>
            <p><b>Total Price:</b> {this.props.item.get('totalPrice')}</p>
          </div>
        </div>
      );
  }
});

var Cart = React.createClass({
  home(){
    window.router.setRoute('/login');
  },
  openProfile(){
    window.router.setRoute('/editProfile');
  },
  openCart(){
    window.router.setRoute('/cart');
  },
  logout(){
    window.BUS.trigger(App.events.login.logout);
  },
  componentDidMount: function(){
    window.BUS.trigger(App.events.cart.getCartItems);
  },
  render: function () {
    var finalAmount = 0;
    var itemCount = 0;
    var items = this.props.items.map(u => {
      finalAmount += u.get('totalPrice');
      itemCount += u.get('itemCount');
      return <CartItem item={u}/>;
    });
    return (
      <div>
        <div className='appBar'> 
          <span className='homeButton'> <p onClick={this.home}>Home</p> </span>
          <span className='appBarButton'> <p onClick={this.openProfile}>Edit Profile</p> </span>
          <span className='cartButton'> <p onClick={this.openCart}>Cart({this.props.cartCount})</p> </span>
          <span className='logout-button'> <p onClick={this.logout}>Logout</p> </span>
        </div>
        <div className="inline margin">
          {items}
        </div>
        <div className="inline total">
          <div className="borderedDivNoInline">
            <p><b>Number of Items deliverable:</b> {itemCount}</p>
            <p><b>Final amount:</b> {finalAmount}</p>
          </div>
        </div>
        <div className="alignRight">
          <div onClick={(e) => this.placeOrder} className="blackregister-btn">Place Order</div>
        </div>
        
    </div>);
  }
});
module.exports = Cart;
