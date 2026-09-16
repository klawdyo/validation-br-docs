---
outline: deep
title: NUP17 — validação em JavaScript e TypeScript (v1)
description: Valide, formate e gere números de NUP17 (Protocolo Único) em JavaScript e TypeScript com a API legada 1.x da validation-br, para Node.js e navegador.
---

# NUP17

Confira e formate números de NUP17 com funções JavaScript prontas.

Número Único de Protocolo do Governo Federal (NUP17) — 17 caracteres, incluindo os 2 dígitos verificadores. Esta página documenta a API de funções soltas (`isNUP17`, `mask`, `fake`...) da versão 1.x da `validation-br`, biblioteca JavaScript para Node.js e navegador. As funções abaixo cobrem validação, formatação, normalização e criação de NUP17 fake para testes e seeds. Para projetos novos, veja a [versão 2.0](/v2/nup17), com API orientada a classes.

<DocPlayground
  placeholder="Digite um NUP17 para validar"
  valid-label="NUP17 válido"
  invalid-label="NUP17 inválido"
  generate-label="Gerar NUP17 de exemplo"
  :validate="handleValidate"
  :generate="handleGenerate"
/>

## Exemplos (API)

```js
// Importação direta
import { isNUP17 } from 'validation-br';

isNUP17('93590.882530/4120-71'); // -> true

// Importação de submódulo
import { validate, validateOrFail, mask, normalize, fake, dv } from 'validation-br/dist/nup17';

validate('93590882530412071'); // -> true
validateOrFail('93590882530412071'); // -> true (lança ValidationBRError se inválido)
mask('93590882530412071'); // -> '93590.882530/4120-71'
normalize('93590.882530/4120-71'); // -> '93590882530412071'
fake(); // -> número fake válido, sem máscara
fake(true); // -> número fake válido, com máscara
dv('935908825304120'); // -> '71'
```

## Como o cálculo é feito

O NUP17 tem 17 caracteres: os 5 primeiros identificam o órgão, os 6
seguintes são o número sequencial, os 4 seguintes são o ano do
protocolo, e os 2 últimos são os dígitos verificadores (DV).

<img src="/diagrams/nup17-check-digits.svg" alt="Cálculo passo a passo dos dígitos verificadores do NUP17" />

> Se o resto da divisão for 10, o DV é `0`; se for 11, o DV é `1`.

## Integrações

- [Class Validator](/v1/integrations/class-validator)
- [Indicative](/v1/integrations/indicative)
- [Joi](/v1/integrations/joi)
- [Vuelidate](/v1/integrations/vuelidate)
- [Yup](/v1/integrations/yup)

<script setup lang="ts">
import { validate, fake } from 'validation-br/dist/nup17'

function handleValidate(value: string) {
  return validate(value)
}

function handleGenerate(withMask: boolean) {
  return fake(withMask)
}
</script>
