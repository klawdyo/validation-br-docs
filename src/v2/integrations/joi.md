---
outline: deep
title: Validar CPF e CNPJ alfanumérico com Joi
description: Descubra como validar CPF e CNPJ alfanumérico com Joi em aplicações Node.js, usando isCPF e isCNPJ da validation-br em regras .custom().
---

# Integração com Joi

O [Joi](https://github.com/hapijs/joi) é um validador de esquemas usado em aplicações Node, React, Vue etc. Ele suporta regras customizadas via `.custom()`, onde uma das funções `isX` do `validation-br` pode ser reaproveitada. A mesma abordagem serve tanto para CPF quanto para CNPJ — incluindo o formato alfanumérico —, dentro do mesmo schema Joi usado para validar o restante da requisição, sem código adicional fora dele.

## Como validar CPF e CNPJ alfanumérico com Joi

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

schema.validate({ cpf: '01234567890' });
```

A mesma função de `.custom()` pode ser criada para CNPJ. `isCNPJ` já valida CNPJ alfanumérico (novo formato, a partir de 2026) além do formato numérico, sem exigir configuração adicional:

```js
import Joi from 'joi';
import { isCNPJ } from 'validation-br';

const validateCnpj = (value, helper) => {
  if (!isCNPJ(value)) {
    return helper.message('CNPJ inválido');
  }
  return value;
};

const schema = Joi.object({
  cnpj: Joi.string().custom(validateCnpj),
});

schema.validate({ cnpj: '12ABC34501DE35' });
```

> Bibliotecas de validação de terceiros só precisam de um predicado booleano — por
> isso o exemplo usa `isCPF` em vez de `new CPF()`. A API de classes é útil quando
> você quer o valor normalizado ou uma exceção detalhada, mas para plugar em outra
> lib de validação `isX` já é a integração completa, e funciona igual na 1.x e na 2.0.
