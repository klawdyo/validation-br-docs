---
outline: deep
---

# RENAVAM

RENAVAM é o registro nacional de um veículo no DETRAN — 11 caracteres, sendo o último o dígito verificador.

<DocPlayground
  placeholder="Digite um RENAVAM para validar"
  valid-label="RENAVAM válido"
  invalid-label="RENAVAM inválido"
  generate-label="Gerar RENAVAM de exemplo"
  :validate="handleValidate"
  :generate="handleGenerate"
/>

## Exemplos (API)

```js
// Importação direta
import { isRenavam } from 'validation-br';

isRenavam('0898129050-2'); // -> true

// Importação de submódulo
import { validate, validateOrFail, mask, normalize, fake, dv } from 'validation-br/dist/renavam';

validate('08981290502'); // -> true
validateOrFail('08981290502'); // -> true (lança ValidationBRError se inválido)
mask('08981290502'); // -> '0898129050-2'
normalize('0898129050-2'); // -> '08981290502'
fake(); // -> número fake válido, sem máscara
fake(true); // -> número fake válido, com máscara
dv('0898129050'); // -> '2'
```

## Como o cálculo é feito

O RENAVAM tem 11 caracteres: os 10 primeiros são a numeração e o 11º é
o dígito verificador. A soma ponderada dos 10 dígitos é multiplicada
por 10 antes de aplicar o módulo 11, e o DV é o **resto direto** dessa
divisão (não `11 - resto` como no CPF/CNPJ) — se o resto for maior ou
igual a 10, o DV vira 0.

<img src="/diagrams/renavam-check-digits.svg" alt="Cálculo passo a passo do dígito verificador do RENAVAM" />

## Integrações

- [Class Validator](/v1/integrations/class-validator)
- [Indicative](/v1/integrations/indicative)
- [Joi](/v1/integrations/joi)
- [Vuelidate](/v1/integrations/vuelidate)
- [Yup](/v1/integrations/yup)

<script setup lang="ts">
import { validate, fake } from 'validation-br/dist/renavam'

function handleValidate(value: string) {
  return validate(value)
}

function handleGenerate(withMask: boolean) {
  return fake(withMask)
}
</script>
