<template>
  <div class="vp-callout" :class="`vp-callout--${type}`">
    <span class="vp-callout-badge">{{ badgeText }}</span>
    <div class="vp-callout-content"><slot /></div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    type?: 'new' | 'info' | 'warning' | 'danger'
    badge?: string
  }>(),
  {
    type: 'info',
  }
)

const defaultBadges: Record<string, string> = {
  new: 'Novidade',
  info: 'Info',
  warning: 'Atenção',
  danger: 'Perigo',
}

const badgeText = computed(() => props.badge ?? defaultBadges[props.type])
</script>

<style scoped>
.vp-callout {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin: 20px 0 28px;
  padding: 16px 18px;
  border-radius: 12px;
  border: 1px solid var(--vp-callout-border);
  background: var(--vp-callout-bg);
}

.vp-callout-badge {
  flex-shrink: 0;
  padding: 3px 10px;
  border-radius: 999px;
  background: var(--vp-callout-badge-bg);
  color: white;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}

.vp-callout-content {
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.vp-callout-content :deep(code) {
  font-size: 13px;
}

.vp-callout--new {
  --vp-callout-bg: linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(236, 72, 153, 0.12));
  --vp-callout-border: rgba(139, 92, 246, 0.35);
  --vp-callout-badge-bg: #7c3aed;
}

.vp-callout--info {
  --vp-callout-bg: rgba(59, 130, 246, 0.1);
  --vp-callout-border: rgba(59, 130, 246, 0.35);
  --vp-callout-badge-bg: #2563eb;
}

.vp-callout--warning {
  --vp-callout-bg: rgba(245, 158, 11, 0.12);
  --vp-callout-border: rgba(245, 158, 11, 0.4);
  --vp-callout-badge-bg: #d97706;
}

.vp-callout--danger {
  --vp-callout-bg: rgba(239, 68, 68, 0.12);
  --vp-callout-border: rgba(239, 68, 68, 0.4);
  --vp-callout-badge-bg: #dc2626;
}
</style>
