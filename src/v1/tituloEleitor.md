---
layout: doc
sidebar: true
---

# Título de Eleitor

Valida um título eleitoral.

## Validador

<Validator v-model="tituloEleitorValidate"  :handle="handleValidation" 
  placeholder="Digite um Título de Eleitor para validar"
  success-message='Título de Eleitor Válido'
  error-message='Título de Eleitor Inválido'
/>

```js-vue
// Importação direta
import { isTituloEleitor } from 'validation-br';

// Valida
isTituloEleitor("{{tituloEleitorNumber}}"); //-> {{states.validate}}

// OU
// Importação de submódulos
import {
  validate,
  validateOrFail,
  mask,
  normalize,
} from 'validation-br/dist/tituloEleitor';

// Valida
validate("{{tituloEleitorNumber}}"); //-> {{states.validate}}
// Lança exceção caso o número seja inválido
validateOrFail("{{tituloEleitorNumber}}"); //-> {{states.validate || '⚠️ Throws ValidationBRException'}}
// Aplica uma máscara
mask("{{tituloEleitorNumber}}"); // -> "{{states.mask}}"
// Normalize o número do documento
normalize("{{tituloEleitorNumber}}"); // -> "{{states.normalize}}"
```

## Gerador

<MockGenerator
v-model="tituloEleitorData"
:config="config"
@generate="handleGenerate">
<template v-if=mockedTituloEleitor #result>{{mockedTituloEleitor}}</template>
</MockGenerator>

**Código**

```js-vue
// Importa a função
import {fake} from 'validation-br/dist/tituloEleitor'
// Usa
fake({{tituloEleitorData.withMask}}); // -> "{{mockedTituloEleitor}}"
```

## Como usar?

### Importação direta

```ts
import { isTituloEleitor } from 'validation-br';
isTituloEleitor('743650641660'); //-> true
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
} from 'validation-br/dist/tituloEleitor';

// Valida
validate('01234567890'); //-> true
validateOrFail('01234567890'); //-> true

// Número fake com e sem máscara
fake(); // -> 153016161686
fake(true); // -> 1530.1616.1686

// Normalize o número do documento
normalize('1530.1616.1686'); // -> 153016161686

// Aplica uma máscara
mask('525028881694'); // -> 5250.2888.1694

// Calcula o DV
dv('5250288816'); // -> '94'
```
<script setup lang="ts">
  import MockGenerator from '@/src/components/mock/generator.vue'
  import Validator from '@/src/components/validator/validator.vue'
  import {MockFieldCheckbox} from '@/src/components/mock/field.interface.ts'
  import {fake, validate, mask, normalize} from 'validation-br/dist/tituloEleitor';
  import {ref, computed} from 'vue'
 
  interface TituloEleitorParams { withMask: boolean }
  const tituloEleitorData = ref<TituloEleitorParams>({ withMask: false });
  const mockedTituloEleitor = ref<string>('')
  const tituloEleitorValidate = ref<string|undefined>();

  const config = [
    new MockFieldCheckbox('withMask', 'Com máscara')
  ];

  function handleGenerate(data: TituloEleitorParams) {
    mockedTituloEleitor.value = fake(data.withMask);
  }

  function handleValidation() {
    return validate(tituloEleitorValidate.value);
  }

  const tituloEleitorNumber = computed(() => tituloEleitorValidate.value || '743650641660')

  const states = computed(() => {
    return {
      validate: validate(tituloEleitorNumber.value),
      mask:  mask(tituloEleitorNumber.value) ,
      normalize:  normalize(tituloEleitorNumber.value) ,
    }
  })
</script>
