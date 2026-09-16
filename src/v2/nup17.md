---
outline: deep
title: NUP17 — protocolo do Governo Federal
description: Valide o Número Único de Protocolo (NUP17) em JavaScript, confira o dígito verificador e gere exemplos válidos para testar sistemas do governo.
---

# NUP17

Valide NUP17 e gere protocolos de teste com JavaScript e TypeScript.

Use o validador de NUP17 para conferir o formato e o dígito verificador do Número Único de Protocolo, e gere exemplos válidos para testar integrações com sistemas do governo em JavaScript, TypeScript e Node.js com a validation-br. NUP17 identifica um processo ou protocolo dentro dos órgãos do Governo Federal — permite acompanhar o mesmo processo em qualquer sistema do Executivo, não só no órgão de origem. O formato substituiu numerações internas que cada órgão usava separadamente, padronizando o protocolo em toda a administração pública federal.

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
import { NUP17 } from 'validation-br/nup17';

// Criar e validar (lança se inválido)
const nup = new NUP17('23037.001462/2021-65');
nup.value;      // -> '23037001462202165'
nup.toString(); // -> '23037001462202165'
nup.mask();     // -> '23037.001462/2021-65'

// Gerar um NUP17 de exemplo válido
const exemplo = NUP17.fake();
exemplo.toString();

// Calcular checksum a partir dos 15 primeiros dígitos
NUP17.checksum('230370014622021'); // -> '65'
```

## Como o cálculo é feito

O NUP17 tem 17 dígitos: 15 dígitos sequenciais + 2 dígitos
verificadores. O DV1 usa os 15 primeiros dígitos com pesos
decrescentes de 16 a 2; o DV2 usa os mesmos 15 dígitos + o DV1
calculado, com pesos de 17 a 2. Em ambos os casos, o dígito
verificador é `11 - resto` da divisão por 11 (se der 10, o DV é 0).

<img src="/diagrams/nup17-check-digits.svg" alt="Cálculo passo a passo dos dígitos verificadores do NUP17" />

<script setup lang="ts">
import { NUP17 } from 'validation-br-v2/nup17'

function handleValidate(value: string) {
  try {
    new NUP17(value)
    return true
  } catch {
    return false
  }
}

function handleGenerate(withMask: boolean) {
  const fake = NUP17.fake()
  return withMask ? fake.mask() : fake.toString()
}
</script>
