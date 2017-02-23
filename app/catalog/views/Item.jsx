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
  render: function () {
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
          onChange={(e) => this.firstNameChanged(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Last Name: </p>
        <input type='text' className='field' placeholder="Last Name" value={this.props.details.get('custLastName')}
           onChange={(e) => this.lastNameChanged(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Mail Id: </p>
        <input type='mail' className='field' placeholder="Mail Id" value={this.props.details.get('custEmailid')}
           onChange={(e) => this.emailIdChanged(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Contact Number: </p>
        <input className='field' placeholder="Contact Number" value={this.props.details.get('custPhoneNumber')}
           onChange={(e) => this.phoneNumberChanged(e.target.value)} />
      </div>
    </div>
  </div>);
  }
});
module.exports = Item;
