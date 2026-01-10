---
layout: doc
sidebar: true
---

# Renavam

Valida o número de um RENAVAM.

## Validador

<Validator v-model="renavamValidate"  :handle="handleValidation" 
  placeholder="Digite um Renavam para validar"
  success-message='Renavam Válido'
  error-message='Renavam Inválido'
/>

```js-vue
// Importação direta
import { isRenavam } from 'validation-br';

// Valida
isRenavam("{{renavamNumber}}"); //-> {{states.validate}}

// OU
// Importação de submódulos
import {
  validate,
  validateOrFail,
  mask,
  normalize,
} from 'validation-br/dist/renavam';

// Valida
validate("{{renavamNumber}}"); //-> {{states.validate}}
// Lança exceção caso o número seja inválido
validateOrFail("{{renavamNumber}}"); //-> {{states.validate || '⚠️ Throws ValidationBRException'}}
// Aplica uma máscara
mask("{{renavamNumber}}"); // -> "{{states.mask}}"
// Normalize o número do documento
normalize("{{renavamNumber}}"); // -> "{{states.normalize}}"
```

## Gerador

<MockGenerator
v-model="renavamData"
:config="config"
@generate="handleGenerate">
<template v-if=mockedRenavam #result>{{mockedRenavam}}</template>
</MockGenerator>

**Código**

```js-vue
// Importa a função
import {fake} from 'validation-br/dist/renavam'
// Usa
fake({{renavamData.withMask}}); // -> "{{mockedRenavam}}"
```

## Como usar?

### Importação direta

```ts
import { isRenavam } from 'validation-br';
isRenavam('14283256656'); //-> true
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
} from 'validation-br/dist/renavam';

// Valida
validate('95059845976'); //-> true
validateOrFail('95059845976'); //-> true

// Número fake com e sem máscara
fake(); // -> 95059845976
fake(true); // -> 9505984597-6

// Normaliza o número do documento
normalize('9505984597-6'); // -> 95059845976

// Aplica uma máscara
mask('95059845976'); // -> 9505984597-6

// Calcula o DV
dv('950598459'); // -> '76'
```
<script setup lang="ts">
  import MockGenerator from '@/src/components/mock/generator.vue'
  import Validator from '@/src/components/validator/validator.vue'
  import {MockFieldCheckbox} from '@/src/components/mock/field.interface.ts'
  import {fake, validate, mask, normalize} from 'validation-br/dist/renavam';
  import {ref, computed} from 'vue'
 
  interface RenavamParams { withMask: boolean }
  const renavamData = ref<RenavamParams>({ withMask: false });
  const mockedRenavam = ref<string>('')
  const renavamValidate = ref<string|undefined>();

  const config = [
    new MockFieldCheckbox('withMask', 'Com máscara')
  ];

  function handleGenerate(data: RenavamParams) {
    mockedRenavam.value = fake(data.withMask);
  }

  function handleValidation() {
    return validate(renavamValidate.value);
  }

  const renavamNumber = computed(() => renavamValidate.value || '14283256656')

  const states = computed(() => {
    return {
      validate: validate(renavamNumber.value),
      mask:  mask(renavamNumber.value) ,
      normalize:  normalize(renavamNumber.value) ,
    }
  })
</script>
