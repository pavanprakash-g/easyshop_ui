var App = require('../../context/events');
var React = require('react');
var AppDefaults = require('../../lib/app_defaults');
var Loader = require('react-loader');
var AppBar = require('../../lib/app_bar.jsx');
var moment = require('moment');

var Message = React.createClass({
  markRead(){
    if(!this.props.message.get('read'))
      window.BUS.trigger(App.events.messages.markRead, [this.props.message.get('messageId')]);
  },
  render: function () {
    var readStatus = this.props.message.get('read') ? 'msg-read' : '' ;
    var readIconVisible = this.props.message.get('read') ? '' : 'hidden';
  return (
    <div className={`message ${readStatus}`} onClick={this.markRead}>
      <span className='fa fa-comment msg-icon' />
      <p className='msg-content'>{this.props.message.get('messageContent')}</p>
      <div className='date-container'>
        <span className='msg-datetime'>{moment(this.props.message.get('messageTime')).format('DD-MMM-YY, hh:mm:ss A')} </span>
        <span className={'fa fa-check-square-o read-tick '+readIconVisible} />
      </div>
    </div>);
  }
});
var Messages = React.createClass({
  componentDidMount: function(){
    window.BUS.trigger(App.events.messages.getMessages);
  },
  render: function () {
    var messages = this.props.messages.map(message => {
      return <Message message={message} key={message.get('messageId')} />
    });
  return (
  <div>
    <AppBar />
    <div className='messages-container'>
      {messages}
    </div>
  </div>);
  }
});
module.exports = Messages;
