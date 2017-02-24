var App = require('../../context/events');
var React = require('react');

var Item = React.createClass({

  openUsersList(){
    window.router.setRoute('/usersList');
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
  var isUpdate = this.props.details.get('itemName') === undefined ? {display: 'none'}: {};
  var isInsert = this.props.details.get('itemName') === undefined ? {}: {display: 'none'};
  return (
  <div>
    <div className='appBar'> 
      <span className='homeButton'> <p onClick={this.home}>Home</p> </span>
      <span className='appBarButton'> <p onClick={this.openUsersList}>Users List</p> </span>
      <span className='logout-button'> <p onClick={this.logout}>Logout</p> </span>
    </div>
    <div>
      <div className='field-container'>
        <p className='field-label'> Item Name: </p>
        <input type='text' className='field' placeholder="First Name" value={this.props.details.get('itemName')}
          onChange={(e) => this.autoSave('itemName', e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Last Name: </p>
        <textarea className='field' placeholder="Item Description" value={this.props.details.get('itemDescription')}
           onChange={(e) => this.autoSave('itemDescription', e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Item price: </p>
        <input type='number' className='field' placeholder="Item Price" value={this.props.details.get('itemPrice')}
           onChange={(e) => this.autoSave('itemPrice', e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Item Quantity: </p>
        <input type='number' className='field' placeholder="Item Quantity" value={this.props.details.get('itemQuantity')}
           onChange={(e) => this.autoSave('itemQuantity', e.target.value)} />
      </div>
      <div style={isUpdate}>
        <div className='field-container'>
          <div className='btn' onClick={this.update}>Update</div>
        </div>
      </div>
      <div style={isInsert}>
        <div className='field-container'>
          <div className='btn' onClick={this.insert}>Insert</div>
        </div>
      </div>
    </div>
  </div>);
  }
});
module.exports = Item;
