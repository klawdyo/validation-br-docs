---
outline: deep
title: CPF — validação e máscara em JavaScript
description: Valide, formate e gere CPF em JavaScript ou TypeScript, com cálculo do dígito verificador e suporte completo a Node.js e ao navegador.
---

# CPF

Valide CPF e gere números de teste com JavaScript e TypeScript.

Use o validador de CPF para conferir o dígito verificador, o gerador de CPF automático para criar números fake em testes e seeds, e veja a implementação completa em JavaScript, TypeScript e Node.js com a validation-br. O CPF identifica uma pessoa física perante a Receita Federal e é exigido em contratos, cadastros e serviços financeiros em todo o Brasil.

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
import { CPF } from 'validation-br/cpf';

// Criar e validar (lança se inválido)
const cpf = new CPF('280.012.389-38');
cpf.value;        // -> '28001238938'
cpf.toString();   // -> '28001238938'
cpf.mask();       // -> '280.012.389-38'

// Gerar um CPF de exemplo válido
const exemplo = CPF.fake();
exemplo.toString();

// Calcular checksum a partir dos 9 primeiros dígitos
CPF.checksum('280012389'); // -> '38'
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

> Se o resto da divisão por 11 for 10, o dígito verificador é considerado `0`.

<script setup lang="ts">
import { CPF } from 'validation-br-v2/cpf'

function handleValidate(value: string) {
  try {
    new CPF(value)
    return true
  } catch {
    return false
  }
}

function handleGenerate(withMask: boolean) {
  const fake = CPF.fake()
  return withMask ? fake.mask() : fake.toString()
}
</script>
