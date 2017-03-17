var App = require('../../context/events');
var React = require('react');
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

var Home = React.createClass({

  home(){
    window.router.setRoute('/login');
  },
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
  openItem(itemId){
    window.BUS.trigger(App.events.catalog.itemDetails, [itemId]);
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
          <img src={u.get('itemImage')} onClick={(e) => this.openItem(u.get('itemId'))}/> </GridTile>;
  });
  return (
  <div>
    <div className='appBar'> 
      <span className='homeButton'> <p onClick={this.home}>Home</p> </span>
      <span className='appBarButton'> <p onClick={this.openProfile}>Edit Profile</p> </span>
      <span className='logout-button'> <p onClick={this.logout}>Logout</p> </span>
    </div>
    <div>
        <GridList  cols={3.6}>
          {GridTiles}
        </GridList>
    </div>
  </div>);
  }
});
module.exports = Home;
