---
outline: deep
title: Rastreio postal — código padrão UPU
description: Valide o código de rastreamento dos Correios em JavaScript ou TypeScript, no padrão internacional UPU, com cálculo do dígito verificador.
---

# Código de Rastreamento Postal

É o código que os Correios (e outras transportadoras que seguem o padrão internacional UPU) usam pra rastrear uma encomenda do envio até a entrega. Esse formato de 13 caracteres é um padrão internacional definido pela UPU (União Postal Universal), então o mesmo validador funciona tanto para envios nacionais quanto internacionais rastreados pelos Correios.

<DocPlayground
  placeholder="Digite um código de rastreamento para validar"
  valid-label="Código válido"
  invalid-label="Código inválido"
  generate-label="Gerar código de exemplo"
  :validate="handleValidate"
  :generate="handleGenerate"
/>

## Exemplos (API)

```js
import { PostalTrackCode } from 'validation-br/postal-track-code';

// Criar e validar (lança se inválido)
const p = new PostalTrackCode('JT718252423BR');
p.value;      // -> 'JT718252423BR'
p.toString(); // -> 'JT718252423BR'
p.mask();     // -> 'JT718252423BR'

// Gerar um código de exemplo válido
const exemplo = PostalTrackCode.fake();
exemplo.toString();

// Calcular checksum a partir dos 8 dígitos do meio
PostalTrackCode.checksum('71825242'); // -> '3'
```

## Como o cálculo é feito

O código tem 13 caracteres: 2 letras de tipo, 8 dígitos sequenciais, 1
dígito verificador e 2 letras do país. O DV é calculado só a partir
dos 8 dígitos do meio — o prefixo de tipo e o sufixo de país não
entram na conta. Os 8 dígitos são multiplicados pelos seus pesos, os
produtos são somados, e o DV é `11 - resto` da divisão por 11 (se der
10, o DV é 0).

<img src="/diagrams/postal-track-code-check-digits.svg" alt="Cálculo passo a passo do dígito verificador do Código de Rastreamento Postal" />

<script setup lang="ts">
import { PostalTrackCode } from 'validation-br-v2/postal-track-code'

function handleValidate(value: string) {
  try {
    new PostalTrackCode(value)
    return true
  } catch {
    return false
  }
}

function handleGenerate(withMask: boolean) {
  const fake = PostalTrackCode.fake()
  return withMask ? fake.mask() : fake.toString()
}
</script>
