---
layout: doc
sidebar: true
---

# PIS/PASEP

Valida códigos PIS, PASEP, NIS e NIT.

## Validador

<Validator v-model="pisValidate"  :handle="handleValidation" 
  placeholder="Digite um PIS/PASEP para validar"
  success-message='PIS/PASEP Válido'
  error-message='PIS/PASEP Inválido'
/>

```js-vue
// Importação direta
import { isPIS } from 'validation-br';

// Valida
isPIS("{{pisNumber}}"); //-> {{states.validate}}

// OU
// Importação de submódulos
import {
  validate,
  validateOrFail,
  mask,
  normalize,
} from 'validation-br/dist/pisPasep';

// Valida
validate("{{pisNumber}}"); //-> {{states.validate}}
// Lança exceção caso o número seja inválido
validateOrFail("{{pisNumber}}"); //-> {{states.validate || '⚠️ Throws ValidationBRException'}}
// Aplica uma máscara
mask("{{pisNumber}}"); // -> "{{states.mask}}"
// Normalize o número do documento
normalize("{{pisNumber}}"); // -> "{{states.normalize}}"
```

## Gerador

<MockGenerator
v-model="pisData"
:config="config"
@generate="handleGenerate">
<template v-if=mockedPis #result>{{mockedPis}}</template>
</MockGenerator>

**Código**

```js-vue
// Importa a função
import {fake} from 'validation-br/dist/pisPasep'
// Usa
fake({{pisData.withMask}}); // -> "{{mockedPis}}"
```

## Como usar?

### Importação direta

```ts
import { isPIS } from 'validation-br';
isPIS('71282677380'); //-> true
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
} from 'validation-br/dist/pisPasep';

// Valida
validate('71282677380'); //-> true
validateOrFail('71282677380'); //-> true

// Número fake com e sem máscara
fake(); // -> 71282677380
fake(true); // -> 712.82677.38-0

// Normalize o número do documento
normalize('712.82677.38-0'); // -> 71282677380

// Aplica uma máscara
mask('71282677380'); // -> 712.82677.38-0

// Calcula o DV
dv('7128267738'); // -> '0'
```
<script setup lang="ts">
  import MockGenerator from '@/src/components/mock/generator.vue'
  import Validator from '@/src/components/validator/validator.vue'
  import {MockFieldCheckbox} from '@/src/components/mock/field.interface.ts'
  import {fake, validate, mask, normalize} from 'validation-br/dist/pisPasep';
  import {ref, computed} from 'vue'
 
  interface PisParams { withMask: boolean }
  const pisData = ref<PisParams>({ withMask: false });
  const mockedPis = ref<string>('')
  const pisValidate = ref<string|undefined>();

  const config = [
    new MockFieldCheckbox('withMask', 'Com máscara')
  ];

  function handleGenerate(data: PisParams) {
    mockedPis.value = fake(data.withMask);
  }

  function handleValidation() {
    return validate(pisValidate.value);
  }

  const pisNumber = computed(() => pisValidate.value || '71282677380')

  const states = computed(() => {
    return {
      validate: validate(pisNumber.value),
      mask:  mask(pisNumber.value) ,
      normalize:  normalize(pisNumber.value) ,
    }
  })
</script>
