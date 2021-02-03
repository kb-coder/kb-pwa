importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')

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

workbox.core.clientsClaim() // Vue CLI 4 and Workbox v4, else

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

// cleans up cache that is outdated because of a previous version of Workbox.
workbox.precaching.cleanupOutdatedCaches()
