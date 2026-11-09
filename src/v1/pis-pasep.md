---
outline: deep
title: PIS/PASEP — validação em JavaScript e TypeScript (v1)
description: Valide, formate e gere números de PIS/PASEP/NIS/NIT em JavaScript e TypeScript com a API legada 1.x da validation-br, para Node.js e navegador.
---

# PIS/PASEP

Confira o dígito verificador do PIS/PASEP/NIS/NIT em JavaScript.

Números de PIS/PASEP/NIS/NIT têm 11 dígitos, sendo o último o dígito verificador. O formato não é validado: `26827649960` é equivalente a `268.27649.96-0`. Esta página documenta a API de funções soltas (`isPisPasep`, `mask`, `fake`...) da versão 1.x da `validation-br`, biblioteca JavaScript para Node.js e navegador. Para projetos novos, veja a [versão 2.0](/v2/pis-pasep), com API orientada a classes.

<DocPlayground
  placeholder="Digite um PIS/PASEP para validar"
  valid-label="PIS/PASEP válido"
  invalid-label="PIS/PASEP inválido"
  generate-label="Gerar PIS/PASEP de exemplo"
  :validate="handleValidate"
  :generate="handleGenerate"
/>

## Exemplos (API)

```js
// Importação direta
import { isPIS } from 'validation-br';

isPIS('003.23065.90-2'); // -> true

// Importação de submódulo
import { validate, validateOrFail, mask, normalize, fake, dv } from 'validation-br/dist/pisPasep';

validate('00323065902'); // -> true
validateOrFail('00323065902'); // -> true (lança ValidationBRError se inválido)
mask('00323065902'); // -> '003.23065.90-2'
normalize('003.23065.90-2'); // -> '00323065902'
fake(); // -> número fake válido, sem máscara
fake(true); // -> número fake válido, com máscara
dv('0032306590'); // -> '2'
```

## Como o cálculo é feito

O PIS/PASEP tem 11 dígitos: os 10 primeiros são a numeração do
documento e o último é o dígito verificador (DV), calculado a partir
da soma ponderada dos 10 dígitos.

<img src="/diagrams/pis-pasep-check-digits.svg" alt="Cálculo passo a passo do dígito verificador do PIS/PASEP" />

> Se o resto da divisão por 11 for 0 ou 1, o dígito verificador é `0`.

## Integrações

- [Class Validator](/v1/integrations/class-validator)
- [Indicative](/v1/integrations/indicative)
- [Joi](/v1/integrations/joi)
- [Vuelidate](/v1/integrations/vuelidate)
- [Yup](/v1/integrations/yup)

<script setup lang="ts">
import { validate, fake } from 'validation-br/dist/pisPasep'

function handleValidate(value: string) {
  return validate(value)
}

function handleGenerate(withMask: boolean) {
  return fake(withMask)
}
</script>
