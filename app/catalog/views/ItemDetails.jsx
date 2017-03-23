var App = require('../../context/events');
var React = require('react');
var AppDefaults = require('../../lib/app_defaults');
var Loader = require('react-loader');
var AppBar = require('../../lib/app_bar.jsx');

var ItemDetails = React.createClass({
  getInitialState(){
    return {
      count: 0
    };
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
  addToCart(itemId){
    const {count} = this.state;
    this.setState({count: count + 1});
    window.BUS.trigger(App.events.catalog.addToCart, [itemId]);
  },
  render: function () {
    var totalQuantity = this.props.details.get('itemQuantity');
    var availableQuantity = totalQuantity - this.state.count; 
    var addToCartStyle = totalQuantity >= 1 && availableQuantity >=1 ? false : true;
  return (
  <div>
    <AppBar />
    <div className='multipleColumn'>
      <div id="leftCol">
        <img src={this.props.details.get('itemImage')} />
      </div>
      <div id="centerCol">
        <h1><span>{this.props.details.get('itemName')}</span></h1>
        <p>{this.props.details.get('itemDescription')}</p>
        <hr/>
        <p>$ {this.props.details.get('itemPrice')}</p>
        <input disabled={addToCartStyle} className='normal-btn' onClick={(e) => this.addToCart(this.props.details.get('itemId'))} value="Add to cart" />
        <p>{this.props.details.get('itemDescription')}</p>
      </div>
      <div id="rightCol">
        
      </div>
    </div>
  </div>);
  }
});
module.exports = ItemDetails;
