<script setup lang="ts">
import { useRouter } from 'vitepress'
import { ref, onMounted } from 'vue'

const router = useRouter()
const version = ref('2.0')

onMounted(() => {
  // Detectar versão atual baseado no pathname
  if (window.location.pathname.includes('/v1/')) {
    version.value = '1.0'
  } else {
    version.value = '2.0'
  }
})

const handleVersionChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  if (target.value === '1.0') {
    window.location.href = '/v1/'
  } else {
    window.location.href = '/'
  }
}
</script>

<template>
  <select :value="version" @change="handleVersionChange" class="version-selector">
    <option value="2.0">v2.0 (atual)</option>
    <option value="1.0">v1.0 (legada)</option>
  </select>
</template>

<style scoped>
.version-selector {
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.version-selector:hover {
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-mute);
}

.version-selector:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 2px var(--vp-c-brand-dimm);
}
</style>
