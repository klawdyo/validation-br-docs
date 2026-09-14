---
outline: deep
---

# RENAVAM

RENAVAM é o registro nacional de um veículo no DETRAN — é único por veículo e acompanha ele mesmo que a placa, o dono ou o estado mudem.

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
import { Renavam } from 'validation-br/renavam';

// Criar e validar (lança se inválido)
const r = new Renavam('9505984597-6');
r.value;      // -> '95059845976'
r.toString(); // -> '95059845976'
r.mask();     // -> '9505984597-6'

// Gerar um RENAVAM de exemplo válido
const exemplo = Renavam.fake();
exemplo.mask();

// Calcular checksum a partir dos 10 primeiros dígitos
Renavam.checksum('9505984597'); // -> '6'
```

## Como o cálculo é feito

O RENAVAM tem 11 caracteres: os 10 primeiros são a numeração e o 11º é
o dígito verificador. A soma ponderada dos 10 dígitos é multiplicada
por 10 antes de aplicar o módulo 11, e o DV é o **resto direto** dessa
divisão (não `11 - resto` como no CPF/CNPJ) — se o resto for maior ou
igual a 10, o DV vira 0.

<img src="/diagrams/renavam-check-digits.svg" alt="Cálculo passo a passo do dígito verificador do RENAVAM" />

<script setup lang="ts">
import { Renavam } from 'validation-br-v2/renavam'

function handleValidate(value: string) {
  try {
    new Renavam(value)
    return true
  } catch {
    return false
  }
}

function handleGenerate(withMask: boolean) {
  const fake = Renavam.fake()
  return withMask ? fake.mask() : fake.toString()
}
</script>
