NebraskaJS
==========

Web site for Nebraska programmers dedicated to the JavaScript programming language.

### Building the Site

Using [Jekyll](https://github.com/mojombo/jekyll). Just run the following command from the root directory.

    jekyll

Output is generated into the `_site` directory.  As is, the site's hierarchy (subfolders for posts) means that all of the resources are referenced using absolute urls and the site must be hosted at `/`. Set up a Virtual Host for the `_site` directory and modify your `/etc/hosts` to map that to a local development domain of your choosing.

### Logo Image Guidelines

Changes to the Logo must be updated at these locations:

* [Twitter](https://twitter.com/nebraskajs): Must be 128x128 or Twitter will resize poorly.
* [Gravatar](http://en.gravatar.com/) (used at GitHub)
* [Meetup](http://www.meetup.com/nebraskajs/)
* [Facebook](https://www.facebook.com/nebraskajs)
* [Google Plus](https://plus.google.com/115220697074331366039/posts)
* [LinkedIn](http://www.linkedin.com/groups/NebraskaJS-4790018)
* [Speakerdeck](speakerdeck.com/nebraskajs/)
* [Lanyrd](http://lanyrd.com/series/nebraskajs/)
* favicon.ico, 32x32 (for HiDPI)

### Credits
* [Zurb Foundation Icon Font 2, Social Set](http://www.zurb.com/playground/foundation-icons)
* [Nebraska Image](http://en.wikipedia.org/wiki/File:Map_of_Nebraska.svg)

### TODOs
* Comprehensive font-face testing (looks a little off on iOS, Firefox)
* Add SocialCount to main page and posts
* Fix non-WebKit issue with image mask.Does this work? http://generic.cx/for/webkit/test.html https://github.com/Modernizr/Modernizr/blob/master/feature-detects/css-mask.js
* Collapsed menu (vertically) for single column layout.
* .htaccess with caching, gzip rules
* Analytics
* Kuler Color Theme https://kuler.adobe.com/#themeID/2209535
