var App = require('../../context/events');
var React = require('react');
var AppBar = require('material-ui').AppBar;
var Paper = require('material-ui').Paper;
var Menu = require('material-ui').Menu;
var MenuItem = require('material-ui').MenuItem;
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

var EditProfile = React.createClass({
  login(){
    window.router.setRoute('/sign_in');
  },
  register(){
    window.router.setRoute('/register');
  },
  logout(){
    window.BUS.trigger(App.events.login.logout);
  },
  handle(menu){
    console.log('users');
  },
  render: function () {
  return (
  <div>
    <AppBar title="Easy Shop" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
    <div className='logout-button'>
      <RaisedButton label="Logout" primary={true} onClick={this.logout}/>
    </div>
    <div className='login-page'>
      <p className='tag-line'>  This is where the customer will see the list of items!</p>

    </div>
  </div>);
  }
});
module.exports = EditProfile;
