---
outline: deep
title: Validar CPF e CNPJ alfanumérico com Yup
description: Aprenda a validar CPF e CNPJ alfanumérico com Yup em formulários React, usando isCPF e isCNPJ da validation-br como regras customizadas.
---

# Integração com Yup

Valide CPF e CNPJ alfanumérico com Yup em JavaScript.

Use a integração entre `isCPF`/`isCNPJ` da validation-br e o [Yup](https://github.com/jquense/yup) para validar formulários e estado em aplicações React, registrando um método customizado (`.cpf()`, `.cnpj()` etc) com `yup.addMethod`. Veja como plugar essa validação em JavaScript, TypeScript e Node.js: a mesma técnica funciona tanto para CPF quanto para CNPJ, incluindo o formato alfanumérico, e depois de registrado o método fica disponível em qualquer schema `yup.string()` do projeto.

## Como validar CPF e CNPJ alfanumérico com Yup

```js
import * as yup from 'yup';
import { isCPF } from 'validation-br';

yup.addMethod(yup.string, 'cpf', function (message) {
  return this.test('cpf', message ?? 'CPF inválido', (value) => isCPF(value));
});

const schema = yup.object().shape({
  cpf: yup.string().required().cpf(),
});
```

O mesmo registro pode ser feito para CNPJ. Como `isCNPJ` já valida CNPJ alfanumérico (novo formato, a partir de 2026) além do numérico, o método `.cnpj()` cobre os dois automaticamente:

```js
import * as yup from 'yup';
import { isCNPJ } from 'validation-br';

yup.addMethod(yup.string, 'cnpj', function (message) {
  return this.test('cnpj', message ?? 'CNPJ inválido', (value) => isCNPJ(value));
});

const schema = yup.object().shape({
  cnpj: yup.string().required().cnpj(),
});
```

> Bibliotecas de validação de terceiros só precisam de um predicado booleano — por
> isso o exemplo usa `isCPF` em vez de `new CPF()`. A API de classes é útil quando
> você quer o valor normalizado ou uma exceção detalhada, mas para plugar em outra
> lib de validação `isX` já é a integração completa, e funciona igual na 1.x e na 2.0.
