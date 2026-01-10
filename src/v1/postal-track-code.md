---
layout: doc
sidebar: true
---

# Código de Rastreamento Postal

Valida um código de rastreamento de objetos postais.

## Validador

<Validator v-model="postalCodeValidate"  :handle="handleValidation" 
  placeholder="Digite um Código de Rastreamento Postal para validar"
  success-message='Código de Rastreamento Postal Válido'
  error-message='Código de Rastreamento Postal Inválido'
/>

```js-vue
// Importação direta
import { isPostalCode } from 'validation-br';

// Valida
isPostalCode("{{postalCodeNumber}}"); //-> {{states.validate}}

// OU
// Importação de submódulos
import {
  validate,
  validateOrFail,
  mask,
  normalize,
} from 'validation-br/dist/postalCode';

// Valida
validate("{{postalCodeNumber}}"); //-> {{states.validate}}
// Lança exceção caso o número seja inválido
validateOrFail("{{postalCodeNumber}}"); //-> {{states.validate || '⚠️ Throws ValidationBRException'}}
// Aplica uma máscara
mask("{{postalCodeNumber}}"); // -> "{{states.mask}}"
// Normalize o número do documento
normalize("{{postalCodeNumber}}"); // -> "{{states.normalize}}"
```

## Gerador

<MockGenerator
v-model="postalCodeData"
:config="config"
@generate="handleGenerate">
<template v-if=mockedPostalCode #result>{{mockedPostalCode}}</template>
</MockGenerator>

**Código**

```js-vue
// Importa a função
import {fake} from 'validation-br/dist/postalCode'
// Usa
fake({{postalCodeData.withMask}}); // -> "{{mockedPostalCode}}"
```

## Como usar?

### Importação direta

```ts
import { isPostalCode } from 'validation-br';
isPostalCode('PN718252423BR'); //-> true
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
} from 'validation-br/dist/postalCode';

// Valida
validate('PN718252423BR'); //-> true
validateOrFail('PN718252423BR'); //-> true

// Número fake com e sem máscara.
fake(); // -> PN718252423BR
fake(true); // -> PN718252423BR

// Aplica uma máscara
// No caso de PostalCode, a máscara apenas coloca as letras em maiúsculas, servindo como normalização
mask('pn718252423br'); // -> PN718252423BR

// Normalize o número do documento
normalize('pn718252423br'); // -> PN718252423BR

// Calcula o DV
dv('PN718252423BR'); // -> '3'
```
<script setup lang="ts">
  import MockGenerator from '@/src/components/mock/generator.vue'
  import Validator from '@/src/components/validator/validator.vue'
  import {MockFieldCheckbox} from '@/src/components/mock/field.interface.ts'
  import {fake, validate, mask, normalize} from 'validation-br/dist/postalCode';
  import {ref, computed} from 'vue'
 
  interface PostalCodeParams { withMask: boolean }
  const postalCodeData = ref<PostalCodeParams>({ withMask: false });
  const mockedPostalCode = ref<string>('')
  const postalCodeValidate = ref<string|undefined>();

  const config = [
    new MockFieldCheckbox('withMask', 'Com máscara')
  ];

  function handleGenerate(data: PostalCodeParams) {
    mockedPostalCode.value = fake(data.withMask);
  }

  function handleValidation() {
    return validate(postalCodeValidate.value);
  }

  const postalCodeNumber = computed(() => postalCodeValidate.value || 'PN718252423BR')

  const states = computed(() => {
    return {
      validate: validate(postalCodeNumber.value),
      mask:  mask(postalCodeNumber.value) ,
      normalize:  normalize(postalCodeNumber.value) ,
    }
  })
</script>
