/* eslint-disable no-console */
import { ref, Ref } from 'vue'
import { Workbox } from 'workbox-window'

interface UseServiceWorker {
  refreshApp: VoidFunction,
  updateExists: Ref<boolean>
}

export const useServiceWorker = (forceUpdate = false): UseServiceWorker => {
  let wb: Workbox
  const updateExists: Ref<boolean> = ref(false)
  const refreshing: Ref<boolean> = ref(false)

  console.log('useServiceWorker: initialized.')

  const reloadApp = () => {
    if (refreshing.value) {
      console.log('useServiceWorker: Service Worker already refreshing')
      return
    }

    refreshing.value = true
    updateExists.value = false
    window.location.reload()
  }

  const refreshApp = () => {
    console.log('useServiceWorker: refreshApp called.')
    try {
      wb.addEventListener('controlling', () => {
        console.log('useServiceWorker: refreshApp controlling listener called.')
        reloadApp()
      })

      wb.messageSkipWaiting()
    } catch (err) {
      console.log(`useServiceWorker: refreshApp error: ${err}`)
    }
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const updateAvailable = (event: any) => {
    console.log('useServiceWorker: Service worker update available.')
    if (event && event.detail) {
      wb = event.detail
      updateExists.value = true

      // forceUpdate is used by the app-auto-update component to force the app to activate.
      // Recommend only using this on the initial landing page or login page of an application.
      if (forceUpdate) {
        console.log('useServiceWorker: Forcing service worker update.')
        refreshApp()
      }
    }
  }

  // listen for service worker updates.
  document.addEventListener('swUpdated', updateAvailable, { once: true })

  return {
    refreshApp,
    updateExists
  }
}
