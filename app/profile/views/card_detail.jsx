var App = require('../../context/events');
var React = require('react');
var AppDefaults = require('../../lib/app_defaults');
var Loader = require('react-loader');
var _ = require('underscore');
var classnames = require('classnames');

var Card = React.createClass({

cardNumChanged(value){
    window.BUS.trigger(App.events.register.cardNumChanged, [this.props.card.get('cardId'), value]);
  },
  cardCvvChanged(value){
    window.BUS.trigger(App.events.register.cardCvvChanged, [this.props.card.get('cardId'), value]);
  },
  cardExpMonChanged(value){
    window.BUS.trigger(App.events.register.cardExpMonChanged, [this.props.card.get('cardId'), value]);
  },
  cardExpYrChanged(value){
    window.BUS.trigger(App.events.register.cardExpYrChanged, [this.props.card.get('cardId'), value]);
  },
  updateCard(){
    window.BUS.trigger(App.events.register.updateCard, [this.props.card.get("cardId")]);
  },

  render: function(){
    return(
    <div>
      <div className='field-container'>
        <p className='field-label'> Card Number: </p>
        <input type='number' className='field' placeholder="Card Number" value={this.props.card.get('cardNumber')}
           onChange={(e) => this.cardNumChanged(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Card CVV: </p>
        <input className='field' placeholder="Card CVV" className='field' value={this.props.card.get('cardCvv')}
           onChange={(e) =>
        this.cardCvvChanged(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Card Expiry Month: </p>
        <input className='field' placeholder="Card Expiry Month " className='field' value={this.props.card.get('cardExpMon')}
           onChange={(e) =>
        this.cardExpMonChanged(e.target.value)} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Card Expiry Yr: </p>
        <input className='field' placeholder="Card Expiry Yr " className='field' value={this.props.card.get('cardExpYr')}
           onChange={(e) =>
        this.cardExpYrChanged(e.target.value)} />
      </div>
      <div className='field-btn' onClick={this.register}> UPDATE </div>
    </div>
    );
  }
});
module.exports = Card;