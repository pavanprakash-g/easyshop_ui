var React = require('react');
var AppBar = require('material-ui').AppBar;

var Login = React.createClass({
  login(){
    window.router.setRoute('/sign_in');
  },
  register(){
    window.router.setRoute('/register');
  },
  render: function () {
  return (
  <div>
  <div className='home-page' style={{textAlign: 'left', paddingLeft: '7rem'}}>
    <div style={{paddingTop: '7%'}}/>
    <p className='tag-line' style={{marginLeft: '10rem', fontSize: '2.5rem'}}> EASY SHOP </p>
    <p className='tag-line'>  The most fulfilling Shopping Experience!</p>
    <div className='login-container'>
      <p className='content'> Stay home and SHOP ONLINE. You are too pretty to have look for a parking spot. </p>
      <div className='btn-container'>
        <div className='btn' style={{marginRight: '5%'}} onClick={this.login}> LOG IN </div>
        <div className='btn' onClick={this.register}> SIGN UP </div>
      </div>
    </div>
  </div>
  </div>);
  }
});
module.exports = Login;
