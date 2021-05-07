import { createApp } from 'vue'
import App from './App.vue'
import register from './service-worker/register-service-worker' // registers service worker
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')
register()
