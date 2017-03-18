var App = require('../../context/events');
var React = require('react');
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

var UsersList = React.createClass({
  logout(){
    window.BUS.trigger(App.events.login.logout);
  },
  home(){
    window.router.setRoute('/adminProfile');
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
    <div className='appBar'> 
      <span className='homeButton'> <p onClick={this.home}>Home</p> </span>
      <span className='appBarButton'> <p onClick={this.openUsersList}>Users List</p> </span>
      <span className='appBarButton'> <p onClick={this.cart}>cart</p> </span>
      <span className='logout-button'> <p onClick={this.logout}>Logout</p> </span>
    </div>
    <div>
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
   </div>
  </div>);
  }
});
module.exports = UsersList;
