<template>
  <div class="vp-doc">
    <div class="input-group">
      <input v-model="inputValue" type="text" placeholder="Digite um CPF pra validar" class="vp-input" />
      <button @click="handleClick" class="vp-button">
        Validar
      </button>
    </div>

    <p v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </p>
    <p v-else-if="successMessage" class="success-message">
      {{ successMessage }}
    </p>
    <p v-else>
      Digite um CPF
    </p>


  </div>


</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { isCPF } from 'validation-br';
// import '@/.vitepress/theme/styles.css';

const inputValue = ref('');
const isValid = ref(false);
const isError = ref(false);

const successMessage = computed(() => inputValue.value && isCPF(inputValue.value) ? 'CPF válido' : '');
const errorMessage = computed(() => inputValue.value && !isCPF(inputValue.value) ? 'CPF inválido' : '');

const handleClick = () => {
  isValid.value = isCPF(inputValue.value);
  isError.value = false;
  // inputValue.value = '';
  isError.value = !isValid.value;

  // if (isValid.value) {
  //   // isValid.value = isCPF(inputValue.value);
  // } else {
  //   isValid.value = false;
  //   isError.value = false;
  // }
};
</script>
