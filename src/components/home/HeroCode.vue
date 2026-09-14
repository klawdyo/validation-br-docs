<template>
  <div class="hc-wrap">
    <CodeWindow :code="code" />
  </div>
</template>

<script lang="ts" setup>
import CodeWindow from './CodeWindow.vue'

defineProps<{
  code: string
}>()
</script>

<style scoped>
.hc-wrap {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
}

.hc-wrap :deep(.cw-window) {
  box-shadow: 0 24px 48px -24px rgba(99, 102, 241, 0.35);
}

@media (min-width: 960px) {
  .hc-wrap {
    max-width: 460px;
  }
}
</style>
