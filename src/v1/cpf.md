---
outline: deep
---

# CPF

O CPF identifica uma pessoa física perante a Receita Federal — é o documento de identificação civil mais usado no Brasil, exigido em contratos, cadastros e serviços financeiros.

<DocPlayground
  placeholder="Digite um CPF para validar"
  valid-label="CPF válido"
  invalid-label="CPF inválido"
  generate-label="Gerar CPF de exemplo"
  :validate="handleValidate"
  :generate="handleGenerate"
/>

## Exemplos (API)

```js
// Importação direta
import { isCPF } from 'validation-br';

isCPF('135.778.474-09'); // -> true

// Importação de submódulo
import { validate, validateOrFail, mask, normalize, fake, dv } from 'validation-br/dist/cpf';

validate('13577847409'); // -> true
validateOrFail('13577847409'); // -> true (lança ValidationBRError se inválido)
mask('13577847409'); // -> '135.778.474-09'
normalize('135.778.474-09'); // -> '13577847409'
fake(); // -> número fake válido, sem máscara
fake(true); // -> número fake válido, com máscara
dv('135778474'); // -> '09'
```

## Como o cálculo é feito

O CPF tem 11 dígitos: os 8 primeiros são um número sequencial definido pela
Receita Federal, o 9º indica a região fiscal emissora, e os 2 últimos são
dígitos verificadores (DV) calculados a partir dos anteriores.

<img src="/diagrams/cpf-check-digits.svg" alt="Cálculo passo a passo dos dígitos verificadores do CPF" />

**Região fiscal (9º dígito):**

| Dígito | Região |
| --- | --- |
| 1 | DF, GO, MS, MT e TO |
| 2 | AC, AM, AP, PA, RO e RR |
| 3 | CE, MA e PI |
| 4 | AL, PB, PE, RN |
| 5 | BA e SE |
| 6 | MG |
| 7 | ES e RJ |
| 8 | SP |
| 9 | PR e SC |
| 0 | RS |

> Se o resto da divisão por 11 for menor que 2, o dígito verificador é `0`.

## Integrações

- [Class Validator](/v1/integrations/class-validator)
- [Indicative](/v1/integrations/indicative)
- [Joi](/v1/integrations/joi)
- [Vuelidate](/v1/integrations/vuelidate)
- [Yup](/v1/integrations/yup)

<script setup lang="ts">
import { validate, fake, mask } from 'validation-br/dist/cpf'

function handleValidate(value: string) {
  return validate(value)
}

function handleGenerate(withMask: boolean) {
  return fake(withMask)
}
</script>
