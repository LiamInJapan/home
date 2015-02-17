(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Command = require('./command');
var sites   = require('./sites');

//-------------------------------------------------

Command.sites = (function () {
  var result = {};
  sites.forEach(function (site) {
    result[site.alias] = site;
  });
  return result;
}());
Command.default_sites = ['ddg'];

var getCommand = function () {
  var text = document.getElementById('command_input').value;
  return Command.parse(text);
};

var makeLinks = function (command) {
  if (!command) {
    document.getElementById('links').innerHTML = "";
    return;
  }
  var html = command.links.map(function (link) {
    return '<a href="' + link.url + '">' + link.site + '</a>';
  }).join(' ');
  document.getElementById('links').innerHTML = html;
};

//-------------------------------------------------

document.getElementById("command_form").onsubmit = function () {
  try {
    var command = getCommand();
    if (!command) {
      return false;
    }
    command.urls.slice(1).forEach(function (url) {
      window.open(url, '_blank');
    });
    window.location = command.urls[0];
  } catch (e) {
    console.error(e);
  }
  return false;
};

document.body.onkeyup = function (ev) {
  if (ev.keyCode === 27) { // ESC
    var elem = document.getElementById("cheatSheetDetails");
    elem.className = (elem.className === "hide" ? "" : "hide");
    return false;
  }
  return true;
};

document.getElementById("command_input").onkeydown = function (ev) {
  if (ev.keyCode === 27) { // ESC
    ev.preventDefault();   // don't clear the text field
    return false;
  }
};

document.getElementById("command_input").onkeyup = function () {
  var command = getCommand();
  makeLinks(command);
  return true;
};

},{"./command":2,"./sites":3}],2:[function(require,module,exports){

var Command = function (query, sites) {
  this.query = query || '';
  this.sites = sites || [];
  var links = this.links = [];
  sites.forEach(function (site) {
    if (query) {
      links.push({site: site, url: Command.sites[site].search.replace(/%s/g, encodeURIComponent(query).replace(/%20/g, '+'))});
      return;
    }
    links.push({site: site, url: Command.sites[site].visit});
  });
  this.urls = links.map(function (link) { return link.url; });
};

Command.prototype.toString = function () {
  return this.sites.join(",") + " " + this.query;
};

Command.parse = function (text) {
  var words = text.split(/ +/).filter(Boolean);
  if (words.length === 0) {
    return null;
  }
  var sites = words[0].split(',').filter(function (site) { return Command.sites[site]; });
  if (sites.length) {
    return new Command(words.slice(1).join(' '), sites);
  }
  return new Command(words.join(' '), Command.default_sites);
};

module.exports = Command;

},{}],3:[function(require,module,exports){
module.exports = [
  {
    "alias": "g",
    "name": "google",
    "search": "https://www.google.com/search?q=%s",
    "visit": "https://www.google.com/"
  },
  {
    "alias": "gmail",
    "name": "gmail",
    "search": "https://mail.google.com/mail/?shva=1#search/%s",
    "visit": "https://mail.google.com/mail/?shva=1#inbox"
  },
  {
    "alias": "gt",
    "name": "google translate",
    "search": "https://translate.google.com/#auto|en|%s",
    "visit": "https://translate.google.com/"
  },
  {
    "alias": "gim",
    "name": "google image",
    "search": "https://www.google.com/search?q=%s&tbm=isch",
    "visit": "https://www.google.com/imghp?tbm=isch"
  },
  {
    "alias": "gmap",
    "name": "google maps",
    "search": "https://maps.google.com/maps?oi=map&q=%s",
    "visit": "https://maps.google.com/"
  },
  {
    "alias": "gfin",
    "name": "google finance",
    "search": "https://www.google.com/finance?q=%s",
    "visit": "https://www.google.com/finance"
  },
  {
    "alias": "feedly",
    "name": "feedly",
    "search": "https://cloud.feedly.com/",
    "visit": "https://cloud.feedly.com/"
  },
  {
    "alias": "yt",
    "name": "youtube",
    "search": "https://www.youtube.com/results?search_type=search_videos&search_sort=relevance&search_query=%s&search=Search",
    "visit": "https://www.youtube.com/"
  },
  {
    "alias": "yim",
    "name": "yahoo image",
    "search": "http://images.search.yahoo.com/search/images?p=%s",
    "visit": "http://images.search.yahoo.com/search/images"
  },
  {
    "alias": "yfin",
    "name": "yahoo finance",
    "search": "http://finance.yahoo.com/q?s=%s",
    "visit": "http://finance.yahoo.com/"
  },
  {
    "alias": "fl",
    "name": "flickr",
    "search": "https://www.flickr.com/photos/tags/%s",
    "visit": "https://www.flickr.com/"
  },
  {
    "alias": "b",
    "name": "bing",
    "search": "http://www.bing.com/search?q=%s",
    "visit": "http://www.bing.com/"
  },
  {
    "alias": "sh",
    "name": "symbol hound",
    "search": "http://symbolhound.com/?q=%s",
    "visit": "http://symbolhound.com/"
  },
  {
    "alias": "wa",
    "name": "wolfram alpha",
    "search": "https://www.wolframalpha.com/input/?i=%s",
    "visit": "https://www.wolframalpha.com/"
  },
  {
    "alias": "ddg",
    "name": "duckduckgo",
    "search": "https://duckduckgo.com/?q=%s",
    "visit": "https://duckduckgo.com/"
  },
  {
    "alias": "wp",
    "name": "wikipedia",
    "search": "https://en.wikipedia.org/?search=%s",
    "visit": "https://en.wikipedia.org/"
  },
  {
    "alias": "ud",
    "name": "urban dictionary",
    "search": "http://www.urbandictionary.com/define.php?term=%s",
    "visit": "http://www.urbandictionary.com/"
  },
  {
    "alias": "ed",
    "name": "encyclopedia dramatica",
    "search": "http://encyclopediadramatica.ch/index.php?search=%s&fulltext=Search",
    "visit": "http://encyclopediadramatica.ch/Main_Page"
  },
  {
    "alias": "so",
    "name": "stack overflow",
    "search": "http://stackoverflow.com/search?q=%s",
    "visit": "http://stackoverflow.com/"
  },
  {
    "alias": "am",
    "name": "amazon.com",
    "search": "http://www.amazon.com/exec/obidos/external-search?mode=blended&keyword=%s",
    "visit": "http://www.amazon.com/"
  },
  {
    "alias": "am.ca",
    "name": "amazon.ca",
    "search": "http://www.amazon.ca/exec/obidos/external-search?mode=blended&keyword=%s",
    "visit": "http://www.amazon.ca/"
  },
  {
    "alias": "isbn",
    "name": "isbn",
    "search": "http://isbn.nu/%s",
    "visit": "http://isbn.nu/"
  },
  {
    "alias": "oreilly",
    "name": "o'reilly",
    "search": "http://search.oreilly.com/?q=%s&t1=Books",
    "visit": "http://oreilly.com/"
  },
  {
    "alias": "safari",
    "name": "safari online",
    "search": "http://my.safaribooksonline.com/search/%s",
    "visit": "http://my.safaribooksonline.com/"
  },
  {
    "alias": "apress",
    "name": "apress",
    "search": "http://www.apress.com/catalogsearch/result/?q=%s",
    "visit": "http://www.apress.com/"
  },
  {
    "alias": "banq",
    "name": "bibliothèque et archives nationales",
    "search": "http://us2kv5pk3n.search.serialssolutions.com/?V=1.0&S=T_W_A&C=%s",
    "visit": "http://www.banq.qc.ca/accueil/index.html?language_id=1"
  },
  {
    "alias": "audible",
    "name": "audible",
    "search": "http://www.audible.com/search?advsearchKeywords=%s",
    "visit": "http://www.audible.com/"
  },
  {
    "alias": "vpl",
    "name": "vpl",
    "search": "http://vpl.bibliocommons.com/search?t=smart&search_category=keyword&q=%s&searchOpt=catalogue",
    "visit": "http://www.vpl.ca/"
  },
  {
    "alias": "bp",
    "name": "bookpiles",
    "search": "https://bookpiles.ca/jonathan/books#reading/%s",
    "visit": "https://bookpiles.ca/jonathan/books"
  },
  {
    "alias": "ups",
    "name": "ups",
    "search": "http://wwwapps.ups.com/WebTracking/processInputRequest?sort_by=status&tracknums_displayed=1&TypeOfInquiryNumber=T&loc=en_US&InquiryNumber1=%s&track.x=0&track.y=0",
    "visit": "http://www.ups.com/?cookie=ca_en_home"
  },
  {
    "alias": "imdb",
    "name": "imdb",
    "search": "http://imdb.com/find?q=%s",
    "visit": "http://imdb.com/"
  },
  {
    "alias": "da",
    "name": "deviant art",
    "search": "http://www.deviantart.com/?q=%s",
    "visit": "http://www.deviantart.com/"
  },
  {
    "alias": "td",
    "name": "tigerdirect.ca",
    "search": "http://www.tigerdirect.ca/applications/SearchTools/search.asp?keywords=%s",
    "visit": "http://www.tigerdirect.ca/"
  },
  {
    "alias": "yelp",
    "name": "yelp",
    "search": "http://www.yelp.com/search?find_desc=%s&find_loc=Montr%C3%A9al%2C+QC",
    "visit": "http://www.yelp.com/"
  },
  {
    "alias": "rt",
    "name": "rotten tomatoes",
    "search": "http://www.rottentomatoes.com/search/?search=%s",
    "visit": "http://www.rottentomatoes.com/"
  },
  {
    "alias": "gh",
    "name": "github",
    "search": "https://github.com/search?q=%s",
    "visit": "https://github.com/jpalardy"
  },
  {
    "alias": "ls",
    "name": "yubnub",
    "search": "http://yubnub.org/kernel/ls?args=%s",
    "visit": "http://yubnub.org/"
  },
  {
    "alias": "p",
    "name": "localhost port",
    "search": "http://localhost:%s/",
    "visit": "http://localhost/"
  },
  {
    "alias": "ann",
    "name": "anime news network",
    "search": "http://www.animenewsnetwork.com/encyclopedia/search.php?searchbox=%s",
    "visit": "http://www.animenewsnetwork.com/",
    "hide": true
  },
  {
    "alias": "anidb",
    "name": "anidb",
    "search": "http://anidb.info/perl-bin/animedb.pl?adb.search=%s&show=animelist",
    "visit": "http://anidb.info/",
    "hide": true
  },
  {
    "alias": "tot",
    "name": "tokyo toshokan",
    "search": "http://www.tokyotosho.info/search.php?terms=%s",
    "visit": "http://www.tokyotosho.info/",
    "hide": true
  },
  {
    "alias": "tpb",
    "name": "the pirate bay",
    "search": "http://thepiratebay.org/search/%s/0/7/0",
    "visit": "http://thepiratebay.org/",
    "hide": true
  },
  {
    "alias": "cr",
    "name": "crunchyroll",
    "search": "http://www.crunchyroll.com/search?q=%s",
    "visit": "http://www.crunchyroll.com/",
    "hide": true
  },
  {
    "alias": "fun",
    "name": "funimation",
    "search": "http://www.funimation.com/search?q=%s",
    "visit": "http://www.funimation.com/",
    "hide": true
  },
  {
    "alias": "nf",
    "name": "netflix",
    "search": "http://movies.netflix.com/Search?v1=%s",
    "visit": "http://movies.netflix.com/WiHome",
    "hide": true
  },
  {
    "alias": "h",
    "name": "heisig",
    "search": "http://home.jpalardy.com/heisig/#%s",
    "visit": "http://home.jpalardy.com/heisig/",
    "hide": true
  },
  {
    "alias": "rd",
    "name": "romajidesu",
    "search": "http://www.romajidesu.com/dictionary/meaning-of-%s.html",
    "visit": "http://www.romajidesu.com/",
    "hide": true
  },
  {
    "alias": "wr",
    "name": "wordreference",
    "search": "http://www.wordreference.com/es/en/translation.asp?spen=%s",
    "visit": "http://www.wordreference.com/",
    "hide": true
  }
];

},{}]},{},[1]);
