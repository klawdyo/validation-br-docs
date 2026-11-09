---
outline: deep
title: Processo Judicial — validação em JS e TS (v1)
description: Valide, formate e gere números de processo judicial unificado (CNJ) em JavaScript e TypeScript com a API legada 1.x da validation-br.
---

# Processo Judicial

Confira e formate números de processo judicial (CNJ) com JavaScript.

Número unificado de processos judiciais (Resolução CNJ nº 65/2008) — 20 caracteres, incluindo os 2 dígitos verificadores. Esta página documenta a API de funções soltas (`isProcessoJuridico`, `mask`, `fake`...) da versão 1.x da `validation-br`, biblioteca JavaScript para Node.js e navegador. As funções abaixo cobrem validação, formatação, normalização e criação de números de processo fake para testes. Para projetos novos, veja a [versão 2.0](/v2/judicial-process), com API orientada a classes.

<DocPlayground
  placeholder="Digite um número de processo para validar"
  valid-label="Número válido"
  invalid-label="Número inválido"
  generate-label="Gerar processo de exemplo"
  :validate="handleValidate"
  :generate="handleGenerate"
/>

## Exemplos (API)

```js
// Importação direta
import { isJudicialProcess } from 'validation-br';

isJudicialProcess('4632341-46.2025.7.25.9556'); // -> true

// Importação de submódulo
import { validate, validateOrFail, mask, normalize, fake, dv } from 'validation-br/dist/judicialProcess';

validate('46323414620257259556'); // -> true
validateOrFail('46323414620257259556'); // -> true (lança ValidationBRError se inválido)
mask('46323414620257259556'); // -> '4632341-46.2025.7.25.9556'
normalize('4632341-46.2025.7.25.9556'); // -> '46323414620257259556'
fake(); // -> número fake válido, sem máscara
fake(true); // -> número fake válido, com máscara

// dv() recebe o número sem os 2 dígitos verificadores
dv('463234120257259556'); // -> '46'
```

## Como o cálculo é feito

O número tem 20 caracteres: 7 de sequencial, 2 de DV, 4 de ano, 1 do
órgão do Poder Judiciário, 2 do tribunal e 4 da unidade de origem. O
DV é calculado pelo algoritmo Módulo 97 de Base 10 (ISO 7064), em 3
etapas que evitam estourar o limite de inteiro do JavaScript.

<img src="/diagrams/judicial-process-check-digits.svg" alt="Cálculo passo a passo do dígito verificador do Processo Judicial" />

**Órgãos do Poder Judiciário (1º dígito após o ano):**

| Código | Órgão |
| --- | --- |
| 1 | Supremo Tribunal Federal |
| 2 | Conselho Nacional de Justiça |
| 3 | Superior Tribunal de Justiça |
| 4 | Justiça Federal |
| 5 | Justiça do Trabalho |
| 6 | Justiça Eleitoral |
| 7 | Justiça Militar da União |
| 8 | Justiça dos Estados e do Distrito Federal e Territórios |
| 9 | Justiça Militar Estadual |

## Integrações

- [Class Validator](/v1/integrations/class-validator)
- [Indicative](/v1/integrations/indicative)
- [Joi](/v1/integrations/joi)
- [Vuelidate](/v1/integrations/vuelidate)
- [Yup](/v1/integrations/yup)

<script setup lang="ts">
import { validate, fake } from 'validation-br/dist/judicialProcess'

function handleValidate(value: string) {
  return validate(value)
}

function handleGenerate(withMask: boolean) {
  return fake(withMask)
}
</script>
