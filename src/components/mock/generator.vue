<template>
  <div>
    <div class="tip custom-block">


      <div v-for="field in config" :key="field.key" class="field-group">
        <label class="checkbox-label">
          {{ field.label }}:

          <select v-if="field.type === 'select'" v-model="modelValue![field.key]">
            <option v-for="opt in field.options" :key="opt" :value="opt">
              {{ opt }}
            </option>
          </select>

          <input v-else type="checkbox" class="vp-checkbox" v-model="modelValue![field.key]" />
        </label>
      </div>

      <button class="vp-button" @click="handleClick">Gerar</button>
    </div>

    
    <strong>Resultado</strong>
    <div v-if="$slots.result" class="tip custom-block">
      <div style="text-align: center; font-weight: bold;">
        <button type="button" @click="handleCopy" style="margin-right:10px"><i class="lucide:copy" /></button>
        <slot name="result"></slot>
      </div>
    </div>
    <div v-else class="placeholder" style="color: var(--vp-c-text-3); font-style: italic;">
      <slot name="placeholder">Clique no botão para gerar um número válido.</slot>
    </div>


  </div>


  <!--  -->
  <!-- 
    <div class="input-group">
      <label v-for="checkbox in checkboxes" class="checkbox-label">
        <input type="checkbox" v-model="options[checkbox.varName]" class="vp-checkbox" />
        {{ checkbox.text }}
      </label>
    </div>




    <div class="input-group">
      <button @click="onGeneratorClick" class="vp-button">
        {{ buttonLabel }}
      </button>
    </div>


    <h3>Resultado</h3>
    <div v-if="generatedCpf" class="tip custom-block">
      <span class="generated-cpf-value" @click="copyToClipboard">{{ generatedCpf }}</span>
    </div>

    <h3>Código</h3>
    <pre class="tip custom-block">
import { fake } from 'validation-br/dist/cpf';
fake({{ options }})
    </pre> -->

</template>

<script lang="ts" setup>

import { onMounted, ref, useSlots } from 'vue';
import { MockField, MockState } from './field.interface';


const modelValue = defineModel<MockState>();

const props = defineProps<{
  config: MockField[];
  // modelValue: T; // O estado atual vindo do pai
}>();

const result = useSlots().result;

const emit = defineEmits<{
  // (e: 'update:modelValue', value: MockState): void;
  (e: 'generate', value: MockState): void;
}>();

// const result = ref<string>('');

function handleClick() {
  emit('generate', modelValue.value || {});
}

function handleCopy(){
  const textToCopy = result && result()[0].children as string;
  console.log('handlecopy', result && result()[0].children );
  if(textToCopy){
    // const textToCopy = result()[0].children as string;
    
    navigator.clipboard.writeText(textToCopy);
  }
}

// Inicializa o v-model com os valores padrão da config se estiver vazio
onMounted(() => {
  const initialState = {} as MockState;



  if (modelValue.value != undefined && Object.keys(modelValue.value).length === 0) {
    props.config.forEach(f => {
      initialState[f.key as keyof MockState] = f.value;
    });
    // emit('update:modelValue', initialState);
  }

  modelValue.value = initialState;
});

// const updateField = (key: string, value: any) => {
//   emit('update:modelValue', {
//     ...props.modelValue,
//     [key]: value
//   });
// };


// import { ref } from 'vue';
// import { useClipboard } from '@vueuse/core';
// import { IGeneratorCheckboxItem } from './field.interface';

// defineOptions({ name: 'MockGenerator' });

// const props = defineProps<{
//   buttonLabel: string;
//   checkboxes: IGeneratorCheckboxItem[]
//   // withMask: boolean
//   callback: (options: any) => string
// }>()

// const { copy, copied } = useClipboard();

// const withMask = ref(false);
// const generatedCpf = ref('');
// const options = ref<{ [key: string]: boolean }>({});


// // const fakeCPF = (mask: boolean) => {
// //   // This is a placeholder function.
// //   // The actual CPF generation logic will be added later.
// //   return fake(mask);
// // };

// const onGeneratorClick = () => {
//   generatedCpf.value = props.callback(options.value['withMask'])
// };

// const copyToClipboard = () => {
//   if (generatedCpf.value) {
//     copy(generatedCpf.value);
//     // Optionally, provide user feedback that the CPF has been copied
//     // alert('CPF copiado para a área de transferência!');
//   }
// };
</script>

<style>
  .checkbox-label {
    display: inline-block;
    margin-right: 15px;
    width: 200px;
  }
</style>