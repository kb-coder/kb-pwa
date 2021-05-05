<script lang="ts">
import '@fortawesome/fontawesome-free/css/all.css'
import '@/assets/tailwind.css'
import { defineComponent } from 'vue'
import AppManualUpdate from '@/components/app-manual-update.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppManualUpdate
  }
})
</script>

<template>
  <transition
    name="fade"
    appear
  >
    <AppManualUpdate />
  </transition>
  <header>
    <router-view
      name="header"
      v-slot="slotProps"
    >
      <transition
        name="fade"
        appear
      >
        <div id="nav">
          <component :is="slotProps.Component" />
        </div>
      </transition>
    </router-view>
  </header>
  <main>
    <router-view v-slot="slotProps">
      <transition
        name="fade"
        appear
      >
        <div class="container px-4 pt-4 h-screen overflow-auto">
          <component :is="slotProps.Component" />
        </div>
      </transition>
    </router-view>
  </main>
</template>
