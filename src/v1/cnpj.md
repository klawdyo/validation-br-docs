---
outline: deep
---

# CNPJ

O CNPJ identifica uma empresa perante a Receita Federal. Desde a Nota Técnica conjunta COCAD/SUARA/RFB nº 49/2024, o CNPJ pode ser alfanumérico — a biblioteca já valida e gera números nos dois formatos.

<DocPlayground
  placeholder="Digite um CNPJ para validar"
  valid-label="CNPJ válido"
  invalid-label="CNPJ inválido"
  generate-label="Gerar CNPJ de exemplo"
  :validate="handleValidate"
  :generate="handleGenerate"
/>

## Exemplos (API)

```js
// Importação direta
import { isCNPJ } from 'validation-br';

isCNPJ('65.148.980/0001-10'); // -> true

// Importação de submódulo
import { validate, validateOrFail, mask, normalize, fake, dv } from 'validation-br/dist/cnpj';

validate('65148980000110'); // -> true
validateOrFail('65148980000110'); // -> true (lança ValidationBRError se inválido)
mask('65148980000110'); // -> '65.148.980/0001-10'
normalize('65.148.980/0001-10'); // -> '65148980000110'
dv('651489800001'); // -> '10'

// Números fake: alfanumérico por padrão
fake(); // -> ex.: '9R36UGNB000168'
fake(true); // -> ex.: '9R.36U.GNB/0001-68'

// Fake somente numérico
fake({ alphanumeric: false }); // -> ex.: '65148980000110'
fake({ alphanumeric: false, withMask: true }); // -> ex.: '65.148.980/0001-10'
```

## Como o cálculo é feito

O CNPJ tem 14 caracteres: os 8 primeiros identificam a empresa, os 4
seguintes identificam a filial, e os 2 últimos são os dígitos
verificadores (DV). Quando o CNPJ é alfanumérico, cada letra é
convertida para o seu valor na tabela ASCII (subtraído de 48) antes da
soma ponderada — dígitos numéricos não mudam, já que `'0'` é 48 na
tabela ASCII.

<img src="/diagrams/cnpj-check-digits.svg" alt="Cálculo passo a passo dos dígitos verificadores do CNPJ numérico" />

<img src="/diagrams/cnpj-alphanumeric-check-digits.svg" alt="Cálculo dos dígitos verificadores de um CNPJ alfanumérico" />

> Se o resultado do DV for 10, o dígito verificador é considerado `0`.

## Integrações

- [Class Validator](/v1/integrations/class-validator)
- [Indicative](/v1/integrations/indicative)
- [Joi](/v1/integrations/joi)
- [Vuelidate](/v1/integrations/vuelidate)
- [Yup](/v1/integrations/yup)

<script setup lang="ts">
import { validate, fake } from 'validation-br/dist/cnpj'

function handleValidate(value: string) {
  return validate(value)
}

function handleGenerate(withMask: boolean) {
  return fake(withMask)
}
</script>
