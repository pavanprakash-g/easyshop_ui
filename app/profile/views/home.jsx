var App = require('../../context/events');
var React = require('react');
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
var AppBar = require('../../lib/app_bar.jsx');

var Home = React.createClass({
  openItem(itemId){
    window.BUS.trigger(App.events.catalog.itemDetails, [itemId, this.props.routingOpts]);
  },
  componentDidMount: function(){
    window.BUS.trigger(App.events.catalog.getAllItems);
  },
  render: function () {
  var GridTiles = this.props.items.map(u => {
     return <GridTile
          key={u.get('itemId')}
          title={u.get('itemName')}
          actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)" > 
          <img src={u.get('itemImage')} style={{height:'190px'}} onClick={(e) => this.openItem(u.get('itemId'))}/> </GridTile>;
  });
  return (
  <div style={{height: '100%', overflowY: 'auto'}}>
    <AppBar />
    <div >
        <GridList  cols={3.5}>
          {GridTiles}
        </GridList>
    </div>
  </div>);
  }
});
module.exports = Home;
