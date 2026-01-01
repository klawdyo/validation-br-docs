<template>
  <div class="vp-doc">
    <div class="input-group">
      <input v-model="modelValue" type="text" :placeholder="placeholder" class="vp-input" />
    </div>

    <template v-if="modelValue">
      <p v-if="isValid" class="success-message">
        {{ successMessage }}
      </p>
      <p v-else-if="successMessage" class="error-message">
        {{ errorMessage }}
      </p>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

const props = defineProps<{
  placeholder: string;
  successMessage: string;
  errorMessage: string;
  handle: () => boolean;
}>();

const modelValue = defineModel<string | undefined>();
const isValid = computed(props.handle)


</script>
