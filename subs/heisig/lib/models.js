// Generated by CoffeeScript 1.4.0
(function() {
  var Card, Cards, Deck, root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Card = (function(_super) {

    __extends(Card, _super);

    function Card() {
      return Card.__super__.constructor.apply(this, arguments);
    }

    return Card;

  })(Backbone.Model);

  Cards = (function(_super) {

    __extends(Cards, _super);

    function Cards() {
      return Cards.__super__.constructor.apply(this, arguments);
    }

    Cards.prototype.model = Card;

    return Cards;

  })(Backbone.Collection);

  Deck = (function(_super) {

    __extends(Deck, _super);

    function Deck() {
      return Deck.__super__.constructor.apply(this, arguments);
    }

    Deck.prototype.url = 'heisig.json';

    Deck.prototype.initialize = function() {
      return this.set('cards', new Cards());
    };

    Deck.prototype.parse = function(resp) {
      var result;
      return result = {
        cards: new Cards(resp)
      };
    };

    Deck.prototype.filtered = function() {
      var query;
      query = this.get('filter');
      if (!query) {
        return this.get('cards');
      }
      try {
        query = new RegExp(query, "i");
      } catch (error) {
        return [];
      }
      return this.get('cards').filter(function(card) {
        var _ref;
        if (card.get('kanji').match(query)) {
          return true;
        }
        if (card.get('keyword').match(query)) {
          return true;
        }
        if ((_ref = card.get('primitives')) != null ? _ref.match(query) : void 0) {
          return true;
        }
        return false;
      });
    };

    return Deck;

  })(Backbone.Model);

  root = this;

  root.Deck = Deck;

}).call(this);
