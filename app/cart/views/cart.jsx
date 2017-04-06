var App = require('../../context/events');
var React = require('react');
var AppBar = require('../../lib/app_bar.jsx');

var CartItem = React.createClass({
  deleteItem(){
    window.BUS.trigger(App.events.cart.deleteItem, [this.props.item.get('itemId')]);
  },
  reduceQuantity(){
    window.BUS.trigger(App.events.cart.reduceQuantity, [this.props.item.get('itemId')]);
  },
  increaseQuantity(){
    window.BUS.trigger(App.events.cart.increaseQuantity, [this.props.item.get('itemId')]);
  },
  render: function(){
      return (
        <div className="item">
          <div style={{float: 'right'}} >
            <img width='150px' height='100px' src={this.props.item.get('itemImage')} />
          </div>
          <div className='item-title'>{this.props.item.get('itemName')}</div>
          <p style={{color: 'gray'}}>PRICE: {this.props.item.get('itemPrice')}</p>
          <p style={{color: 'gray'}}>QUANTITY: {this.props.item.get('itemCount')}</p>
          <p style={{color: 'gray'}}><b>TOTAL PRICE: &nbsp; $ {this.props.item.get('totalPrice')} </b></p>
          <input type="button" value="-" style={{marginRight: '15px'}} onClick={this.reduceQuantity}/>
          <input type="button" value="+" style={{marginRight: '15px'}} onClick={this.increaseQuantity}/>
          <input type="button" value="Remove Item" onClick={this.deleteItem}/>
        </div>
      );
  }
});

var Cart = React.createClass({
  placeOrder(){
    window.BUS.trigger(App.events.cart.validateStock);
  },
  componentDidMount: function(){
    window.BUS.trigger(App.events.cart.getCartItems);
  },
  render: function () {
    var items = this.props.items.map(u => {
      return <CartItem item={u}/>;
    });
    return (
      <div>
        <div style={{position: 'fixed', width: '100%'}}>
        <AppBar />
        </div> 
        <div className='cart-container'>
          <div className="cart-items">
            {items}
          </div>
          <div className="cart-to-order">
            <div className="deliverable">
              <p style={{color: 'gray'}}>TOTAL DELIVERABLE ITEMS: {this.props.itemCount}</p>
              <p className='total-amt'>AMOUNT: &nbsp;$ {this.props.finalAmount}</p>
            </div>
            <div onClick={this.placeOrder} className="place-order">Place Order</div>
          </div>
        </div>
    </div>);
  }
});
module.exports = Cart;
