// © 2026 Kamal Preet Singh. All rights reserved.
/* One Case service worker: caches the static shell only (HTML pages, icons, web fonts).
   It NEVER caches API calls: anything with ?action=, any POST, and any Apps Script host go straight to the network. */
'use strict';
var VERSION = 'onecase-shell-v2';
var SHELL = ['./', 'index.html', 'teaser.html', 'door.html', 'go.html', 'register.html', 'team.html',
  'manifest.webmanifest', 'icons/mark.svg', 'icons/icon-32.png', 'icons/icon-180.png', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/KP_Singh.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) {
    /* one by one, so a page that is not deployed yet cannot break the install */
    return Promise.all(SHELL.map(function (u) { return c.add(new Request(u, { cache: 'reload' })).catch(function () {}); }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

function isApi(url, req) {
  return req.method !== 'GET' || url.searchParams.has('action') ||
    /(^|\.)script\.google\.com$|(^|\.)googleusercontent\.com$/.test(url.hostname);
}

self.addEventListener('fetch', function (e) {
  var req = e.request, url = new URL(req.url);
  if (isApi(url, req)) return;                                   /* never cached */
  var fonts = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  var same = url.origin === self.location.origin;
  if (!fonts && !same) return;

  if (fonts || /\/icons\//.test(url.pathname) || /\.webmanifest$/.test(url.pathname)) {
    /* cache first: fonts and icons do not change between deploys */
    e.respondWith(caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) {
        if (res && (res.ok || res.type === 'opaque')) { var cp = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, cp); }); }
        return res;
      });
    }));
    return;
  }
  if (req.mode === 'navigate' || /\.html?$/.test(url.pathname) || /\/$/.test(url.pathname)) {
    /* network first so phase changes show at once; the cached shell is the offline fallback */
    e.respondWith(fetch(req).then(function (res) {
      if (res && res.ok) { var cp = res.clone(); caches.open(VERSION).then(function (c) { c.put(url.origin + url.pathname, cp); }); }
      return res;
    }).catch(function () {
      return caches.match(url.origin + url.pathname).then(function (hit) { return hit || caches.match('index.html'); });
    }));
  }
});
