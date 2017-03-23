var App = require('../../context/events');
var React = require('react');
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
var AppBar = require('../../lib/app_bar.jsx');

var TableData = React.createClass({
  editItem(){
    window.BUS.trigger(App.events.catalog.currentItem, [this.props.item.toJS()]);
    window.router.setRoute('/item');
  },
  deleteItem(){
    window.BUS.trigger(App.events.catalog.deleteItem, [this.props.item.get('itemId')]);
    window.router.setRoute('/adminProfile');
  },
  render: function(){
      return (
        <TableRow>
          <TableRowColumn><p onClick={this.editItem}>Edit</p></TableRowColumn>
          <TableRowColumn><p onClick={this.deleteItem}>Delete</p></TableRowColumn>
          <TableRowColumn>{this.props.item.get('itemId')}</TableRowColumn>
          <TableRowColumn>{this.props.item.get('itemName')}</TableRowColumn>
      </TableRow>
      );
  }
});

var AdminProfile = React.createClass({
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
    <AppBar />
    <div className='field-container'>
      <input type='button' value='create' onClick={this.openPage} />
    </div> 
    <div>
      <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>Edit</TableHeaderColumn>
          <TableHeaderColumn>Delete</TableHeaderColumn>
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
