import { ref } from 'vue'
import { serviceWorkerConstants } from '@/service-worker/service-worker-constants'

export const useServiceWorker = (forceUpdate = false) => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let registration: any = null
  const updateExists = ref(false)
  const refreshing = ref(false)

  const reloadApp = () => {
    if (refreshing.value) {
      /* eslint-disable-next-line no-console */
      console.log('useServiceWorker: Service Worker already refreshing')
      return
    }

    refreshing.value = true
    window.location.reload()
  }

  const refreshApp = () => {
    /* eslint-disable-next-line no-console */
    console.log('useServiceWorker: refreshApp called.')
    updateExists.value = false
    if (registration) {
      const swState = registration.waiting.state
      if (swState === 'waiting' || swState === 'installed') {
        registration.waiting.postMessage(serviceWorkerConstants.skipWaiting)
      }
    }
  }

  // ServiceWorkerRegistration type definition doesn't allow null so we have to use any here.
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const updateAvailable = (event: any) => {
    /* eslint-disable-next-line no-console */
    console.log('useServiceWorker: Service worker update available.')
    if (event && event.detail) {
      registration = event.detail
      updateExists.value = true
      if (forceUpdate) {
        /* eslint-disable-next-line no-console */
        console.log('useServiceWorker: Forcing service worker update.')
        refreshApp()
      }
    }
  }

  // listen for service worker updates.
  document.addEventListener('swUpdated', updateAvailable, { once: true })

  if (navigator.serviceWorker) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      reloadApp()
    })
  }

  return {
    refreshApp,
    updateExists
  }
}
