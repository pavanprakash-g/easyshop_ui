var App = require('../../context/events');
var React = require('react');
var Paper = require('material-ui').Paper;
var Menu = require('material-ui').Menu;
var MenuItem = require('material-ui').MenuItem;
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

var Home = React.createClass({
  login(){
    window.router.setRoute('/sign_in');
  },
  register(){
    window.router.setRoute('/register');
  },
  logout(){
    window.BUS.trigger(App.events.login.logout);
  },
  openProfile(){
    window.router.setRoute('/editProfile');
  },
  handle(menu){
    console.log('users');
  },
  render: function () {
  return (
  <div>
    <div className='appBar'> 
      <span className='appBarButton'> <p onClick={this.openProfile}>Edit Profile</p> </span>
      <span className='logout-button'> <p onClick={this.logout}>Logout</p> </span>
    </div>
    <div className='login-page'>
      <p className='tag-line'>  This is where the customer will see the list of items!</p>

    </div>
  </div>);
  }
});
module.exports = Home;
