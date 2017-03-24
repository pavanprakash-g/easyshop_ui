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
  render: function(){
      return (
        <div className="borderedDivNoInline">
          <div className="inline">
            <h1>{this.props.item.get('itemName')}</h1>
            <p><b>Price:</b> {this.props.item.get('itemPrice')}</p>
            <p><b>Quantity:</b> {this.props.item.get('itemCount')}</p>
            <p><b>Total Price:</b> {this.props.item.get('totalPrice')}</p>
            <input type="button" value="Reduce Quantity" onClick={this.reduceQuantity}/>
            &nbsp;<input type="button" value="Remove Item" onClick={this.deleteItem}/>
          </div>
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
        <AppBar />
        <div className="inline margin">
          {items}
        </div>
        <div className="inline total">
          <div className="borderedDivNoInline">
            <p><b>Number of Items deliverable:</b> {this.props.itemCount}</p>
            <p><b>Final amount:</b> {this.props.finalAmount}</p>
          </div>
        </div>
        <div className="alignRight">
          <div onClick={this.placeOrder} className="blackregister-btn">Place Order</div>
        </div>
        
    </div>);
  }
});
module.exports = Cart;
