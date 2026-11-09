<template>
  <div class="cw-window">
    <div class="cw-titlebar">
      <span class="cw-dot cw-dot-red" />
      <span class="cw-dot cw-dot-yellow" />
      <span class="cw-dot cw-dot-green" />
      <span v-if="title" class="cw-title">{{ title }}</span>
    </div>
    <pre class="cw-pre"><code class="cw-code" v-html="highlighted" /></pre>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  code: string
  title?: string
}>()

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function highlightLine(rawLine: string) {
  const line = escapeHtml(rawLine)

  const commentMatch = line.match(/^(\s*)(\/\/.*)$/)
  if (commentMatch) {
    return `${commentMatch[1]}<span class="tok-comment">${commentMatch[2]}</span>`
  }

  const trailingCommentMatch = line.match(/^(.*?)(\/\/.*)$/)
  const codePart = trailingCommentMatch ? trailingCommentMatch[1] : line
  const commentPart = trailingCommentMatch ? trailingCommentMatch[2] : ''

  let out = codePart
    .replace(/(&#39;|'|")([^'"]*?)\1/g, (_m, q, inner) => `<span class="tok-string">${q}${inner}${q}</span>`)
    .replace(/\b(import|from|const|new|return|function|export)\b/g, '<span class="tok-keyword">$1</span>')
    .replace(/\b(true|false|null|undefined)\b/g, '<span class="tok-boolean">$1</span>')
    .replace(/\b([A-Z][a-zA-Z0-9]*)\b(?=\()/g, '<span class="tok-class">$1</span>')
    .replace(/\.([a-zA-Z_][a-zA-Z0-9_]*)\b(?=\s*[;.(]|$)/g, '.<span class="tok-prop">$1</span>')

  if (commentPart) {
    out += `<span class="tok-comment">${commentPart}</span>`
  }

  return out
}

const highlighted = computed(() =>
  props.code
    .split('\n')
    .map(highlightLine)
    .join('\n')
)
</script>

<style scoped>
.cw-window {
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}

.cw-titlebar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
}

.cw-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.cw-dot-red { background: #ff5f56; }
.cw-dot-yellow { background: #ffbd2e; }
.cw-dot-green { background: #27c93f; }

.cw-title {
  margin-left: 8px;
  font-size: 12px;
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
}

.cw-pre {
  margin: 0;
  padding: 18px 20px;
  overflow-x: auto;
}

.cw-code {
  font-family: var(--vp-font-family-mono);
  font-size: 13.5px;
  line-height: 1.7;
  color: var(--vp-c-text-1);
  white-space: pre;
}

.cw-code :deep(.tok-comment) { color: var(--vp-c-text-3); font-style: italic; }
.cw-code :deep(.tok-keyword) { color: #c586c0; }
.cw-code :deep(.tok-string) { color: #22a06b; }
.cw-code :deep(.tok-boolean) { color: #d19a66; font-weight: 600; }
.cw-code :deep(.tok-class) { color: #4d9de0; font-weight: 600; }
.cw-code :deep(.tok-prop) { color: #e0a72e; }

.dark .cw-code :deep(.tok-string) { color: #7ee2a8; }
.dark .cw-code :deep(.tok-class) { color: #7cb7f5; }
</style>
