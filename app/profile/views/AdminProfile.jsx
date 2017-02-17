var App = require('../../context/events');
var React = require('react');
var AppBar = require('material-ui').AppBar;
var Paper = require('material-ui').Paper;
var Menu = require('material-ui').Menu;
var MenuItem = require('material-ui').MenuItem;
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';

var TableData = React.createClass({
  getInitialState(){
    return {Toggled: this.props.user.get('activeStatus')};
  },
  handleToggle(){
    this.setState({Toggled: !this.state.Toggled});
    var status = !this.state.Toggled ? true : false ;
    var activeStatus = status ? 'activate' : 'Inactivate' ;
    var confirmMsg = "Do you want to " + activeStatus + ' customer #' + this.props.user.get('custId') + '?' ;
    window.BUS.trigger(App.events.ui.confirm, [confirmMsg , 'Status Update', () => {
      window.BUS.trigger(App.events.profile.updateActiveStatus, [this.props.user.get('custId'),status]);
    }]);
  },
  render: function(){
      return (
        <TableRow>
          <TableRowColumn>{this.props.user.get('custId')}</TableRowColumn>
          <TableRowColumn>{this.props.user.get('custFirstName')}</TableRowColumn>
          <TableRowColumn>{this.props.user.get('custEmailid')}</TableRowColumn>
          <TableRowColumn>{this.props.user.get('custContactNum')}</TableRowColumn>
          <TableRowColumn><Toggle defaultToggled={this.props.user.get('activeStatus')}
              onToggle={this.handleToggle.bind(this)} /></TableRowColumn>
      </TableRow>
      );
  }
});

var AdminProfile = React.createClass({
  logout(){
    window.BUS.trigger(App.events.login.logout);
  },
  componentDidMount: function(){
    window.BUS.trigger(App.events.profile.init);
	},
  render: function () {
    var tableRows = this.props.details.map(u => {
      return <TableData user={u}/>;
    });
  return (
  <div>
    <AppBar title="Easy Shop" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
    <div className='logout-button'>
      <RaisedButton label="Logout" primary={true} onClick={this.logout}/>
    </div>
    <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>Customer ID</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>EmailId</TableHeaderColumn>
        <TableHeaderColumn>Contact Number</TableHeaderColumn>
        <TableHeaderColumn>Status</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      {tableRows}
    </TableBody>
   </Table>
  </div>);
  }
});
module.exports = AdminProfile;
