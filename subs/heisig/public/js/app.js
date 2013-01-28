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
      var uniques;
      this.set('cards', new Cards());
      this.on('change:filter', function(deck, query) {
        return Backbone.history.navigate(query);
      });
      this.uniques = uniques = {};
      return this.on('change:cards', function(deck, cards) {
        var unique;
        unique = {};
        return cards.forEach(function(card) {
          uniques[card.get('no')] = card;
          return uniques[card.get('kanji')] = card;
        });
      });
    };

    Deck.prototype.parse = function(resp) {
      var result;
      return result = {
        cards: new Cards(resp)
      };
    };

    Deck.prototype.filtered = function() {
      var query, strict, unique;
      query = this.get('filter');
      if (!query) {
        return this.get('cards');
      }
      unique = this.uniques[query];
      if (unique) {
        return [unique];
      }
      try {
        query = new RegExp(query, "i");
      } catch (error) {
        return [];
      }
      strict = this.get('strict');
      return this.get('cards').filter(function(card) {
        var _ref;
        if (card.get('keyword').match(query)) {
          return true;
        }
        if (!strict && ((_ref = card.get('primitives')) != null ? _ref.match(query) : void 0)) {
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
// Generated by CoffeeScript 1.4.0
(function() {
  var CACHE, CardView, DeckView, SearchView, highlight, pluralize, root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CACHE = [];

  pluralize = function(count, singular, plural) {
    if (plural == null) {
      plural = "" + singular + "s";
    }
    if (count === 1) {
      return "" + count + " " + singular;
    } else {
      return "" + count + " " + plural;
    }
  };

  highlight = function(sel, duration) {
    sel = $(sel);
    sel.addClass("highlighted");
    return setTimeout(function() {
      return sel.removeClass("highlighted");
    }, duration);
  };

  CardView = (function(_super) {

    __extends(CardView, _super);

    function CardView() {
      return CardView.__super__.constructor.apply(this, arguments);
    }

    CardView.prototype.className = 'card';

    CardView.prototype.template = $('#card-template').html();

    CardView.prototype.render = function() {
      this.$el.html(Mustache.render(this.template, this.model.toJSON()));
      return this;
    };

    return CardView;

  })(Backbone.View);

  DeckView = (function(_super) {

    __extends(DeckView, _super);

    function DeckView() {
      return DeckView.__super__.constructor.apply(this, arguments);
    }

    DeckView.prototype.events = {
      'click a': 'select'
    };

    DeckView.prototype.select = function(e) {
      var kno, target;
      e.preventDefault();
      kno = $(e.target).text();
      $('#search input').val('');
      this.model.set('filter', '');
      target = $("#card-" + kno);
      highlight(target, 2000);
      return $(window).scrollTop(target.offset().top - 130);
    };

    DeckView.prototype.initialize = function() {
      return this.model.on('change', this.render, this);
    };

    DeckView.prototype.render = function() {
      var cards;
      cards = this.model.filtered();
      $('#count').html(pluralize(cards.length, "kanji"));
      this.$el.html(cards.map(function(card) {
        var cardView, kno;
        kno = card.get('no');
        if (!CACHE[kno]) {
          cardView = new CardView({
            model: card,
            id: "card-" + (card.get('no'))
          });
          CACHE[kno] = cardView.render().el;
        }
        return CACHE[kno];
      }));
      return this;
    };

    return DeckView;

  })(Backbone.View);

  SearchView = (function(_super) {

    __extends(SearchView, _super);

    function SearchView() {
      return SearchView.__super__.constructor.apply(this, arguments);
    }

    SearchView.prototype.events = {
      'keyup': 'change',
      'click': 'change',
      'keypress': 'press',
      'submit': function(e) {
        return e.preventDefault();
      }
    };

    SearchView.prototype.initialize = function() {
      this.filter = _.debounce(this.filter, 300);
      return this.model.on('change:strict', this.strictMode, this);
    };

    SearchView.prototype.change = function(e) {
      var query;
      query = $(e.target).val();
      return this.filter(query);
    };

    SearchView.prototype.filter = function(query) {
      return this.model.set('filter', query);
    };

    SearchView.prototype.press = function(e) {
      e.stopPropagation();
      if (e.which === 33) {
        e.preventDefault();
        return this.model.set('strict', !this.model.get('strict'));
      }
    };

    SearchView.prototype.strictMode = function(model, strict) {
      return this.$('input').toggleClass('strict', strict);
    };

    return SearchView;

  })(Backbone.View);

  root = this;

  root.DeckView = DeckView;

  root.SearchView = SearchView;

}).call(this);
// Generated by CoffeeScript 1.4.0
(function() {
  var Workspace, root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Workspace = (function(_super) {

    __extends(Workspace, _super);

    function Workspace() {
      return Workspace.__super__.constructor.apply(this, arguments);
    }

    Workspace.prototype.routes = {
      ":query": "search"
    };

    Workspace.prototype.search = function(q) {
      q = decodeURIComponent(q);
      $('#search input').val(q);
      return deck.set('filter', q);
    };

    return Workspace;

  })(Backbone.Router);

  root = this;

  root.Workspace = Workspace;

}).call(this);
// Generated by CoffeeScript 1.4.0
(function() {

  $(function() {
    var deck_view, search_view, workspace;
    window.deck = new Deck();
    deck_view = new DeckView({
      model: deck,
      el: $('#cards')
    });
    search_view = new SearchView({
      model: deck,
      el: $('#search')
    });
    workspace = new Workspace();
    Backbone.history.start();
    deck.fetch();
    return $(document).keypress(function(e) {
      var _ref;
      if ((_ref = e.which) === 47 || _ref === 104) {
        e.preventDefault();
        return $('#search input').focus();
      }
    });
  });

}).call(this);
