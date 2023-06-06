// Service Worker installation
self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('cache')
        .then(cache => {
          return cache.addAll([
            '/', // The root path of your website
            '/index.html', // Add other important pages and assets
            '/about.html',
            '/music.html',
            '/submissions.html',
            '/style.css',
            '/eos.jpg',
            '/solstice.jpg',
            '/toronto.jpg',
            '/travel.zip.jpg',
            '/winter.jpg',
            '/video.mp4',
            '/contemplation.png',
            '/Profile_Photo_(Platforms).png',
            '/fonts/SF-Pro-Display-Bold.otf'
            // Add more files you want to cache
          ]);
        })
    );
  });
  
  // Service Worker activation
  self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.filter(cacheName => {
            // Remove outdated caches
            return cacheName !== 'cache';
          }).map(cacheName => {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });
  
  // Service Worker fetch event
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          // Return the cached response if it exists
          if (response) {
            return response;
          }
  
          // Fetch the requested resource
          return fetch(event.request)
            .then(response => {
              // Cache the fetched response for future use
              const clonedResponse = response.clone();
              caches.open('cache')
                .then(cache => {
                  cache.put(event.request, clonedResponse);
                });
  
              return response;
            });
        })
    );
  });
  