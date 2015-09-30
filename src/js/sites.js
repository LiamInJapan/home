module.exports = [
  {
    alias: "g",
    name: "google",
    search: "https://www.google.com/search?q=%s",
  },
  {
    name: "gmail",
    search: "https://mail.google.com/mail/?shva=1#search/%s",
    visit: "https://mail.google.com/mail/?shva=1#inbox"
  },
  {
    alias: "gt",
    name: "google translate",
    search: "https://translate.google.com/#auto|en|%s",
  },
  {
    alias: "gim",
    name: "google image",
    search: "https://www.google.com/search?q=%s&tbm=isch",
    visit: "https://www.google.com/imghp?tbm=isch"
  },
  {
    alias: "gmap",
    name: "google maps",
    search: "https://maps.google.com/maps?oi=map&q=%s",
  },
  {
    alias: "gfin",
    name: "google finance",
    search: "https://www.google.com/finance?q=%s",
    visit: "https://www.google.com/finance"
  },
  {
    alias: "tw",
    name: "twitter",
    search: "https://twitter.com/search?q=%s",
  },
  {
    name: "feedly",
    search: "https://cloud.feedly.com/",
  },
  {
    alias: "yt",
    name: "youtube",
    search: "https://www.youtube.com/results?search_type=search_videos&search_sort=relevance&search_query=%s&search=Search",
  },
  {
    alias: "yfin",
    name: "yahoo finance",
    search: "http://finance.yahoo.com/q?s=%s",
  },
  {
    alias: "b",
    name: "bing",
    search: "http://www.bing.com/search?q=%s",
  },
  {
    alias: "sh",
    name: "symbol hound",
    search: "http://symbolhound.com/?q=%s",
  },
  {
    alias: "wa",
    name: "wolfram alpha",
    search: "https://www.wolframalpha.com/input/?i=%s",
  },
  {
    alias: "ddg",
    name: "duckduckgo",
    search: "https://duckduckgo.com/?q=%s",
  },
  {
    alias: "wp",
    name: "wikipedia",
    search: "https://en.wikipedia.org/?search=%s",
  },
  {
    alias: "wn",
    name: "wordnik",
    search: "http://www.wordnik.com/words/%s",
  },
  {
    alias: "ud",
    name: "urban dictionary",
    search: "http://www.urbandictionary.com/define.php?term=%s",
  },
  {
    alias: "ed",
    name: "encyclopedia dramatica",
    search: "http://encyclopediadramatica.ch/index.php?search=%s&fulltext=Search",
    visit: "http://encyclopediadramatica.ch/Main_Page"
  },
  {
    alias: "so",
    name: "stack overflow",
    search: "http://stackoverflow.com/search?q=%s",
  },
  {
    alias: "am",
    name: "amazon.com",
    search: "http://www.amazon.com/exec/obidos/external-search?mode=blended&keyword=%s",
  },
  {
    alias: "am.ca",
    name: "amazon.ca",
    search: "http://www.amazon.ca/exec/obidos/external-search?mode=blended&keyword=%s",
  },
  {
    name: "isbn",
    search: "http://isbn.nu/%s",
  },
  {
    alias: "oreilly",
    name: "o'reilly",
    search: "http://search.oreilly.com/?q=%s&t1=Books",
  },
  {
    alias: "safari",
    name: "safari online",
    search: "http://my.safaribooksonline.com/search/%s",
  },
  {
    name: "apress",
    search: "http://www.apress.com/catalogsearch/result/?q=%s",
  },
  {
    alias: "banq",
    name: "bibliothèque et archives nationales",
    search: "http://us2kv5pk3n.search.serialssolutions.com/?V=1.0&S=T_W_A&C=%s",
    visit: "http://www.banq.qc.ca/accueil/index.html?language_id=1"
  },
  {
    name: "audible",
    search: "http://www.audible.com/search?advsearchKeywords=%s",
  },
  {
    name: "vpl",
    search: "http://vpl.bibliocommons.com/search?t=smart&search_category=keyword&q=%s&searchOpt=catalogue",
    visit: "http://www.vpl.ca/"
  },
  {
    alias: "bp",
    name: "bookpiles",
    search: "https://bookpiles.ca/jonathan/books#reading/%s",
    visit: "https://bookpiles.ca/jonathan/books"
  },
  {
    name: "ups",
    search: "http://wwwapps.ups.com/WebTracking/processInputRequest?sort_by=status&tracknums_displayed=1&TypeOfInquiryNumber=T&loc=en_US&InquiryNumber1=%s&track.x=0&track.y=0",
    visit: "http://www.ups.com/?cookie=ca_en_home"
  },
  {
    name: "imdb",
    search: "http://imdb.com/find?q=%s",
  },
  {
    alias: "da",
    name: "deviant art",
    search: "http://www.deviantart.com/?q=%s",
  },
  {
    alias: "td",
    name: "tigerdirect.ca",
    search: "http://www.tigerdirect.ca/applications/SearchTools/search.asp?keywords=%s",
  },
  {
    name: "yelp",
    search: "http://www.yelp.com/search?find_desc=%s",
  },
  {
    alias: "rt",
    name: "rotten tomatoes",
    search: "http://www.rottentomatoes.com/search/?search=%s",
  },
  {
    alias: "gh",
    name: "github",
    search: "https://github.com/search?q=%s",
    visit: "https://github.com/jpalardy"
  },
  {
    alias: "ls",
    name: "yubnub",
    search: "http://yubnub.org/kernel/ls?args=%s",
  },
  {
    alias: "ann",
    name: "anime news network",
    search: "http://www.animenewsnetwork.com/encyclopedia/search.php?searchbox=%s",
    hide: true
  },
  {
    name: "anidb",
    search: "http://anidb.info/perl-bin/animedb.pl?adb.search=%s&show=animelist",
    hide: true
  },
  {
    alias: "tot",
    name: "tokyo toshokan",
    search: "http://www.tokyotosho.info/search.php?terms=%s",
    hide: true
  },
  {
    alias: "tpb",
    name: "the pirate bay",
    search: "http://thepiratebay.org/search/%s/0/7/0",
    hide: true
  },
  {
    alias: "cr",
    name: "crunchyroll",
    search: "http://www.crunchyroll.com/search?q=%s",
    hide: true
  },
  {
    alias: "fun",
    name: "funimation",
    search: "http://www.funimation.com/search?q=%s",
    hide: true
  },
  {
    alias: "nf",
    name: "netflix",
    search: "http://movies.netflix.com/Search?v1=%s",
    visit: "http://movies.netflix.com/WiHome",
    hide: true
  },
  {
    alias: "h",
    name: "heisig",
    search: "http://home.jpalardy.com/heisig/#%s",
    visit: "http://home.jpalardy.com/heisig/",
    hide: true
  },
  {
    alias: "rd",
    name: "romajidesu",
    search: "http://www.romajidesu.com/dictionary/meaning-of-%s.html",
    hide: true
  },
  {
    alias: "wr",
    name: "wordreference",
    search: "http://www.wordreference.com/es/en/translation.asp?spen=%s",
    hide: true
  }
];
