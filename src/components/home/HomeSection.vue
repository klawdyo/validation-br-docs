<template>
  <section class="hs-section">
    <div class="hs-inner">
      <span v-if="eyebrow" class="hs-eyebrow">{{ eyebrow }}</span>
      <h2 v-if="title" class="hs-title">{{ title }}</h2>
      <p v-if="$slots.description" class="hs-desc"><slot name="description" /></p>
      <div class="hs-content">
        <slot />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  eyebrow?: string
  title?: string
}>()
</script>

<style scoped>
.hs-section {
  padding: 12px 24px 56px;
}

.hs-inner {
  max-width: 1152px;
  margin: 0 auto;
}

.hs-eyebrow {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  margin-bottom: 10px;
}

.hs-title {
  font-size: 26px;
  font-weight: 800;
  line-height: 1.3;
  margin: 0 0 24px;
  color: var(--vp-c-text-1);
}

.hs-desc {
  font-size: 15px;
  color: var(--vp-c-text-2);
  margin: -12px 0 24px;
  max-width: 640px;
}
</style>
