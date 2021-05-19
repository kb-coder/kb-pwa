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
    style="background-color: #FFFF99;padding:0.75em"
    v-show="updateExists"
  >
    Update available
    <button class="btn p-1 rounded-sm" @click="refreshApp">
      Update
    </button>
  </div>
</template>
<style scoped>
.btn {
  background-color: lightgray;
  border: 1px solid darkslategray;
  color: black;
}
</style>
