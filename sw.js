/* nebraskajs - v0.1.4 - 2015-02-06
* http://github.com/nebraskajs/nebraskajs.com/
* Copyright (c) 2015 Zach Leatherman; MIT License */

"use strict";
importScripts('js/cache-polyfill.js');

var CACHE_PREFIX = 'nejs_';
var CACHE_VERSION = 1;
var CACHE_NAME = CACHE_PREFIX + CACHE_VERSION;

var URLS_TO_CACHE = [
  '/dist/0.1.4/all.min.css',
  '/dist/0.1.4/global.min.js',
  '/img/offline-meme.jpg',
  '/favicon.ico',
  '/about',
  '/offline',
  '/conduct',
  '/presenters',
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
      // successful hit in the cache, return it
      if (response) {
        return response;
      }

      // else, lets get the item and cache it for future use

      // IMPORTANT: Clone the request. A request is a stream and
      // can only be consumed once. Since we are consuming this
      // once by cache and once by the browser for fetch, we need
      // to clone the response
      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(

        // when we get the response from the network
        // cache it
        function(response) {

          // if not a valid response, kill process
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          caches.open(CACHE_NAME).then(function(cache){
            // IMPORTANT: Clone the response and request. They are streams
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have 2 stream.
            cache.put(event.request.clone(), response.clone());
          });

          return response;
      });
    })
  );
});
