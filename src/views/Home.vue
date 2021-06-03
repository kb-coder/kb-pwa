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
    <img alt="Vue logo" src="../assets/logo.png">
    <dog-loader />
  </div>
</template>
