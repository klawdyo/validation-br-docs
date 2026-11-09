<template>
  <div class="ah-band">
    <div class="ah-text">
      <span class="ah-eyebrow">{{ eyebrow }}</span>
      <h2 class="ah-title">{{ title }}</h2>
      <p class="ah-desc"><slot /></p>
      <a v-if="linkHref" :href="linkHref" class="ah-link">
        {{ linkText }} <span aria-hidden="true">→</span>
      </a>
    </div>
    <div class="ah-code">
      <CodeWindow :code="code" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CodeWindow from './CodeWindow.vue'

defineProps<{
  eyebrow: string
  title: string
  code: string
  linkText?: string
  linkHref?: string
}>()
</script>

<style scoped>
.ah-band {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  padding: 48px;
  border-radius: 20px;
  color: #f4f2ff;
  background: linear-gradient(135deg, #4338ca 0%, #7c3aed 55%, #db2777 100%);
}

/* Sem min-width: 0, um item de grid não encolhe além do conteúdo
   intrínseco (a linha de código), e o card inteiro estoura a largura
   da tela em vez de deixar a rolagem interna do CodeWindow assumir. */
.ah-text,
.ah-code {
  min-width: 0;
}

.ah-eyebrow {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #f0abfc;
  margin-bottom: 12px;
}

.ah-title {
  font-size: 28px;
  font-weight: 800;
  line-height: 1.25;
  margin: 0 0 14px;
  color: #ffffff;
}

.ah-desc {
  font-size: 15px;
  line-height: 1.7;
  color: #e5e1ff;
  margin: 0 0 18px;
}

.ah-desc :deep(a) {
  color: #ffffff;
  text-decoration: underline;
}

.ah-desc :deep(code) {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.18);
  border-radius: 4px;
  padding: 2px 6px;
}

.ah-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  text-decoration: none;
  padding: 10px 18px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.14);
  transition: background 0.15s ease;
}

.ah-link:hover {
  background: rgba(255, 255, 255, 0.24);
}

.ah-code :deep(.cw-window) {
  border-color: rgba(255, 255, 255, 0.18);
  background: rgba(15, 10, 40, 0.35);
}

.ah-code :deep(.cw-titlebar) {
  background: rgba(15, 10, 40, 0.35);
  border-color: rgba(255, 255, 255, 0.18);
}

.ah-code :deep(.cw-code) {
  color: #f4f2ff;
}

.ah-code :deep(.tok-comment) { color: #c7bdf0; }
.ah-code :deep(.tok-keyword) { color: #f9a8d4; }
.ah-code :deep(.tok-string) { color: #86efac; }
.ah-code :deep(.tok-boolean) { color: #fcd34d; }
.ah-code :deep(.tok-class) { color: #93c5fd; }
.ah-code :deep(.tok-prop) { color: #fde68a; }

@media (max-width: 860px) {
  .ah-band {
    grid-template-columns: 1fr;
    padding: 32px 24px;
  }
}

/* Em telas pequenas o card ocupa a largura toda (cancelando o gutter
   de 24px do HomeSection) e perde o cantos arredondados, já que
   encosta nas bordas da viewport. */
@media (max-width: 640px) {
  .ah-band {
    margin-inline: -24px;
    border-radius: 0;
    padding: 28px 20px;
  }

  .ah-link {
    display: flex;
    width: fit-content;
    margin-inline: auto;
  }
}
</style>
