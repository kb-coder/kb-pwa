<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'Drawer',
  setup (props, { slots }) {
    const hasHeader = computed(() => {
      return slots?.header
    })

    const hasContent = computed(() => {
      return slots?.content
    })

    const hasFooter = computed(() => {
      return slots?.footer
    })

    return {
      hasHeader,
      hasContent,
      hasFooter
    }
  }
})
</script>

<style scoped>
/* mobile */
.drawer-width {
  width: 80vw;
}

@screen md {
  .drawer-width {
    width: 40vw;
  }
}

@screen lg {
  .drawer-width {
    width: 20vw;
  }
}
</style>

<template>
  <aside
    class="top-0 left-0 bg-white text-black fixed drawer-width h-full shadow-sm overflow-auto z-30"
  >
    <div class="divide-y divide-gray-300">
      <div
        class="px-6 py-8 "
        v-if="hasHeader"
      >
        <slot name="header">
          <!--slot placeholder -->
        </slot>
      </div>
      <div
        class="px-6 py-8"
        v-if="hasContent"
      >
        <slot name="content">
          <!--slot placeholder -->
        </slot>
      </div>
      <div
        class="px-6 py-8 absolute bottom-0 w-full"
        v-if="hasFooter"
      >
        <slot name="footer">
          <!--slot placeholder -->
        </slot>
      </div>
    </div>
  </aside>
</template>
