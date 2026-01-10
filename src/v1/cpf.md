---
layout: doc
sidebar: true
---

# CPF

Validador para números de CPF (Cadastro de Pessoas Físicas).

## Validador

<Validator v-model="cpfValidate"  :handle="handleValidation" 
  placeholder="Digite um CPF para validar"
  success-message='CPF Válido'
  error-message='CPF Inválido'
/>

```js-vue

// Importação direta
import { isCPF } from 'validation-br';

// Valida
isCPF("{{cpfNumber}}"); //-> {{states.validate}}

// OU
// Importação de submódulos
import {
  validate,
  validateOrFail,
  mask,
  normalize,
} from 'validation-br/dist/cpf';

// Valida
validate("{{cpfNumber}}"); //-> {{states.validate}}
// Lança exceção caso o número seja inválido
validateOrFail("{{cpfNumber}}"); //-> {{states.validate || '⚠️ Throws ValidationBRException'}}
// Aplica uma máscara
mask("{{cpfNumber}}"); // -> "{{states.mask}}"
// Normalize o número do documento
normalize("{{cpfNumber}}"); // -> "{{states.normalize}}"
```

## Gerador

<!-- <Generator button-label="Gerar CPF" :callback="fake" :checkboxes="generatorCheckboxes" /> -->

<MockGenerator
v-model="cpfData"
:config="config"
@generate="handleGenerate">
<template v-if=mockedCpf #result>{{mockedCpf}}</template>
</MockGenerator>

**Código**

```js-vue
// Importa a função
import {fake} from 'validation-br/dist/cpf'
// Usa
fake({{cpfData.withMask}}); // -> "{{mockedCpf}}"
```


## Como usar?

### Importação direta

```ts
import { isCPF } from 'validation-br';

const result = isCPF('280.012.389-38'); // -> true
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
} from 'validation-br/dist/cpf';

// Valida
validate('01234567890'); //-> true

// Lança exceção caso o número seja inválido
validateOrFail('01234567890'); //-> true

// Número fake sem máscara
fake(); // -> 01234567891

// Número fake com máscara
fake(true); // -> 012.345.678-91

// Aplica uma máscara
mask('01234567890'); // -> 012.345.678-90

// Normalize o número do documento
normalize('012.345.678-90'); // -> 01234567890

// Calcula o DV
dv('012345678'); // -> '90'
```

## Como é o Cálculo? <Badge type="info" text="^1.9.0" />

```
- Os caracteres 1 a 8 são números sequenciais definidos pela Receita Federal
- O caractere 9 refere-se à região fiscal emissora do documento
   1 – DF, GO, MS, MT e TO
   2 – AC, AM, AP, PA, RO e RR
   3 – CE, MA e PI
   4 – AL, PB, PE, RN
   5 – BA e SE
   6 – MG
   7 – ES e RJ
   8 – SP
   9 – PR e SC
   0 – RS
- Os caracteres 10 e 11 são dígitos verificadores.

1) Partes do número
------------------------------------------------
| Número                       | R |  DV  |
 2   8   0 . 0   1   2 . 3   8   9 - 3   8

2) Cálculo do primeiro DV.
 - Soma-se o produto das algarismos 1 a 9 pelos
  números 10, 9, 8, 7, 6, 5, 4, 3, 2

   2   8   0   0   1   2   3   8   9
   x   x   x   x   x   x   x   x   x
  10   9   8   7   6   5   4   3   2
= 20 +72  +0  +0  +6 +10 +12 +24 +18 = 162

 - O somatório encontrado é dividido por 11 e o resultado é subtraído de 11
   162 / 11 tem resto 8. 11 - 8 = 3. DV1 é 3.
   Obs.: Caso o cálculo de DV1 retorne 10, o resultado será 0.

3) Cálculo do segundo DV.
 - Soma-se o produto das algarismos 1 a 10
  pelos números 11, 10, 9, 8, 7, 6, 5, 4, 3, 2

   2   8   0   0   1   2   3   8   9   3
   x   x   x   x   x   x   x   x   x   x
  11  10   9   8   7   6   5   4   3   2
= 22 +80  +0  +0  +7 +12 +15 +32 +27 = 201

 - O somatório encontrado é dividido por 11 e o resultado é subtraído de 11
   201 / 11 tem resto 3. 11 - 3 = 8. DV2 é 8.
   Obs.: Caso o cálculo de DV2 retorne 10, o resultado será 0.

```

<!-- {{ Shared.versions }} -->

<script setup lang="ts">
  // import Shared from '@/.vitepress/shared.ts'
  import CPFValidator from '@/src/components/cpf-validate-form.vue'
  import CPFGenerator from '@/src/components/cpf-generator.vue'
  import MockGenerator from '@/src/components/mock/generator.vue'
  import Validator from '@/src/components/validator/validator.vue'
  import {MockFieldCheckbox, MockFieldSelect} from '@/src/components/mock/field.interface.ts'
  import {fake, validate, mask, normalize} from 'validation-br/dist/cpf';
  import {isCPF} from 'validation-br';
  import {ref, computed} from 'vue'
 
interface CpfParams { withMask: boolean }
const cpfData = ref<CpfParams>({ withMask: false });
const mockedCpf = ref<string>('')
const cpfValidate = ref<string|undefined>();

const config = [
  new MockFieldCheckbox('withMask', 'Com máscara')
];

function handleGenerate(data: CpfParams) {
  mockedCpf.value = fake(data.withMask);
}

function handleValidation() {
  return validate(cpfValidate.value);
}

const cpfNumber = computed(() => cpfValidate.value || '01234567890')

const states = computed(() => {
  return {
    validate: validate(cpfNumber.value),
    mask:  mask(cpfNumber.value) ,
    normalize:  normalize(cpfNumber.value) ,
  }
})


</script>
