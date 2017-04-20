var App = require('../../context/events');
var React = require('react');
var AppDefaults = require('../../lib/app_defaults');
var Loader = require('react-loader');
var _ = require('underscore');
var classnames = require('classnames');

var Card = React.createClass({
  updateCard(){
    if(this.props.card.get('is_synced') === false)
      window.BUS.trigger(App.events.register.cards.submitCard, [this.props.card.get("cardId")]);
    else
      window.BUS.trigger(App.events.register.cards.updateCard, [this.props.card.get("cardId")]);
  },
  deleteCard(){
    window.BUS.trigger(App.events.register.cards.deleteCard, [this.props.card.get("cardId")]);
  },
  render: function(){
    var btnLabel = this.props.card.get('is_synced') === false ? 'SAVE NEW CARD' : 'UPDATE CARD';
    return(
    <div className='address-container'>
     <span className='fa fa-trash addr-del' onClick={this.deleteCard}/>
     <div style={{padding: '20px 10px'}}>
      <div className='field-container'>
        <p className='field-label'> Card Number: </p>
        <input type='number' className='field' placeholder="Card Number" value={this.props.card.get('cardNumber')}
           onChange={(e) => window.BUS.trigger(App.events.register.cards.autoSave, [this.props.card.get('cardId'), 'cardNumber', e.target.value])} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Card CVV: </p>
        <input className='field' placeholder="Card CVV" className='field' value={this.props.card.get('cardCvv')}
           onChange={(e) =>
        window.BUS.trigger(App.events.register.cards.autoSave, [this.props.card.get('cardId'), 'cardCvv', e.target.value])} />
      </div>
      <div className='field-container'>
        <p className='field-label'> Card Expiry Month: </p>
        <input className='field' placeholder="Card Expiry Month " className='field' value={this.props.card.get('cardExpMon')}
           onChange={(e) =>
        window.BUS.trigger(App.events.register.cards.autoSave, [this.props.card.get('cardId'), 'cardExpMon', e.target.value])}  />
      </div>
      <div className='field-container'>
        <p className='field-label'> Card Expiry Yr: </p>
        <input className='field' placeholder="Card Expiry Yr " className='field' value={this.props.card.get('cardExpYr')}
           onChange={(e) =>
        window.BUS.trigger(App.events.register.cards.autoSave, [this.props.card.get('cardId'), 'cardExpYr', e.target.value])} />
      </div>
      <div className='field-btn update-btn' onClick={this.updateCard}> {btnLabel}</div>
     </div>
    </div>
    );
  }
});
module.exports = Card;