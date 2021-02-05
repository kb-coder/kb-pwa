<script lang="ts">
import { defineComponent } from 'vue'
import { useServiceWorker } from '@/composables/use-service-worker'

export default defineComponent({
  name: 'AppAutoUpdate',
  setup () {
    // useServiceWorker has a param to force update so all we have to do is reference this component somewhere, ideally on a login page.
    const { updateExists } = useServiceWorker(true)

    return {
      updateExists
    }
  }
})
</script>

<template>
  <div
    v-if="updateExists"
    class="alert-warning p-4 mb-4 rounded-md border-2 border-solid"
  >
    <i class="fas fa-exclamation-triangle text-warning"></i><span> Please wait while we update the application.</span>
  </div>
</template>
