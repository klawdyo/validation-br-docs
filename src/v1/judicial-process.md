---
layout: doc
sidebar: true
---

# Processo Judicial

Valida números de processo da esfera judicial.

## Validador

<Validator v-model="judicialProcessValidate"  :handle="handleValidation" 
  placeholder="Digite um Processo Judicial para validar"
  success-message='Processo Judicial Válido'
  error-message='Processo Judicial Inválido'
/>

```js-vue
// Importação direta
import { isJudicialProcess } from 'validation-br';

// Valida
isJudicialProcess("{{judicialProcessNumber}}"); //-> {{states.validate}}

// OU
// Importação de submódulos
import {
  validate,
  validateOrFail,
  mask,
  normalize,
} from 'validation-br/dist/judicialProcess';

// Valida
validate("{{judicialProcessNumber}}"); //-> {{states.validate}}
// Lança exceção caso o número seja inválido
validateOrFail("{{judicialProcessNumber}}"); //-> {{states.validate || '⚠️ Throws ValidationBRException'}}
// Aplica uma máscara
mask("{{judicialProcessNumber}}"); // -> "{{states.mask}}"
// Normalize o número do documento
normalize("{{judicialProcessNumber}}"); // -> "{{states.normalize}}"
```

## Gerador

<MockGenerator
v-model="judicialProcessData"
:config="config"
@generate="handleGenerate">
<template v-if=mockedJudicialProcess #result>{{mockedJudicialProcess}}</template>
</MockGenerator>

**Código**

```js-vue
// Importa a função
import {fake} from 'validation-br/dist/judicialProcess'
// Usa
fake({{judicialProcessData.withMask}}); // -> "{{mockedJudicialProcess}}"
```

## Como usar?

### Importação direta

```ts
import { isJudicialProcess } from 'validation-br';
isJudicialProcess('20802520125150049'); //-> true
```

### Importação de submódulos

```ts
// Importação do submódulo
import {
  validate,
  mask,
  dv,
  normalize,
  fake,
  validateOrFail,
} from 'validation-br/dist/judicialProcess';

validate('00110060720168200100'); //-> true
validateOrFail('00110060720168200100'); //-> true

// Número fake com e sem máscara
fake(); // -> 00110060720168200100
fake(true); // -> 0011006-07.2016.8.20.0100

// Aplica uma máscara
mask('00110060720168200100'); // -> 0011006-07.2016.8.20.0100

// Normalize o número do documento
normalize('0011006-07.2016.8.20.0100'); // -> 00110060720168200100

// Calcula o DV.
// Obs.: Antes do cálculo, é necessário que o número do processo não possua o dígito verificador para que o resultado seja correto. Isso é necessário pois o DV fica no meio da numeração, na posição 8 e 9.
dv('001100620168200100'); // -> '07'
```
<script setup lang="ts">
  import MockGenerator from '@/src/components/mock/generator.vue'
  import Validator from '@/src/components/validator/validator.vue'
  import {MockFieldCheckbox} from '@/src/components/mock/field.interface.ts'
  import {fake, validate, mask, normalize} from 'validation-br/dist/judicialProcess';
  import {ref, computed} from 'vue'
 
  interface JudicialProcessParams { withMask: boolean }
  const judicialProcessData = ref<JudicialProcessParams>({ withMask: false });
  const mockedJudicialProcess = ref<string>('')
  const judicialProcessValidate = ref<string|undefined>();

  const config = [
    new MockFieldCheckbox('withMask', 'Com máscara')
  ];

  function handleGenerate(data: JudicialProcessParams) {
    mockedJudicialProcess.value = fake(data.withMask);
  }

  function handleValidation() {
    return validate(judicialProcessValidate.value);
  }

  const judicialProcessNumber = computed(() => judicialProcessValidate.value || '20802520125150049')

  const states = computed(() => {
    return {
      validate: validate(judicialProcessNumber.value),
      mask:  mask(judicialProcessNumber.value) ,
      normalize:  normalize(judicialProcessNumber.value) ,
    }
  })
</script>
