// webpack will inject the manifest into this file and name it service-worker.js in the output.
importScripts('./service-worker/register-routes.js') // eslint-disable

// This is the code piece that GenerateSW mode can't provide for us.
// This code listens for the user's confirmation to update the app.
self.addEventListener('message', (e) => {
  console.log('sw: message event listener hit.')
  if (!e.data) {
    return
  }

  switch (e.data) {
    case 'SKIP_WAITING':
      console.log('sw: message SKIP_WAITING called.')
      self.skipWaiting()
      break
    default:
      // NOOP
      break
  }
})

self.addEventListener('onupdatefound', (event) => {
  console.log('New content is downloading.')
  self.skipWaiting()
})

// workbox.core.clientsClaim() // Vue CLI 4 and Workbox v4, else

self.__precacheManifest = [].concat(self.__precacheManifest || [])

// workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

// // cleans up cache that is outdated because of a previous version of Workbox.
// workbox.precaching.cleanupOutdatedCaches()
