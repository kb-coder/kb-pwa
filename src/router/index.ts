import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import AppHeader from '@/components/app-header.vue'
import { routeConstants, routeNavConfig } from '@/router/route-constants'

const routes: Array<RouteRecordRaw> = [
  {
    path: routeConstants.home.path,
    name: routeConstants.home.name,
    components: {
      header: AppHeader,
      default: Home
    },
    meta: {
      navigation: routeNavConfig.home
    }
  },
  {
    path: routeConstants.about.path,
    name: routeConstants.about.name,
    components: {
      header: AppHeader,
      default: About
    },
    meta: {
      navigation: routeNavConfig.about
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
