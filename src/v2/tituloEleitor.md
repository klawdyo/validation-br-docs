---
outline: deep
---

# Título de Eleitor

É o documento que comprova o registro de um eleitor perante a Justiça Eleitoral e o habilita a votar — também aceito como identificação em diversos serviços.

<DocPlayground
  placeholder="Digite um Título de Eleitor para validar"
  valid-label="Título válido"
  invalid-label="Título inválido"
  generate-label="Gerar Título de exemplo"
  :validate="handleValidate"
  :generate="handleGenerate"
/>

## Exemplos (API)

```js
import { TituloEleitor } from 'validation-br/tituloEleitor';

// Criar e validar (lança se inválido)
const t = new TituloEleitor('5250.2888.1694');
t.mask(); // -> '5250.2888.1694'

// Gerar um Título de exemplo válido
const exemplo = TituloEleitor.fake();
exemplo.mask();

// Calcular checksum (10 primeiros dígitos: 8 sequenciais + 2 da UF)
TituloEleitor.checksum('5250288816'); // -> '94'
```

## Como o cálculo é feito

O Título de Eleitor tem 12 dígitos: 8 sequenciais + 2 da UF + 2
dígitos verificadores. O DV1 usa os 8 dígitos sequenciais com pesos de
2 a 9; o DV2 usa os 2 dígitos da UF + o DV1 calculado, com pesos 7, 8
e 9. Em ambos os casos, o dígito verificador é o **resto direto** da
divisão por 11 (sem o passo `11 - resto` usado no CPF/CNPJ).

<img src="/diagrams/titulo-eleitor-check-digits.svg" alt="Cálculo passo a passo dos dígitos verificadores do Título de Eleitor" />

<script setup lang="ts">
import { TituloEleitor } from 'validation-br-v2/tituloEleitor'

function handleValidate(value: string) {
  try {
    new TituloEleitor(value)
    return true
  } catch {
    return false
  }
}

function handleGenerate(withMask: boolean) {
  const fake = TituloEleitor.fake()
  return withMask ? fake.mask() : fake.toString()
}
</script>
