importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

 const HTML_CACHE = "html";
 const JS_CACHE = "javascript";
 const STYLE_CACHE = "stylesheets";
 const IMAGE_CACHE = "images";
 const FONT_CACHE = "fonts";
 const JSON_CACHE = "json";

 self.addEventListener("message", (event) => {
   if (event.data && event.data.type === "SKIP_WAITING") {
     self.skipWaiting();
   }
 });

 workbox.routing.registerRoute(
   ({event}) => event.request.destination === 'document',
   new workbox.strategies.NetworkFirst({
     cacheName: HTML_CACHE,
     plugins: [
       new workbox.expiration.ExpirationPlugin({
         maxEntries: 2,
       }),
     ],
   })
 );

 workbox.routing.registerRoute(
  /.*\.json/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: JSON_CACHE,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1,
      }),
    ],
  }),
);

 workbox.routing.registerRoute(
   ({event}) => event.request.destination === 'script',
   new workbox.strategies.StaleWhileRevalidate({
     cacheName: JS_CACHE,
     plugins: [
       new workbox.expiration.ExpirationPlugin({
         maxEntries: 3,
       }),
     ],
   })
 );

 workbox.routing.registerRoute(
   ({event}) => event.request.destination === 'style',
   new workbox.strategies.CacheFirst({
     cacheName: STYLE_CACHE,
     plugins: [
       new workbox.expiration.ExpirationPlugin({
         maxEntries: 3,
       }),
     ],
   })
 );

 workbox.routing.registerRoute(
   ({event}) => event.request.destination === 'image',
   new workbox.strategies.CacheFirst({
     cacheName: IMAGE_CACHE,
     plugins: [
       new workbox.expiration.ExpirationPlugin({
         maxEntries: 14,
       }),
     ],
   })
 );

 workbox.routing.registerRoute(
   ({event}) => event.request.destination === 'font',
   new workbox.strategies.StaleWhileRevalidate({
     cacheName: FONT_CACHE,
     plugins: [
       new workbox.expiration.ExpirationPlugin({
         maxEntries: 2,
       }),
     ],
   })
 );