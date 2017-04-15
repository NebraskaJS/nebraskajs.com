NebraskaJS
==========

Web site for Nebraska programmers dedicated to the JavaScript programming language.

### Post-meetup Website Update Procedure

1. Upload the video to the NebraskaJS YouTube Channel.
1. If a new presenter, add their GitHub username to `presenters.yml` as a key. The usernames in this file are organized by first presentation date.
1. If a returning presenter, increment their `count` value in `presenters.yml`. This will add another ring to their avatar.
1. Run `grunt presenters` to fill in the rest of the `presenters.yml` data automatically from GitHub APIs.
1. Add a new `_post/*.md` entry, probably using `layout: post-video`. Look at some of the new posts for examples.
1. `grunt deploy` to upload a new version of the site (assumes you have a `nejs` host in your `.ssh/config` with the proper credentials)

### Building the Site

Use [NPM](http://npmjs.org) to install the dependencies.

    npm install

[Jekyll](https://github.com/mojombo/jekyll) is not available in npm, so you'll need to install it separately:

    gem install jekyll bundler rdiscount

Then, run the build script:

    grunt

Output is generated into the `_site` directory.  As is, the site's hierarchy (subfolders for posts) means that all of the resources are referenced using absolute urls and the site must be hosted at `/`. Set up a Virtual Host for the `_site` directory and modify your `/etc/hosts` to map that to a local development domain of your choosing.

#### Fetching Presenters

Add the new Presenter’s Github (primary key) username (and optionally Twitter) to `_data/presenters.yml`. Then run:

    grunt presenters
    grunt


### Logo Image Guidelines

Changes to the Logo must be updated at these locations:

* [Twitter](https://twitter.com/nebraskajs): Must be 128x128 or Twitter will resize poorly.
* [Gravatar](http://en.gravatar.com/) (used at GitHub)
* [Meetup](http://www.meetup.com/nebraskajs/)
* [Facebook](https://www.facebook.com/nebraskajs)
* [Google Plus](https://plus.google.com/115220697074331366039/posts)
* [Speakerdeck](speakerdeck.com/nebraskajs/)
* [Lanyrd](http://lanyrd.com/series/nebraskajs/)
* YouTube
* Vimeo
* favicon.ico, 32x32 (for HiDPI)

### Credits
* [Zurb Foundation Icon Font 2, Social Set](http://www.zurb.com/playground/foundation-icons)
* [Nebraska Image](http://en.wikipedia.org/wiki/File:Map_of_Nebraska.svg)