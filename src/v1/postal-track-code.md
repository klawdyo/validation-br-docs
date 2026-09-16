---
outline: deep
title: Rastreamento Postal — validação em JS e TS (v1)
description: Valide, formate e gere códigos de rastreamento dos Correios em JavaScript e TypeScript com a API legada 1.x da validation-br, para Node.js.
---

# Código de Rastreamento Postal

Validador para códigos de rastreamento dos Correios no formato `XX000000000BR` (ex.: Sedex, carta registrada) — 13 caracteres. Esta página documenta a API de funções soltas da versão 1.x da `validation-br`, para uso em projetos JavaScript e TypeScript rodando em Node.js ou no navegador. As funções abaixo cobrem validação, normalização e geração de códigos de exemplo. Para projetos novos, veja a [versão 2.0](/v2/postal-track-code), com API orientada a classes.

<DocPlayground
  placeholder="Digite um código para validar"
  valid-label="Código válido"
  invalid-label="Código inválido"
  generate-label="Gerar código de exemplo"
  :validate="handleValidate"
  :generate="handleGenerate"
  :show-mask-option="false"
/>

## Exemplos (API)

```js
// Importação direta
import { isPostalCode } from 'validation-br';

isPostalCode('XF892043372BR'); // -> true

// Importação de submódulo
import { validate, validateOrFail, mask, normalize, fake, dv } from 'validation-br/dist/postalCode';

validate('XF892043372BR'); // -> true
validateOrFail('XF892043372BR'); // -> true (lança ValidationBRError se inválido)
normalize('xf892043372br'); // -> 'XF892043372BR'
fake(); // -> código fake válido (não recebe parâmetro de máscara)

// dv() recebe os 8 dígitos numéricos centrais
dv('89204337'); // -> '2'
```

> `mask()` é apenas um alias de `normalize()`: o código não tem separadores, só normaliza para maiúsculas.

## Como o cálculo é feito

O código tem 13 caracteres: 2 letras identificando o tipo do objeto,
8 dígitos sequenciais, 1 dígito verificador (DV) e 2 letras do país de
origem (`BR`).

<img src="/diagrams/postal-track-code-check-digits.svg" alt="Cálculo passo a passo do dígito verificador do código de rastreamento postal" />

> Se o resto da divisão por 11 for 0, o DV é `5`; se for 1, o DV é `0`.

## Integrações

- [Class Validator](/v1/integrations/class-validator)
- [Indicative](/v1/integrations/indicative)
- [Joi](/v1/integrations/joi)
- [Vuelidate](/v1/integrations/vuelidate)
- [Yup](/v1/integrations/yup)

<script setup lang="ts">
import { validate, fake } from 'validation-br/dist/postalCode'

function handleValidate(value: string) {
  return validate(value)
}

function handleGenerate() {
  return fake()
}
</script>
