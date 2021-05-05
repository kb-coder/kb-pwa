<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import AppBar from '@/components/app-bar.vue'
import AppNavigation from '@/components/app-navigation.vue'
import isEmpty from 'lodash.isempty'

export default defineComponent({
  name: 'AppHeader',
  components: {
    AppBar,
    AppNavigation
  },
  setup () {
    const currentRoute = useRoute()

    const pageTitle = computed(() => {
      return !isEmpty(currentRoute.meta?.navigation?.displayText)
        ? currentRoute.meta?.navigation?.displayText
        : currentRoute.name
          ? currentRoute.name
          : 'Karen PWA App'
    })

    return {
      pageTitle
    }
  }
})
</script>

<template>
  <AppBar
    :title="pageTitle"
  >
    <template #primary-action>
      <AppNavigation />
    </template>
  </AppBar>
</template>
