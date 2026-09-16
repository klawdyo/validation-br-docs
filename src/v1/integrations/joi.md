---
outline: deep
title: Integração com Joi (v1) — CPF/CNPJ em Node.js
description: Guia da API legada 1.x — use o Joi com a validation-br para validar CPF, CNPJ e outros documentos brasileiros em Node.js e JavaScript.
---

# Integração com Joi

O [Joi](https://github.com/hapijs/joi) é um validador de esquemas usado em aplicações Node, React, Vue etc. Ele suporta regras customizadas via `.custom()`, onde uma das funções `isX` do `validation-br` pode ser reaproveitada. Este guia usa a API de funções soltas da versão 1.x; para projetos novos, veja a [integração com Joi na versão 2.0](/v2/integrations/joi).

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

## Como usar

```js
schema.validate({ cpf: '01234567890' });
```

## Saiba mais

- [Joi](https://github.com/hapijs/joi)
- [Documentação no npm](https://www.npmjs.com/package/joi)
