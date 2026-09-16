---
outline: deep
title: Integração com Joi (v1) — CPF/CNPJ em Node.js
description: Guia da API legada 1.x — use o Joi com a validation-br para validar CPF, CNPJ alfanumérico e outros documentos brasileiros em Node.js.
---

# Integração com Joi

O [Joi](https://github.com/hapijs/joi) é um validador de esquemas usado em aplicações Node, React, Vue etc. Ele suporta regras customizadas via `.custom()`, onde uma das funções `isX` do `validation-br` pode ser reaproveitada — tanto para CPF quanto para CNPJ, incluindo o formato alfanumérico de CNPJ. A mesma técnica usada abaixo para `validateCpf` vale, sem alterações, para criar um `validateCnpj` alfanumérico. Este guia usa a API de funções soltas da versão 1.x; para projetos novos, veja a [integração com Joi na versão 2.0](/v2/integrations/joi).

## Criar validação personalizada

```js
import Joi from 'joi';
import { isCPF } from 'validation-br';

const validateCpf = (value, helper) => {
  if (!isCPF(value)) {
    return helper.message('CPF inválido');
  }
  return value;
};

const schema = Joi.object({
  cpf: Joi.string().custom(validateCpf),
});
```

O mesmo padrão serve para CNPJ:

```js
import { isCNPJ } from 'validation-br';

const validateCnpj = (value, helper) => {
  // já valida CNPJ alfanumérico (novo formato, a partir de 2026)
  if (!isCNPJ(value)) {
    return helper.message('CNPJ inválido');
  }
  return value;
};

const schemaWithCnpj = Joi.object({
  cnpj: Joi.string().custom(validateCnpj),
});
```

## Como usar

```js
schema.validate({ cpf: '01234567890' });
schemaWithCnpj.validate({ cnpj: '01234567000189' });
```

## Saiba mais

- [Joi](https://github.com/hapijs/joi)
- [Documentação no npm](https://www.npmjs.com/package/joi)
