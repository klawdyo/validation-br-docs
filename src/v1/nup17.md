---
layout: doc
sidebar: true
---

# NUP-17

Válida um Número Unificado de Protocolo de 17 dígitos.

## Validador

<Validator v-model="nup17Validate"  :handle="handleValidation" 
  placeholder="Digite um NUP-17 para validar"
  success-message='NUP-17 Válido'
  error-message='NUP-17 Inválido'
/>

```js-vue
// Importação direta
import { isNUP17 } from 'validation-br';

// Valida
isNUP17("{{nup17Number}}"); //-> {{states.validate}}

// OU
// Importação de submódulos
import {
  validate,
  validateOrFail,
  mask,
  normalize,
} from 'validation-br/dist/nup17';

// Valida
validate("{{nup17Number}}"); //-> {{states.validate}}
// Lança exceção caso o número seja inválido
validateOrFail("{{nup17Number}}"); //-> {{states.validate || '⚠️ Throws ValidationBRException'}}
// Aplica uma máscara
mask("{{nup17Number}}"); // -> "{{states.mask}}"
// Normalize o número do documento
normalize("{{nup17Number}}"); // -> "{{states.normalize}}"
```

## Gerador

<MockGenerator
v-model="nup17Data"
:config="config"
@generate="handleGenerate">
<template v-if=mockedNup17 #result>{{mockedNup17}}</template>
</MockGenerator>

**Código**

```js-vue
// Importa a função
import {fake} from 'validation-br/dist/nup17'
// Usa
fake({{nup17Data.withMask}}); // -> "{{mockedNup17}}"
```

## Como usar?

### Importação direta

```ts
import { isNUP17 } from 'validation-br';

const result = isNUP17('23037001462202165'); // -> true
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
} from 'validation-br/dist/nup17';

// Valida
validate('23037.001462/2021-65'); //-> true
validateOrFail('23037.001462/2021-65'); //-> true

// Número fake com e sem máscara
fake(); // -> 23037001462202165
fake(true); // -> 23037.001462/2021-65

// Aplica uma máscara
mask('23037001462202165'); // -> 23037.001462/2021-65

// Normalize o número do documento
normalize('23037.001462/2021-65'); // -> 23037001462202165

// Calcula o DV
dv('230370014622021'); // -> '65'
```
<script setup lang="ts">
  import MockGenerator from '@/src/components/mock/generator.vue'
  import Validator from '@/src/components/validator/validator.vue'
  import {MockFieldCheckbox} from '@/src/components/mock/field.interface.ts'
  import {fake, validate, mask, normalize} from 'validation-br/dist/nup17';
  import {ref, computed} from 'vue'
 
  interface Nup17Params { withMask: boolean }
  const nup17Data = ref<Nup17Params>({ withMask: false });
  const mockedNup17 = ref<string>('')
  const nup17Validate = ref<string|undefined>();

  const config = [
    new MockFieldCheckbox('withMask', 'Com máscara')
  ];

  function handleGenerate(data: Nup17Params) {
    mockedNup17.value = fake(data.withMask);
  }

  function handleValidation() {
    return validate(nup17Validate.value);
  }

  const nup17Number = computed(() => nup17Validate.value || '23037001462202165')

  const states = computed(() => {
    return {
      validate: validate(nup17Number.value),
      mask:  mask(nup17Number.value) ,
      normalize:  normalize(nup17Number.value) ,
    }
  })
</script>
