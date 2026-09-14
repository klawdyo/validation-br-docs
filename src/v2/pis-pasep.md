---
outline: deep
---

# PIS / PASEP

PIS/PASEP/NIS/NIT são o mesmo número usado como identificação do trabalhador — dá acesso a FGTS, seguro-desemprego, abono salarial e outros benefícios trabalhistas.

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
import { PIS } from 'validation-br/pis-pasep';

// Criar e validar (lança se inválido)
const pis = new PIS('712.82677.38-0');
pis.toString(); // -> '71282677380'
pis.mask();      // -> '712.82677.38-0'

// Gerar um PIS/PASEP de exemplo válido
const exemplo = PIS.fake();
exemplo.mask();

// Calcular checksum a partir dos 10 primeiros dígitos
PIS.checksum('7128267738'); // -> '0'
```

## Como o cálculo é feito

O PIS/PASEP tem 11 caracteres: os 10 primeiros compõem o número e o
11º é o dígito verificador. Cada um dos 10 dígitos é multiplicado pelo
seu peso, os produtos são somados e o resto da divisão por 11 dá o
DV — com uma regra especial: se o resto for **0 ou 1**, o DV é sempre
`0` (não é `11 - resto` nesse caso).

<img src="/diagrams/pis-pasep-check-digits.svg" alt="Cálculo passo a passo do dígito verificador do PIS/PASEP" />

<script setup lang="ts">
import { PIS } from 'validation-br-v2/pis-pasep'

function handleValidate(value: string) {
  try {
    new PIS(value)
    return true
  } catch {
    return false
  }
}

function handleGenerate(withMask: boolean) {
  const fake = PIS.fake()
  return withMask ? fake.mask() : fake.toString()
}
</script>
