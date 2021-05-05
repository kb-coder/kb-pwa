<script lang="ts">
import { defineComponent } from 'vue'
import { routeConstants } from '@/router/route-constants'

export default defineComponent({
  name: 'UserHeader',
  setup () {
    const homePath = routeConstants.home.path

    return {
      homePath
    }
  }
})
</script>
<template>
  <div>
    <h3 class="font-semibold">
      Users Name
    </h3>
    <router-link :to="homePath">
      Logout
    </router-link>
  </div>
</template>
