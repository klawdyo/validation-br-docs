---
outline: deep
title: Integração com Joi — validação de CPF/CNPJ (Node.js)
description: Use o Joi com a validation-br para validar CPF, CNPJ e outros documentos brasileiros em aplicações Node.js e JavaScript.
---

# Integração com Joi

O [Joi](https://github.com/hapijs/joi) é um validador de esquemas usado em aplicações Node, React, Vue etc. Ele suporta regras customizadas via `.custom()`, onde uma das funções `isX` do `validation-br` pode ser reaproveitada. Com isso, é possível validar CPF, CNPJ e outros documentos brasileiros dentro do mesmo schema Joi usado para validar o restante da requisição, sem código adicional fora dele.

## Exemplo (API)

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

> Bibliotecas de validação de terceiros só precisam de um predicado booleano — por
> isso o exemplo usa `isCPF` em vez de `new CPF()`. A API de classes é útil quando
> você quer o valor normalizado ou uma exceção detalhada, mas para plugar em outra
> lib de validação `isX` já é a integração completa, e funciona igual na 1.x e na 2.0.
