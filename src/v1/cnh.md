---
layout: doc
sidebar: true
---

# CNH

Validador para números de CNH (Carteira Nacional de Habilitação).

## Validador

<Validator v-model="cnhValidate"  :handle="handleValidation" 
  placeholder="Digite uma CNH para validar"
  success-message='CNH Válida'
  error-message='CNH Inválida'
/>

```js-vue
// Importação direta
import { isCNH } from 'validation-br';

// Valida
isCNH("{{cnhNumber}}"); //-> {{states.validate}}

// OU
// Importação de submódulos
import {
  validate,
  validateOrFail,
  mask,
  normalize,
} from 'validation-br/dist/cnh';

// Valida
validate("{{cnhNumber}}"); //-> {{states.validate}}
// Lança exceção caso o número seja inválido
validateOrFail("{{cnhNumber}}"); //-> {{states.validate || '⚠️ Throws ValidationBRException'}}
// Aplica uma máscara
mask("{{cnhNumber}}"); // -> "{{states.mask}}"
// Normalize o número do documento
normalize("{{cnhNumber}}"); // -> "{{states.normalize}}"
```

## Gerador

<MockGenerator
v-model="cnhData"
:config="config"
@generate="handleGenerate">
<template v-if=mockedCnh #result>{{mockedCnh}}</template>
</MockGenerator>

**Código**

```js-vue
// Importa a função
import {fake} from 'validation-br/dist/cnh'
// Usa
fake({{cnhData.withMask}}); // -> "{{mockedCnh}}"
```

## Como usar?

### Importação direta

```ts
import { isCNH } from 'validation-br';

const result = isCNH('69044271146'); // -> true
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
} from 'validation-br/dist/cnh';

// Valida
validate('624729276-37'); //-> true

// Lança exceção caso o número seja inválido
validateOrFail('62472927637'); //-> true

// Número fake sem máscara
fake(); // -> 62472927637

// Número fake com máscara
fake(true); // -> 624729276-37

// Aplica uma máscara
mask('62472927637'); // -> 624729276-37

// Normalize o número do documento
normalize('624729276-37'); // -> 62472927637

// Calcula o DV
dv('624729276'); // -> '37'
```
<script setup lang="ts">
  import MockGenerator from '@/src/components/mock/generator.vue'
  import Validator from '@/src/components/validator/validator.vue'
  import {MockFieldCheckbox} from '@/src/components/mock/field.interface.ts'
  import {fake, validate, mask, normalize} from 'validation-br/dist/cnh';
  import {ref, computed} from 'vue'
 
  interface CnhParams { withMask: boolean }
  const cnhData = ref<CnhParams>({ withMask: false });
  const mockedCnh = ref<string>('')
  const cnhValidate = ref<string|undefined>();

  const config = [
    new MockFieldCheckbox('withMask', 'Com máscara')
  ];

  function handleGenerate(data: CnhParams) {
    mockedCnh.value = fake(data.withMask);
  }

  function handleValidation() {
    return validate(cnhValidate.value);
  }

  const cnhNumber = computed(() => cnhValidate.value || '69044271146')

  const states = computed(() => {
    return {
      validate: validate(cnhNumber.value),
      mask:  mask(cnhNumber.value) ,
      normalize:  normalize(cnhNumber.value) ,
    }
  })
</script>