---
outline: deep
---

# CNH

A CNH é o documento que autoriza alguém a dirigir veículos no Brasil, emitido pelo DETRAN — o número de registro é único por condutor.

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
import { CNH } from 'validation-br/cnh';

// Criar e validar (lança se inválido)
const cnh = new CNH('624729276-37');
cnh.value;      // -> '62472927637'
cnh.toString(); // -> '62472927637'
cnh.mask();      // -> '624729276-37'

// Gerar uma CNH de exemplo válida
const exemplo = CNH.fake();
exemplo.toString();

// Calcular checksum a partir dos 9 primeiros dígitos
CNH.checksum('624729276'); // -> '37'
```

## Como o cálculo é feito

A CNH tem 11 caracteres: os 9 primeiros formam o número sequencial e os
2 últimos são os dígitos verificadores (DV1 e DV2), calculados a partir
dos anteriores.

A conta é parecida com a do CPF e do CNPJ (soma ponderada, módulo 11),
mas com duas diferenças importantes: no DV1 os pesos são **crescentes**
(2 a 10), ao contrário do CPF/CNPJ, que usam pesos decrescentes; e no
DV2, o peso do dígito DV1 (que é `2`) entra **fora de ordem**, no final
da lista de pesos (`3, 4, 5, 6, 7, 8, 9, 10, 11, 2`), em vez de seguir a
sequência crescente.

<img src="/diagrams/cnh-check-digits.svg" alt="Cálculo passo a passo dos dígitos verificadores da CNH" />

> Se o resto da divisão por 11 for 10, o dígito verificador é considerado `0`.

<script setup lang="ts">
import { CNH } from 'validation-br-v2/cnh'

function handleValidate(value: string) {
  try {
    new CNH(value)
    return true
  } catch {
    return false
  }
}

function handleGenerate(withMask: boolean) {
  const fake = CNH.fake()
  return withMask ? fake.mask() : fake.toString()
}
</script>
