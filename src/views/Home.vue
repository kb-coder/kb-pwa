<script lang="ts">
import { defineComponent } from 'vue'
import DogLoader from '@/components/dog-loader.vue'

export default defineComponent({
  name: 'Home',
  components: {
    DogLoader
  }
})
</script>
<template>
  <div class="home">
    <dog-loader />
  </div>
</template>
