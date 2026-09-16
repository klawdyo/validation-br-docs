---
outline: deep
title: Título de Eleitor — validação em JS e TS (v1)
description: Valide, formate e gere números de título de eleitor em JavaScript e TypeScript com a API legada 1.x da validation-br, para Node.js e navegador.
---

# Título de Eleitor

Confira o dígito verificador do título de eleitor em JavaScript.

Números de título de eleitor têm 12 dígitos, sendo os dígitos 9-10 a UF de emissão e os 2 últimos os dígitos verificadores. Esta página documenta a API de funções soltas (`isTituloEleitor`, `mask`, `fake`...) da versão 1.x da `validation-br`, biblioteca JavaScript para Node.js e navegador. As funções abaixo cobrem validação, formatação, normalização e criação de títulos fake para testes. Para projetos novos, veja a [versão 2.0](/v2/tituloEleitor), com API orientada a classes.

<DocPlayground
  placeholder="Digite um título de eleitor para validar"
  valid-label="Título válido"
  invalid-label="Título inválido"
  generate-label="Gerar título de exemplo"
  :validate="handleValidate"
  :generate="handleGenerate"
/>

## Exemplos (API)

```js
// Importação direta
import { isTituloEleitor } from 'validation-br';

isTituloEleitor('0975.6543.2615'); // -> true

// Importação de submódulo
import { validate, validateOrFail, mask, normalize, fake, dv } from 'validation-br/dist/tituloEleitor';

validate('097565432615'); // -> true
validateOrFail('097565432615'); // -> true (lança ValidationBRError se inválido)
mask('097565432615'); // -> '0975.6543.2615'
normalize('0975.6543.2615'); // -> '097565432615'
fake(); // -> número fake válido, sem máscara
fake(true); // -> número fake válido, com máscara

// dv() recebe os 8 dígitos sequenciais + os 2 da UF
dv('0975654326'); // -> '15'
```

## Como o cálculo é feito

O título tem 12 dígitos: os 8 primeiros são um número sequencial, os
2 seguintes identificam a UF de emissão, e os 2 últimos são os
dígitos verificadores (DV), calculados em duas etapas.

<img src="/diagrams/titulo-eleitor-check-digits.svg" alt="Cálculo passo a passo dos dígitos verificadores do Título de Eleitor" />

**UF de emissão (dígitos 9-10):**

| UF | Estado | UF | Estado |
| --- | --- | --- | --- |
| 01 | SP | 15 | PI |
| 02 | MG | 16 | RN |
| 03 | RJ | 17 | AL |
| 04 | RS | 18 | MT |
| 05 | BA | 19 | MS |
| 06 | PR | 20 | DF |
| 07 | CE | 21 | SE |
| 08 | PE | 22 | AM |
| 09 | SC | 23 | RO |
| 10 | GO | 24 | AC |
| 11 | MA | 25 | AP |
| 12 | PB | 26 | RR |
| 13 | PA | 27 | TO |
| 14 | ES | 28 | Exterior (ZZ) |

> Se o resto da divisão por 11 for maior ou igual a 10, o dígito verificador é `0`.

## Integrações

- [Class Validator](/v1/integrations/class-validator)
- [Indicative](/v1/integrations/indicative)
- [Joi](/v1/integrations/joi)
- [Vuelidate](/v1/integrations/vuelidate)
- [Yup](/v1/integrations/yup)

<script setup lang="ts">
import { validate, fake } from 'validation-br/dist/tituloEleitor'

function handleValidate(value: string) {
  return validate(value)
}

function handleGenerate(withMask: boolean) {
  return fake(withMask)
}
</script>
