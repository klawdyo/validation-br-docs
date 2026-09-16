---
outline: deep
title: CNH — validação em JavaScript e TypeScript (v1)
description: Valide, formate e gere números de CNH em JavaScript e TypeScript com a API legada 1.x da validation-br, para Node.js e navegador.
---

# CNH

Validador para números de CNH (Carteira Nacional de Habilitação) — 11 dígitos, sendo os 2 últimos os dígitos verificadores. Esta página documenta a API de funções soltas da versão 1.x da `validation-br`, para uso em projetos JavaScript e TypeScript rodando em Node.js ou no navegador. As funções abaixo cobrem validação, formatação, normalização e geração de números de CNH de exemplo. Para projetos novos, veja a [versão 2.0](/v2/cnh), com API orientada a classes.

<DocPlayground
  placeholder="Digite uma CNH para validar"
  valid-label="CNH válida"
  invalid-label="CNH inválida"
  generate-label="Gerar CNH de exemplo"
  :validate="handleValidate"
  :generate="handleGenerate"
/>

## Exemplos (API)

```js
// Importação direta
import { isCNH } from 'validation-br';

isCNH('653.277.841-39'); // -> true

// Importação de submódulo
import { validate, validateOrFail, mask, normalize, fake, dv } from 'validation-br/dist/cnh';

validate('65327784139'); // -> true
validateOrFail('65327784139'); // -> true (lança ValidationBRError se inválido)
mask('65327784139'); // -> '653277841-39'
normalize('653277841-39'); // -> '65327784139'
fake(); // -> número fake válido, sem máscara
fake(true); // -> número fake válido, com máscara
dv('653277841'); // -> '39'
```

## Como o cálculo é feito

A CNH tem 11 caracteres: os 9 primeiros são um número sequencial e os
2 últimos são os dígitos verificadores (DV), calculados em duas
etapas — o segundo cálculo já incorpora o DV1 encontrado na primeira.

<img src="/diagrams/cnh-check-digits.svg" alt="Cálculo passo a passo dos dígitos verificadores da CNH" />

> Se o resto da divisão por 11 for 10, o dígito verificador é considerado `0`.

## Integrações

- [Class Validator](/v1/integrations/class-validator)
- [Indicative](/v1/integrations/indicative)
- [Joi](/v1/integrations/joi)
- [Vuelidate](/v1/integrations/vuelidate)
- [Yup](/v1/integrations/yup)

<script setup lang="ts">
import { validate, fake } from 'validation-br/dist/cnh'

function handleValidate(value: string) {
  return validate(value)
}

function handleGenerate(withMask: boolean) {
  return fake(withMask)
}
</script>
