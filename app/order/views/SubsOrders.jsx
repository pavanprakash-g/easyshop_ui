var App = require('../../context/events');
var AppBar = require('../../lib/app_bar.jsx'); 
var React = require('react');

var SubsOrders = React.createClass({
  confirmOrder(){

  },
  render: function () {
    return (
      <div className="borderedDiv1">
        <div onClick={this.confirmOrder} className="blackregister-btn addItemButton">Add Item</div>
      </div>);
  }
});
module.exports = SubsOrders;
