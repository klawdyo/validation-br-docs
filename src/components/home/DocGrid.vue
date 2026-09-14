<template>
  <div class="dg-wrap">
    <div class="dg-cards">
      <button
        v-for="d in docs"
        :key="d.id"
        type="button"
        class="dg-card"
        :class="{ active: selected === d.id }"
        @click="selected = d.id"
      >
        <span class="dg-card-tag">{{ d.tag }}</span>
        <strong class="dg-card-title">{{ d.title }}</strong>
        <span class="dg-card-details">{{ d.details }}</span>
      </button>
    </div>

    <div class="dg-preview">
      <CodeWindow :code="current.code" :title="current.tag" />
      <a :href="current.href" class="dg-more">
        Ver documentação de {{ current.title }}
        <span aria-hidden="true">→</span>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import CodeWindow from './CodeWindow.vue'

export interface DocGridItem {
  id: string
  tag: string
  title: string
  details: string
  code: string
  href: string
}

const props = defineProps<{
  docs: DocGridItem[]
  initial?: string
}>()

const selected = ref(props.initial ?? props.docs[0]?.id)

const current = computed(
  () => props.docs.find((d) => d.id === selected.value) ?? props.docs[0]
)
</script>

<style scoped>
.dg-wrap {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.dg-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 14px;
}

.dg-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  text-align: left;
  padding: 16px 18px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
  font: inherit;
  color: inherit;
}

.dg-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.dg-card.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft, var(--vp-c-bg-alt));
  box-shadow: 0 8px 20px -14px var(--vp-c-brand-1);
}

.dg-card-tag {
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.dg-card-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.dg-card-details {
  font-size: 13px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.dg-preview {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dg-more {
  align-self: flex-start;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.dg-more:hover {
  text-decoration: underline;
}

/* Em telas pequenas, com muitos cards empilhados verticalmente, o preview
   do código ficava só depois de rolar a lista inteira. Vira uma faixa de
   rolagem horizontal com altura fixa (uma linha de cards), então o preview
   sempre aparece logo abaixo, sem precisar descer a página toda. */
@media (max-width: 640px) {
  .dg-cards {
    display: flex;
    grid-template-columns: unset;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: 6px;
    margin-inline: -24px;
    padding-inline: 24px;
    -webkit-overflow-scrolling: touch;
  }

  .dg-card {
    flex: 0 0 auto;
    /* largura menor que 100% pra deixar o próximo card espiando na borda */
    width: 82%;
    scroll-snap-align: start;
  }
}
</style>
