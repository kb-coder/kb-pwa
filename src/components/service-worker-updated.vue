<script lang="ts">
import { serviceWorkerConstants } from '@/service-worker-constants'
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      // registration: null, // Typescript throws the dreaded Object might be null here
      // So trying this instead
      // registration: new ServiceWorkerRegistration(), // illegal constructor
      registration: { // try faking the basic structure so we can build.
        waiting: {
          postMessage: (msg: string) => {
            /* eslint-disable-next-line no-console */
            console.log(msg)
          }
        }
      },
      updateExists: false,
      refreshing: false
    }
  },
  setup () {
    // For some reason, using composition API with observable (ref) seems to break. Service Worker can't recognize the
    // registration.value.waiting.postMessage

    // ServiceWorkerRegistration type definition doesn't allow null so we have to use any here.
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    // const registration: any = ref(null)
    // const updateExists = ref(false)
    // const refreshing = ref(false)

    // const refreshApp = () => {
    //   console.log('App.vue: refreshApp called.')
    //   updateExists.value = false

    //   console.dir(registration)

    //   if (registration.value && registration.value.waiting) {
    //     /* eslint-disable-next-line no-console */
    //     console.log('App.vue: Service worker SKIP_WAITING called.')
    //     console.dir(registration.value)
    //     registration.value.waiting.postMessage(serviceWorkerConstants.skipWaiting)
    //   }
    // }

    // // ServiceWorkerRegistration type definition doesn't allow null so we have to use any here.
    // /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    // const updateAvailable = (event: any) => {
    //   registration.value = ref(event.detail)
    //   updateExists.value = true
    //   /* eslint-disable-next-line no-console */
    //   console.log('App.vue: Service worker update available.')
    // }

    // // listen for service worker updates.
    // document.addEventListener('swUpdated', this.updateAvailable, { once: true })

    // if (navigator.serviceWorker) {
    //   // reload the page
    //   navigator.serviceWorker.addEventListener('controllerchange', () => {
    //     console.log('App.vue: Service Worker controllerchange called')
    //     if (refreshing.value) {
    //       /* eslint-disable-next-line no-console */
    //       console.log('App.vue: Service Worker already refreshing')
    //       return
    //     }

    //     refreshing.value = true

    //     // Here the actual reload of the page occurs
    //     window.location.reload()
    //   })
    // }
  },
  methods: {
    refreshApp () {
      console.log('App.vue: refreshApp called.')
      this.updateExists = false

      console.dir(this.registration)

      if (this.registration && this.registration.waiting) {
        /* eslint-disable-next-line no-console */
        console.log('App.vue: Service worker SKIP_WAITING called.')
        console.dir(this.registration)
        this.registration.waiting.postMessage(serviceWorkerConstants.skipWaiting)
      }
    },
    // ServiceWorkerRegistration type definition doesn't allow null so we have to use any here.
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    updateAvailable (event: any) {
      this.registration = event.detail
      this.updateExists = true
      /* eslint-disable-next-line no-console */
      console.log('App.vue: Service worker update available.')
    }
  },
  created () {
    document.addEventListener('swUpdated', this.updateAvailable, { once: true })

    if (navigator.serviceWorker) {
      // reload the page
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('App.vue: Service Worker controllerchange called')
        if (this.refreshing) {
          /* eslint-disable-next-line no-console */
          console.log('App.vue: Service Worker already refreshing')
          return
        }

        this.refreshing = true

        // Here the actual reload of the page occurs
        window.location.reload()
      })
    }
  }
})
</script>

<template>
  <div
    style="background-color: #FFFF99;"
    v-if="updateExists"
  >
    Update available
    <button @click="refreshApp">
      Update
    </button>
  </div>
</template>
