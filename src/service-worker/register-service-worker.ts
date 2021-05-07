import { serviceWorkerConstants } from './service-worker-constants'
import { Workbox } from 'workbox-window'

// https://samvloeberghs.be/posts/lessons-learned-on-offline-capabilities-with-service-workers-using-workbox-the-sequel/

const autoUpdate = async (registration: ServiceWorkerRegistration | undefined) => {
  setInterval(async () => {
    try {
      /* eslint-disable-next-line no-unused-expressions */
      await registration?.update()
    } catch (err) {
      /* eslint-disable-next-line no-console */
      console.log(`sw: registration autoUpdate failed: ${err}`)
    }
  }, 1000 * 60 * 60)
}

const manualUpdateAvailable = (registration: ServiceWorkerRegistration | undefined) => {
  // Wires up an event that we can listen to in the app. Example: listen for available update and prompt user to update.
  document.dispatchEvent(
    new CustomEvent('swUpdated', { detail: registration }))
}

const register = async () => {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox(`${process.env.BASE_URL}service-worker.js`)

    const registration = await wb.register()

    autoUpdate(registration)

    wb.addEventListener('activated', async (event) => {
      if (event.isUpdate) {
        // event.isUpdate=true means the service worker was already registered and there is a new version available.

        // this only triggers self.skipWaiting. It still doesn't force the app to update. See /composables/use-service-worker.ts for updating app.
        wb.messageSkipWaiting()

        // Wires up an event that we can listen to in the app for manual updates. Example: listen for available update and prompt user to update.
        manualUpdateAvailable(registration)
      } else {
        // first time use when event.isUpdate = false
        // service worker should claim the client immediately since its the first install.
        wb.messageSW({ type: serviceWorkerConstants.clientsClaim })
        /* eslint-disable-next-line no-console */
        console.log('sw: clientsClaim called.')
      }
    })

    // This is the code piece that GenerateSW mode can't provide for us.
    // This code listens for the user's confirmation to update the app.
    wb.addEventListener('message', (event) => {
      /* eslint-disable-next-line no-console */
      console.log('sw: message event listener hit.')
      if (event.data && event.data.type === 'SKIP_WAITING') {
        /* eslint-disable-next-line no-console */
        console.log('sw: message SKIP_WAITING called.')
      }
    })
  }
}

export default register
