/* eslint-disable no-console */
import { serviceWorkerConstants } from './service-worker-constants'
import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  // registers service worker with hooks into workbox methods.
  register(`${process.env.BASE_URL}service-worker.js`, {
    // ready (registration) {
    ready (registration) {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )

      // auto-check for updates every hour. Without this, user has to manually refresh browser - which can't happen when app is installed.
      setInterval(() => {
        registration.update()
      }, 1000 * 60 * 60)
    },
    registered () { // can take ServiceWorkerRegistration as a param // registered(registration) {}
      console.log('Service worker has been registered.')
    },
    cached () { // can take ServiceWorkerRegistration as a param // cached(registration) {}
      console.log('Content has been cached for offline use.')
    },
    updatefound (registration) {
      console.log('New content is downloading.')

      // Forces the app to skip waiting and update. This can be adjusted to work with first login or something similar.
      const waitingServiceWorker = registration.waiting
      if (waitingServiceWorker) {
        // this only triggers skipWaiting. It still doesn't force the app to update. See /composoables/use-service-worker.ts for updating app.
        waitingServiceWorker.postMessage(serviceWorkerConstants.skipWaiting)
      }
    },
    updated (registration) {
      console.log('New content is available; please refresh.')
      // Wires up an event that we can listen to in the app. Example: listen for available update and prompt user to update.
      document.dispatchEvent(
        new CustomEvent('swUpdated', { detail: registration }))
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
