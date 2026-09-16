---
outline: deep
title: Certidão — matrícula padrão CNJ (SIRC)
description: Valide a matrícula de certidão de cartório no padrão nacional CNJ com JavaScript ou TypeScript, cobrindo nascimento, casamento, óbito e mais.
---

# Certidão

Valide matrícula de certidão CNJ com JavaScript e TypeScript.

Use o validador de certidão para conferir a matrícula no padrão nacional do CNJ (SIRC), cobrindo nascimento, casamento, óbito e mais, com implementação completa em JavaScript, TypeScript e Node.js na validation-br. É o número de matrícula de uma certidão de cartório no padrão nacional do CNJ — permite localizar e conferir a autenticidade da certidão em qualquer cartório do país, através do Sistema de Registro Civil, sem depender do cartório de origem. É comum em processos de habilitação de casamento, inventários e qualquer trâmite que exija comprovar um registro civil já existente.

<DocPlayground
  placeholder="Digite uma matrícula de certidão para validar"
  valid-label="Certidão válida"
  invalid-label="Certidão inválida"
  generate-label="Gerar certidão de exemplo"
  :validate="handleValidate"
  :generate="handleGenerate"
/>

## Exemplos (API)

```js
import { Certidao, CertidaoTipoLivro, CertidaoServico } from 'validation-br/certidao';

// Criar e validar (lança se inválido)
const certidao = new Certidao('104539015520131000120210000123-21');
certidao.value;      // -> '10453901552013100012021000012321'
certidao.toString(); // -> '10453901552013100012021000012321'
certidao.mask();      // -> '104539 01 55 2013 1 00012 021 0000123 21'

// Gerar uma certidão de exemplo válida (aceita opções)
Certidao.fake({
  tipoLivro: CertidaoTipoLivro.Nascimento,
  servico: CertidaoServico.RegistroCivilPessoasNaturais,
});

// Calcular o DV a partir dos 30 primeiros dígitos
Certidao.checksum('827660015520261654035919727867'); // -> '31'
```

### `CertidaoTipoLivro` — campo "tipo do livro" do número

| Valor | Significado |
| --- | --- |
| `1` | Nascimento (Livro A) |
| `2` | Casamento (Livro B) |
| `3` | Casamento religioso p/ efeitos civis (Livro B Auxiliar) |
| `4` | Óbito (Livro C) |
| `5` | Natimorto (Livro C Auxiliar) |
| `6` | Proclamas (Livro D) |
| `7` | Outros atos do Livro E (inclui emancipações e interdições) |

### `CertidaoServico` — campo "serviço" do número

| Valor | Significado |
| --- | --- |
| `51` | Notas |
| `52` | Protesto |
| `53` | Registro de Imóveis |
| `54` | Registro de Títulos e Documentos |
| `55` | Registro Civil das Pessoas Naturais |
| `56` | Registro de Contratos Marítimos |
| `57` | Registro de Distribuição |

## Como o cálculo é feito

A matrícula tem 32 dígitos, no formato
`aaaaaa.bb.cc.dddd.e.fffff.ggg.hhhhhhh-ii`: código nacional da
serventia (cartório), código do acervo, tipo de serviço, ano do
registro, tipo do livro, número do livro, número da folha, número do
termo, e por fim os 2 dígitos verificadores.

O cálculo dos dois DVs é uma soma ponderada por dígito (Módulo 11,
igual ao CPF), com pesos cíclicos diferentes em cada etapa — mas com
uma particularidade que não aparece em nenhum outro documento desta
lista: o DV normalmente é o **resto direto** da divisão por 11, porém
se o resto for **10**, o dígito verificador vira **1** (e não 0, como
acontece no CAEPF, RENAVAM ou Título de Eleitor).

O diagrama abaixo mostra a conta coluna a coluna, digito a dígito —
mesmo formato usado no CPF, CNPJ e CNH — para os dois dígitos
verificadores.

<img src="/diagrams/certidao-check-digits.svg" alt="Cálculo coluna a coluna dos dois dígitos verificadores da Certidão" />

<script setup lang="ts">
import { Certidao } from 'validation-br-v2/certidao'

function handleValidate(value: string) {
  try {
    new Certidao(value)
    return true
  } catch {
    return false
  }
}

function handleGenerate(withMask: boolean) {
  const fake = Certidao.fake()
  return withMask ? fake.mask() : fake.toString()
}
</script>
