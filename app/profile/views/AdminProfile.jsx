var App = require('../../context/events');
var React = require('react');
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

var TableData = React.createClass({
  editItem(){
    window.BUS.trigger(App.events.catalog.currentItem, [this.props.item.toJS()]);
    window.router.setRoute('/item');
  },
  render: function(){
      return (
        <TableRow>
          <TableRowColumn><p onClick={this.editItem}>Edit</p></TableRowColumn>
          <TableRowColumn>{this.props.item.get('itemId')}</TableRowColumn>
          <TableRowColumn>{this.props.item.get('itemName')}</TableRowColumn>
      </TableRow>
      );
  }
});

var AdminProfile = React.createClass({
  usersList(){
    window.router.setRoute('/usersList');
  },
  logout(){
    window.BUS.trigger(App.events.login.logout);
  },
  openPage(){
    window.router.setRoute('/item');
  },
  componentDidMount: function(){
    window.BUS.trigger(App.events.catalog.getAllItems);
	},
  render: function () {
  var tableRows = this.props.items.map(u => {
      return <TableData item={u}/>;
  });
  return (
  <div>
    <div className='appBar'> 
      <span className='homeButton'> <p onClick={this.home}>Home</p> </span>
      <span className='appBarButton'> <p onClick={this.usersList}>Users List</p> </span>
      <span className='logout-button'> <p onClick={this.logout}>Logout</p> </span>
    </div>
    <div className='field-container'>
      <input type='button' value='create' onClick={this.openPage} />
    </div> 
    <div>
      <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>Edit</TableHeaderColumn>
          <TableHeaderColumn>Item Id</TableHeaderColumn>
          <TableHeaderColumn>Item Name</TableHeaderColumn>
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
module.exports = AdminProfile;
