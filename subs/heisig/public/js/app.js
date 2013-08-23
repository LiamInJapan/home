// Generated by CoffeeScript 1.6.3
(function() {
  var Card, Cards, Deck, root, tokenizeCard, tokenizeQuery, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  tokenizeCard = function(card) {
    return card.get('keyword').toLowerCase().replace(/-/, ' ').replace(/[^a-z ]/g, '').trim().split(/\s+/);
  };

  tokenizeQuery = function(str) {
    return str.toLowerCase().trim().split(/\s+/);
  };

  Card = (function(_super) {
    __extends(Card, _super);

    function Card() {
      _ref = Card.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Card.prototype.initialize = function() {
      return this.set('tokens', tokenize(this));
    };

    return Card;

  })(Backbone.Model);

  Cards = (function(_super) {
    __extends(Cards, _super);

    function Cards() {
      _ref1 = Cards.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Cards.prototype.model = Card;

    return Cards;

  })(Backbone.Collection);

  Deck = (function(_super) {
    __extends(Deck, _super);

    function Deck() {
      _ref2 = Deck.__super__.constructor.apply(this, arguments);
      return _ref2;
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
      var matchers, query, unique;
      query = this.get('filter');
      if (!query) {
        return this.get('cards');
      }
      unique = this.uniques[query];
      if (unique) {
        return [unique];
      }
      matchers = tokenizeQuery(query).map(starific.matcher);
      return this.get('cards').filter(function(card) {
        return starific.match(matchers, card.get('tokens'));
      });
    };

    return Deck;

  })(Backbone.Model);

  root = this;

  root.Deck = Deck;

}).call(this);
// Generated by CoffeeScript 1.6.3
(function() {
  var CACHE, CardView, DeckView, SearchView, highlight, pluralize, root, _ref, _ref1, _ref2,
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
      _ref = CardView.__super__.constructor.apply(this, arguments);
      return _ref;
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
      _ref1 = DeckView.__super__.constructor.apply(this, arguments);
      return _ref1;
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
      _ref2 = SearchView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    SearchView.prototype.events = {
      'change': 'change',
      'click': 'change',
      'keypress': 'press'
    };

    SearchView.prototype.change = function(e) {
      var query;
      query = $(e.target).val();
      return this.filter(query);
    };

    SearchView.prototype.press = function(e) {
      e.stopPropagation();
      if (e.which === 13) {
        e.preventDefault();
        return this.change(e);
      }
    };

    SearchView.prototype.filter = function(query) {
      return this.model.set('filter', query);
    };

    return SearchView;

  })(Backbone.View);

  root = this;

  root.DeckView = DeckView;

  root.SearchView = SearchView;

}).call(this);
// Generated by CoffeeScript 1.6.3
(function() {
  var Workspace, root, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Workspace = (function(_super) {
    __extends(Workspace, _super);

    function Workspace() {
      _ref = Workspace.__super__.constructor.apply(this, arguments);
      return _ref;
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
// Generated by CoffeeScript 1.6.3
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
        return $('#search input').select().focus();
      }
    });
  });

}).call(this);
