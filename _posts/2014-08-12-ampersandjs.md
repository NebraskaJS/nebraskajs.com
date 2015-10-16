---
layout: post
title: Ampersand.js
videolength: 17min
author: mmacaula
---

# [Ampersand.js](http://ampersandjs.com/) Lightning talk

## Presented, Written by Mike Macaulay

{% include bio.html presenter=site.data.presenters.mmacaula %}

Ampersand.js is a new take on Backbone.js.  Backbone is super simple, and super flexible, you can do just about anything with it, but its so simple that most people can't really build a full app out of just it.  They bring in helpers and a lot of plugins to do things like data binding, nested models, and view management.  

Ampersand.js takes the base backbone models and views and brings them up a notch.  The creators basically decided that people always want some features and you might as well put them into the library.  So you get built-in data-binding to your views (yay!), you get computed properties, direct property access, child models and collections, validation and much more!  

At the same time, they also pushed simplicity even further by breaking up the different backbone concepts into separate, tiny modules.  Need a simple and powerful event system, try [backbone-events-standalone](https://www.npmjs.org/package/backbone-events-standalone), Need just a model, [ampersand-model](https://www.npmjs.org/package/ampersand-model) is for you.  In fact, they're managing a whole list of useful tiny modules [here](http://tools.ampersandjs.com/). 

The coolest thing (IMO) about ampersand is it's upgrade path.  You can use ampersand-models in backbone collections!  You can use ampersand-views in marionette layouts since they are inspired and use a very close API.  This means if you have a backbone application, you can start using ampersand gradually and see if it's a fit for you!

<div class="fluid-width-video-wrapper"><iframe src="//www.youtube.com/embed/UzJCz1qAiHg" frameborder="0" allowfullscreen></iframe></div>

## Slides

<div class="fluid-width-video-wrapper"><iframe src="//slides.com/mikemacaulay/ampersand-js/embed" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>

* [See the full slide deck on slides.com](http://slides.com/mikemacaulay/ampersand-js#/)

## Related

* [Ampersand.js site](http://ampersandjs.com/)
* Video recorded and edited by [NebraskaJS: Mike Macaulay on Ampersand.js](http://www.youtube.com/watch?v=UzJCz1qAiHg)
* [Event on Meetup](http://www.meetup.com/nebraskajs/events/181849992/)
* View [all videos from Lightning Round II](http://www.youtube.com/playlist?list=PLCCU6TIglvLHdiJPU2_qPF0Z2y8qMqq56)