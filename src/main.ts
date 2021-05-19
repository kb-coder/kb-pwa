import { createApp } from 'vue'
import App from './App.vue'
import register from './service-worker/register-service-worker' // registers service worker
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')

register()

if (process.env.NODE_ENV === 'development' || process.env.VUE_APP_PWA_LOCAL_SERVE === 'true') {
  console.log(`PWA Local Serve: ${process.env.VUE_APP_PWA_LOCAL_SERVE}`) // eslint-disable-line no-console
  console.log(`Node Env: ${process.env.NODE_ENV}`) // eslint-disable-line no-console
}
