NebraskaJS
==========

Web site for Nebraska programmers dedicated to the JavaScript programming language.

### Building the Site

Use [NPM](http://npmjs.org) to install the dependencies.

    npm install

[Jekyll](https://github.com/mojombo/jekyll) is not available in npm, so you'll need to install it separately. Then, run the build script:

    grunt

Output is generated into the `_site` directory.  As is, the site's hierarchy (subfolders for posts) means that all of the resources are referenced using absolute urls and the site must be hosted at `/`. Set up a Virtual Host for the `_site` directory and modify your `/etc/hosts` to map that to a local development domain of your choosing.

#### Fetching Presenters

Add the new Presenter’s twitter and github handles to `_presenters/presenters.json`

    grunt presenters
    grunt


### Logo Image Guidelines

Changes to the Logo must be updated at these locations:

* [Twitter](https://twitter.com/nebraskajs): Must be 128x128 or Twitter will resize poorly.
* [Gravatar](http://en.gravatar.com/) (used at GitHub)
* [Meetup](http://www.meetup.com/ReactJS-Denver/)
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
* Add SocialCount to main page and posts
* Kuler Color Theme https://kuler.adobe.com/#themeID/2209535
