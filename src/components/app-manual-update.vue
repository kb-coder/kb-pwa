<script lang="ts">
import { defineComponent } from 'vue'
import { useServiceWorker } from '@/composables/use-service-worker'

export default defineComponent({
  name: 'AppManualUpdate',
  setup () {
    const { updateExists, refreshApp } = useServiceWorker()

    return {
      refreshApp,
      updateExists
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
