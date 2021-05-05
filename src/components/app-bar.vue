<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppBar',
  props: {
    title: {
      type: String,
      default: null
    }
  }
})
</script>

<template>
  <nav
    class="flex justify-between p-6 w-full z-10 pin-t bg-primary text-white"
  >
    <div class="left pr-8">
      <slot name="primary-action">
        <!--slot placeholder -->
      </slot>
    </div>
    <span class="center text-left font-semibold">{{ title }}</span>
    <div class="right text-right">
      <slot name="actions">
        <!--slot placeholder -->
      </slot>
    </div>
  </nav>
</template>

<style lang="less" scoped>
.left {
  flex-grow: 0;
}
.center {
  flex-grow: 4;
}
.right {
  flex-grow: 1;
}
</style>
