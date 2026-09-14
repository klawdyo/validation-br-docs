<template>
  <div class="doc-playground">
    <div class="dp-tabs" role="tablist">
      <button
        class="dp-tab"
        :class="{ active: tab === 'validate' }"
        role="tab"
        @click="tab = 'validate'"
      >
        Validar
      </button>
      <button
        class="dp-tab"
        :class="{ active: tab === 'generate' }"
        role="tab"
        @click="tab = 'generate'"
      >
        {{ props.generateLabel }}
      </button>
    </div>

    <div class="dp-panel">
      <div v-show="tab === 'validate'" class="dp-validate">
        <input
          v-model="inputValue"
          type="text"
          class="dp-input"
          :placeholder="props.placeholder"
        />
        <template v-if="inputValue">
          <p v-if="isValid" class="dp-message dp-success">{{ props.validLabel }}</p>
          <p v-else class="dp-message dp-error">{{ props.invalidLabel }}</p>
        </template>
      </div>

      <div v-show="tab === 'generate'" class="dp-generate">
        <div class="dp-result-label">
          <span class="dp-result-label-text">{{ props.generateLabel }}</span>
          <div class="dp-result-actions">
            <label v-if="props.secondaryOptionLabel" class="dp-checkbox-sm">
              <input type="checkbox" v-model="secondaryOption" @change="handleGenerate" />
              {{ props.secondaryOptionLabel }}
            </label>
            <label v-if="props.showMaskOption" class="dp-checkbox-sm">
              <input type="checkbox" v-model="withMask" @change="handleGenerate" />
              Máscara
            </label>
            <button
              class="dp-icon-button"
              type="button"
              title="Gerar novamente"
              aria-label="Gerar novamente"
              @click="handleGenerate"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                <polyline points="21 3 21 9 15 9" />
              </svg>
            </button>
          </div>
        </div>
        <p class="dp-result">{{ generated }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    placeholder?: string
    validLabel?: string
    invalidLabel?: string
    generateLabel?: string
    showMaskOption?: boolean
    secondaryOptionLabel?: string
    validate: (value: string) => boolean
    generate: (withMask: boolean, secondaryOption: boolean) => string
  }>(),
  {
    placeholder: 'Digite um valor para validar',
    validLabel: 'Válido',
    invalidLabel: 'Inválido',
    generateLabel: 'Gerar exemplo',
    showMaskOption: true,
  }
)

const tab = ref<'validate' | 'generate'>('validate')
const inputValue = ref('')
const withMask = ref(true)
const secondaryOption = ref(false)
const generated = ref('')

const isValid = computed(() => {
  try {
    return props.validate(inputValue.value)
  } catch {
    return false
  }
})

function handleGenerate() {
  generated.value = props.generate(withMask.value, secondaryOption.value)
}

handleGenerate()
</script>

<style scoped>
.doc-playground {
  margin: 24px 0 32px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.dp-tabs {
  display: flex;
  border-bottom: 1px solid var(--vp-c-divider);
}

.dp-tab {
  flex: 1;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: background 0.15s, color 0.15s;
}

.dp-tab:hover {
  background: var(--vp-c-bg-alt);
}

.dp-tab.active {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
  box-shadow: inset 0 -2px 0 var(--vp-c-brand-1);
}

.dp-panel {
  padding: 20px;
}

.dp-input {
  width: 100%;
  padding: 10px 14px;
  font-size: 15px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.dp-message {
  margin-top: 10px;
  font-weight: 600;
}

.dp-success {
  color: #16a34a;
}

.dp-error {
  color: #dc2626;
}

.dp-generate-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.dp-button {
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  background: var(--vp-c-brand-1);
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.dp-button:hover {
  opacity: 0.9;
}

.dp-checkbox {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.dp-result-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 6px;
}

.dp-result-label-text {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.dp-result-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dp-checkbox-sm {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  user-select: none;
}

.dp-checkbox-sm input {
  width: 13px;
  height: 13px;
}

.dp-icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.dp-icon-button:hover {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.dp-result {
  margin-top: 0;
  padding: 10px 14px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  font-family: var(--vp-font-family-mono);
  font-size: 15px;
}
</style>
