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

  cardExpYearChanged(value){
    window.BUS.trigger(App.events.register.cardExpYearChanged, [this.props.card.get('cardId'), value]);
  },

  render: function(){
    return(
      <div className='borderedDiv'>
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
        <p className='field-label'> Card Expiry Year: </p>
        <input className='field' placeholder="Card Expiry Year " className='field' value={this.props.card.get('cardExpYr')}
           onChange={(e) =>
        this.cardExpYearChanged(e.target.value)} />
      </div>
    </div>
    );
  }
});
module.exports = Card;