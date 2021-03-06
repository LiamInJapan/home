
home
====

The web pages at http://home.jpalardy.com.

What is it?
-----------

The http://home.jpalardy.com page is my home page. It is my command-line
interface to the web. Inspired by yubnub.org, it runs in JavaScript and does
NOT log any history.

A _command_ with a query will perform that query on a specific site: (Google
image, in this case)

    > gim muffins

A _command_ without a query will open the site's home page:

    > gim

Multiple commands can be specified, opening a new tab for each site:

    > gim,yim muffins

Why?
----

The web is about searching, and searching goes beyond Google.

If I already know what site I want to end up on (github, amazon, google map), why go
through the extra step of searching on Google and clicking my way through?

How it works
------------

The end result ends up in `public`. Compile the assets:

    > make compile

    src/less   => tmp/css
    src/images => tmp/images
    src/html   => tmp

Inline the assets into a single HTML page:

    > cd tmp; python -m SimpleHTTPServer
    > make inline

Test the JavaScript files with mocha under node.js.

    > make test

Finally, clean up after yourself:

    > make clean

