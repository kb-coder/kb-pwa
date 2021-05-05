<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter, useRoute, onBeforeRouteLeave, RouteRecordNormalized } from 'vue-router'
import Drawer from '@/components/drawer.vue'
import UserHeader from '@/components/user-header.vue'

export default defineComponent({
  name: 'AppNavigation',
  components: {
    Drawer,
    UserHeader
  },
  setup () {
    const openDrawer = ref(false)
    const router = useRouter()
    const currentRoute = useRoute()
    const allRoutes = router.getRoutes()
    const navRoutes = allRoutes.filter(r => r?.meta?.navigation?.show === true).sort((a, b) => {
      const valA = a?.meta?.navigation?.sectionKey ?? 0
      const valB = b?.meta?.navigation?.sectionKey ?? 0
      return valA - valB
    })

    const toggleDrawer = () => {
      openDrawer.value = !openDrawer.value
    }

    const closeDrawer = () => {
      openDrawer.value = false
    }

    const drawerClickOutside = () => {
      closeDrawer()
    }

    const isCurrentRoute = (route: RouteRecordNormalized) => {
      return currentRoute.name === route.name
    }

    onBeforeRouteLeave(() => {
      closeDrawer()
    })

    return {
      drawerClickOutside,
      isCurrentRoute,
      navRoutes,
      openDrawer,
      toggleDrawer
    }
  }
})
</script>
<template>
  <div
    :class="openDrawer ? 'bg-gray-500 opacity-25 absolute top-0 left-0 h-screen w-screen' : ''"
    @click="drawerClickOutside"
  />
  <i
    class="fas fa-bars cursor-pointer"
    @click="toggleDrawer"
  />
  <transition
    name="slideleft"
  >
    <Drawer
      v-if="openDrawer"
    >
      <template #header>
        <UserHeader />
      </template>
      <template #content>
        <div
          v-for="nav in navRoutes"
          :key="nav.name"
          class="py-4"
          :class="isCurrentRoute(nav) ? 'text-primary bg-primary-light bg-opacity-20 rounded-md' : 'anchor-as-text'"
        >
          <router-link
            :to="nav.path"
            class="px-4"
          >
            <i :class="nav?.meta?.navigation?.icon" /><span class="pl-4"> {{ nav?.meta?.navigation?.displayText }}</span>
          </router-link>
        </div>
      </template>
    </Drawer>
  </transition>
</template>
