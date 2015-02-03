/* nebraskajs - v0.1.4 - 2015-02-02
* http://github.com/nebraskajs/nebraskajs.com/
* Copyright (c) 2015 Zach Leatherman; MIT License */

"use strict";
importScripts('js/cache-polyfill.js');

var CACHE_PREFIX = 'nejs_';
var CACHE_VERSION = 1;
var CACHE_NAME = CACHE_PREFIX + CACHE_VERSION;

var URLS_TO_CACHE = [
  '/css/global.css',
  '/css/social.css',
  '/js/global.js',
  '/img/offline-meme.jpg',
  '/favicon.ico',
  '/'
];


self.addEventListener('install', function(event) {
  event.waitUntil(
    // creates cache for the cache name, and adds the items to the cache
    caches.open(CACHE_NAME).then( function(cache) {

      return cache.addAll(URLS_TO_CACHE);

    })
  );
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {

      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener('fetch', function(event) {
  console.log(event.request);
  event.respondWith(

    // event.request would be something like `/index.html`
    caches.match(event.request).then( function(response) {
      return response || fetch(event.request);
    })

  );
});
