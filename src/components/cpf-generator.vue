<template>
  <div class="vp-doc">
    <div class="input-group">
      <button @click="generateCpf" class="vp-button">
        Gerar CPF
      </button>
      <label class="checkbox-label">
        <input type="checkbox" v-model="withMask" class="vp-checkbox" />
        Gerar com pontuação
      </label>
    </div>
    <p v-if="generatedCpf" class="generated-cpf-container">
      CPF Gerado: <span class="generated-cpf-value" @click="copyToClipboard">{{ generatedCpf }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { fake } from 'validation-br/dist/cpf';
// import '@/.vitepress/theme/styles.css';

const withMask = ref(false);
const generatedCpf = ref('');
// const { copy, copied } = useClipboard();


const fakeCPF = (mask: boolean) => {
  // This is a placeholder function.
  // The actual CPF generation logic will be added later.
  return fake(mask);
};

const generateCpf = () => {
  generatedCpf.value = fakeCPF(withMask.value);
};

const copyToClipboard = () => {
  if (generatedCpf.value) {
    // copy(generatedCpf.value);
    // Optionally, provide user feedback that the CPF has been copied
    // alert('CPF copiado para a área de transferência!');
  }
};
</script>
