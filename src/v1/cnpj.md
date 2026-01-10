---
layout: doc
sidebar: true
---

# CNPJ

Validador para números de CNPJ (Cadastro Nacional de Pessoas Jurídicas).

## Validador

<Validator v-model="cnpjValidate"  :handle="handleValidation" 
  placeholder="Digite um CNPJ para validar"
  success-message='CNPJ Válido'
  error-message='CNPJ Inválido'
/>

```js-vue
// Importação direta
import { isCNPJ } from 'validation-br';

// Valida
isCNPJ("{{cnpjNumber}}"); //-> {{states.validate}}

// OU
// Importação de submódulos
import {
  validate,
  validateOrFail,
  mask,
  normalize,
} from 'validation-br/dist/cnpj';

// Valida
validate("{{cnpjNumber}}"); //-> {{states.validate}}
// Lança exceção caso o número seja inválido
validateOrFail("{{cnpjNumber}}"); //-> {{states.validate || '⚠️ Throws ValidationBRException'}}
// Aplica uma máscara
mask("{{cnpjNumber}}"); // -> "{{states.mask}}"
// Normalize o número do documento
normalize("{{cnpjNumber}}"); // -> "{{states.normalize}}"
```

## Gerador

<MockGenerator
v-model="cnpjData"
:config="config"
@generate="handleGenerate">
<template v-if=mockedCnpj #result>{{mockedCnpj}}</template>
</MockGenerator>

**Código**

```js-vue
// Importa a função
import {fake} from 'validation-br/dist/cnpj'
// Usa
fake({{cnpjData}}); // -> "{{mockedCnpj}}"
```

## Como usar?

### Importação direta

```ts
import { isCNPJ } from 'validation-br';

const result = isCNPJ('73.797.980/0001-79'); // -> true
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
} from 'validation-br/dist/cnpj';

// Valida
validate('99362238000180'); //-> true
validateOrFail('99362238000180'); //-> true

// Número fake com e sem máscara
fake(); // -> 55585709000198
fake(true); // -> 55.585.709/0001-98
fake({ withMask: true }); // -> 55.585.709/0001-98
fake({ withMask: true, alphanumeric: true }); // -> A1.222.333/0001-50
fake({ withMask: false, alphanumeric: true }); // -> A1222333/0001-50

// Aplica uma máscara
mask('99362238000180'); // -> 99.362.238/0001-80

// Normalize o número do documento
normalize('99.362.238/0001-80'); // -> 99362238000180

// Calcula o DV
dv('993622380001'); // -> '80'
```
<script setup lang="ts">
  import MockGenerator from '@/src/components/mock/generator.vue'
  import Validator from '@/src/components/validator/validator.vue'
  import {MockFieldCheckbox} from '@/src/components/mock/field.interface.ts'
  import {fake, validate, mask, normalize} from 'validation-br/dist/cnpj';
  import {ref, computed} from 'vue'
 
  interface CnpjParams { withMask: boolean, alphanumeric: boolean }
  const cnpjData = ref<CnpjParams>({ withMask: false, alphanumeric: false });
  const mockedCnpj = ref<string>('')
  const cnpjValidate = ref<string|undefined>();

  const config = [
    new MockFieldCheckbox('withMask', 'Com máscara'),
    new MockFieldCheckbox('alphanumeric', 'Alfanumérico')
  ];

  function handleGenerate(data: CnpjParams) {
    mockedCnpj.value = fake(data);
  }

  function handleValidation() {
    return validate(cnpjValidate.value);
  }

  const cnpjNumber = computed(() => cnpjValidate.value || '73797980000179')

  const states = computed(() => {
    return {
      validate: validate(cnpjNumber.value),
      mask:  mask(cnpjNumber.value) ,
      normalize:  normalize(cnpjNumber.value) ,
    }
  })
</script>