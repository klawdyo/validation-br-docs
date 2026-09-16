---
outline: deep
title: Validar CPF e CNPJ alfanumérico com Yup (v1)
description: Veja como validar CPF e CNPJ alfanumérico com Yup na API legada 1.x da validation-br, com exemplos prontos para aplicações React.
---

# Integração com Yup

Use `isCPF` e `isCNPJ` do validation-br com Yup para validar formulários.

O [Yup](https://github.com/jquense/yup) é usado para validar esquemas e estado em aplicações React. Como ele permite estender seus métodos de string com `yup.addMethod`, uma das funções `isX` do `validation-br` pode ser reaproveitada como uma regra customizada (`.cpf()`, `.cnpj()` etc), inclusive validando o formato alfanumérico de CNPJ. A mesma técnica usada abaixo para `.cpf()` vale, sem alterações, para criar um `.cnpj()` que aceita CNPJ alfanumérico. Este guia usa a API de funções soltas da versão 1.x; para projetos novos, veja a [integração com Yup na versão 2.0](/v2/integrations/yup).

## Como validar CPF e CNPJ alfanumérico com Yup

```js
import * as yup from 'yup';
import { isCPF } from 'validation-br';

yup.addMethod(yup.string, 'cpf', function (message) {
  return this.test('cpf', message ?? 'CPF inválido', (value) => isCPF(value));
});
```

O mesmo padrão serve para CNPJ:

```js
import { isCNPJ } from 'validation-br';

yup.addMethod(yup.string, 'cnpj', function (message) {
  // já valida CNPJ alfanumérico (novo formato, a partir de 2026)
  return this.test('cnpj', message ?? 'CNPJ inválido', (value) => isCNPJ(value));
});
```

## Como usar

`cpf()` e `cnpj()` já estão disponíveis para uso dentro do Yup:

```js
const schema = yup.object().shape({
  cpf: yup.string().required().cpf(),
  cnpj: yup.string().required().cnpj(),
});
```

## Saiba mais

- [Yup](https://github.com/jquense/yup)
