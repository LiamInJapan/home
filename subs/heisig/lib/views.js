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
      'click': 'select'
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

    DeckView.prototype.select = function(e) {
      var kno;
      kno = $(e.target).find(".no").text();
      deck.set('filter', '');
      return setTimeout(function() {
        var target;
        target = $("#card-" + kno);
        highlight(target, 2000);
        return $(window).scrollTop(target.offset().top - 130);
      }, 200);
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
      'submit': function(e) {
        return e.preventDefault();
      }
    };

    SearchView.prototype.initialize = function() {
      return this.filter = _.debounce(this.filter, 100);
    };

    SearchView.prototype.change = function(e) {
      var query;
      query = $(e.target).val();
      return this.filter(query);
    };

    SearchView.prototype.filter = function(query) {
      return deck.set('filter', query);
    };

    return SearchView;

  })(Backbone.View);

  root = this;

  root.DeckView = DeckView;

  root.SearchView = SearchView;

}).call(this);
