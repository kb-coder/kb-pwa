<script lang="ts">
import { defineComponent } from 'vue'
import AppAutoUpdate from '@/components/app-auto-update.vue'

export default defineComponent({
  name: 'About',
  components: {
    AppAutoUpdate
  }
})
</script>

<template>
  <AppAutoUpdate />
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
