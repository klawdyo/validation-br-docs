---
layout: doc
sidebar: true
---

# CPF

Validador para números de CPF (Cadastro de Pessoas Físicas).

## Validador

<CPFValidator />

## Gerador

<!-- <Generator button-label="Gerar CPF" :callback="fake" :checkboxes="generatorCheckboxes" /> -->

<MockGenerator
v-model="cpfData"
:config="config"
@generate="handleGenerate"
>
  <template v-if=mockedCpf #result>{{mockedCpf}}</template>
</MockGenerator>

**Código**

```js-vue
// Importa a função
import {fake} from 'validation-br/dist/cpf'
// Usa
fake({{cpfData.withMask}});
```

{{cpfData}}

## Como usar?

### Importação direta

```js
import { isCPF } from "validation-br";

const result = isCPF("280.012.389-38"); // -> true
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
} from "validation-br/dist/cpf";

// Valida
validate("01234567890"); //-> true

// Lança exceção caso o número seja inválido
validateOrFail("01234567890"); //-> true

// Número fake sem máscara
fake(); // -> 01234567891

// Número fake com máscara
fake(true); // -> 012.345.678-91

// Aplica uma máscara
mask("01234567890"); // -> 012.345.678-90

// Normalize o número do documento
normalize("012.345.678-90"); // -> 01234567890

// Calcula o DV
dv("012345678"); // -> '90'
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
  import {MockFieldCheckbox, MockFieldSelect} from '@/src/components/mock/field.interface.ts'
  import {fake} from 'validation-br/dist/cpf';
  import {ref} from 'vue'

  // const generatorCheckboxes: IGeneratorCheckboxItem[] = [
  //   { text: 'Gerar com pontuação', varName: 'withMask', value: false,  },
  // ]
  // function onClickGenerator(){
  //   fake()
  // }
  
interface CpfParams { withMask: boolean }
const cpfData = ref<CpfParams>({ withMask: false });
const mockedCpf = ref<string>('')

const config = [
  new MockFieldCheckbox('withMask', 'Com máscara'),
  new MockFieldSelect('uf', 'estado', ['rn', 'sp'])
  // new MockFieldCheckbox('meupa', 'tabaco'),
  // { key: 'withMask', label: 'Com máscara', value: false },
  // { key: 'alpha', label: 'Alfanumérico', value: false },
];

function handleGenerate(data: CpfParams) {
  // O TS sabe que data.withMask existe e é boolean
  mockedCpf.value = fake(data.withMask);
  console.log(mockedCpf.value);
}



</script>
