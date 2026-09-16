---
outline: deep
title: Telefone — validação em JavaScript e TypeScript (v1)
description: Valide, formate e gere números de telefone brasileiros em JavaScript e TypeScript com a API legada 1.x da validation-br, para Node.js e navegador.
---

# Telefone

Validador para números de telefone brasileiros, fixos ou celulares, com ou sem DDD e com ou sem máscara. Esta página documenta a API de funções soltas da versão 1.x da `validation-br`, para uso em projetos JavaScript e TypeScript rodando em Node.js ou no navegador. As funções abaixo cobrem validação, máscara, normalização e geração de telefones de exemplo. Para projetos novos, veja a [versão 2.0](/v2/phone), com API orientada a classes.

<DocPlayground
  placeholder="Digite um telefone para validar"
  valid-label="Telefone válido"
  invalid-label="Telefone inválido"
  generate-label="Gerar telefone de exemplo"
  :validate="handleValidate"
  :generate="handleGenerate"
/>

## Exemplos (API)

```js
// Importação direta
import { isPhone } from 'validation-br';

isPhone('(71) 9 4961-2604'); // -> true

// Importação de submódulo
import { validate, validateOrFail, mask, normalize, fake } from 'validation-br/dist/phone';

validate('71949612604'); // -> true
validateOrFail('71949612604'); // -> true (lança ValidationBRError se inválido)
mask('71949612604'); // -> '(71) 9 4961-2604'
normalize('(71) 9 4961-2604'); // -> '71949612604'
fake(); // -> telefone fake válido, sem máscara
fake(true); // -> telefone fake válido, com máscara
```

## Regras de validação

- Após remover os caracteres não numéricos, o número deve ter entre 8 e 11 dígitos.
- Com DDD (10 ou 11 dígitos), os 2 primeiros dígitos não podem conter o algarismo `0`.
- Telefone fixo: número local de 8 dígitos, começando entre `2` e `8`.
- Celular: número local de 9 dígitos, começando obrigatoriamente com `9`.
- Sequências com todos os dígitos iguais (ex.: `11111111`) são rejeitadas.

A máscara aplicada por `mask()` depende do tamanho do número informado:

| Dígitos | Máscara |
| --- | --- |
| 8 | `0000-0000` |
| 9 | `0 0000-0000` |
| 10 | `(00) 0000-0000` |
| 11 | `(00) 0 0000-0000` |

## Integrações

- [Class Validator](/v1/integrations/class-validator)
- [Indicative](/v1/integrations/indicative)
- [Joi](/v1/integrations/joi)
- [Vuelidate](/v1/integrations/vuelidate)
- [Yup](/v1/integrations/yup)

<script setup lang="ts">
import { validate, fake } from 'validation-br/dist/phone'

function handleValidate(value: string) {
  return validate(value)
}

function handleGenerate(withMask: boolean) {
  return fake(withMask)
}
</script>
