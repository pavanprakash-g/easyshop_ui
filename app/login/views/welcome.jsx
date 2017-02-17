var App = require('../../context/events');
var React = require('react');
var AppDefaults = require('../../lib/app_defaults');
var Loader = require('react-loader');
var _ = require('underscore');
var classnames = require('classnames');

var Welcome = React.createClass({
  render: function () {
  return (
  <div style={{textAlign: 'center'}}>
    <p style={{color: 'cadetblue', fontWeight: 'bold', fontSize: '1.5rem'}}> Welcome To pijo </p>
  </div>);
  }
});
module.exports = Welcome;
