---
outline: deep
title: CBI/SINTER — Código Imobiliário Brasileiro
description: Valide o CIB do SINTER em JavaScript, com decodificação em Base 32 de Crockford e cálculo do dígito verificador para sistemas de registro de imóveis.
---

# CBI/SINTER

Valide CIB do SINTER com JavaScript e TypeScript.

Use o validador de CBI/SINTER para conferir o dígito verificador com decodificação em Base 32 de Crockford, e veja a implementação completa em JavaScript, TypeScript e Node.js com a validation-br. CIB (Código Imobiliário Brasileiro) é o identificador único de um imóvel a nível nacional, criado pelo SINTER (Sistema Nacional de Gestão de Informações Territoriais, gerido pela Receita Federal) — o equivalente, pra imóveis, ao CPF/CNPJ pra pessoas: permite cruzar informação do mesmo imóvel entre diferentes cartórios e municípios sem depender da matrícula local de cada um. É útil para sistemas de cartório, due diligence imobiliária e integrações com bases da Receita Federal e prefeituras.

<DocPlayground
  placeholder="Digite um código CBI/SINTER para validar"
  valid-label="Código válido"
  invalid-label="Código inválido"
  generate-label="Gerar código de exemplo"
  :validate="handleValidate"
  :generate="handleGenerate"
/>

## Exemplos (API)

```js
import { CBISinter } from 'validation-br/cbi_sinter';

// Criar e validar (lança se inválido)
const cib = new CBISinter('41DNR433');
cib.value;      // -> '41DNR433'
cib.toString(); // -> '41DNR433'
cib.mask();      // -> '41DNR43-3'

// Gerar um código de exemplo válido
const exemplo = CBISinter.fake();
exemplo.toString();

// Calcular o DV a partir dos 7 primeiros caracteres
CBISinter.checksum('41DNR43'); // -> '3'
```

## Como o cálculo é feito

O código tem 7 caracteres alfanuméricos (a base) + 1 dígito
verificador, usando a **Base 32 de Crockford** — não é hexadecimal nem
Base32 comum: não distingue maiúsculas de minúsculas e remove os
caracteres `I`, `L`, `O` e `U` para evitar confusão visual e palavras
ofensivas (`I`/`L` viram `1`, `O` vira `0`). Cada caractere vale um
número de 0 a 31: dígitos valem seu próprio valor, e as letras seguem
a tabela de Crockford (pulando I, L, O, U).

O DV é calculado em **Módulo 31**: cada um dos 7 caracteres (já
convertido pra seu valor Crockford) é multiplicado por um peso fixo, os
produtos são somados, e o **resto direto** da divisão por 31 é
convertido de volta para um caractere Base 32 — esse caractere é o DV.

<img src="/diagrams/cbi-sinter-check-digits.svg" alt="Cálculo passo a passo do dígito verificador do CBI/SINTER" />

<Callout type="info">
  O resto máximo dessa divisão é <strong>30</strong> — que corresponde
  ao caractere <code>Y</code> na tabela de Crockford. Isso significa
  que o dígito verificador do CBI/SINTER <strong>nunca pode ser
  "Z"</strong>.
</Callout>

<script setup lang="ts">
import { CBISinter } from 'validation-br-v2/cbi_sinter'

function handleValidate(value: string) {
  try {
    new CBISinter(value)
    return true
  } catch {
    return false
  }
}

function handleGenerate(withMask: boolean) {
  const fake = CBISinter.fake()
  return withMask ? fake.mask() : fake.toString()
}
</script>
