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
    <h1>My PWA</h1>
    <p>How about Fri?</p>
    <dog-loader />
  </div>
</template>
<style scoped>
h1 {
  padding-bottom: .5em;
}
</style>
