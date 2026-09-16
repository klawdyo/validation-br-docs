---
outline: deep
title: Integração com Yup (v1) — CPF/CNPJ em React
description: Guia da API legada 1.x — estenda o Yup com a validation-br para validar CPF, CNPJ e outros documentos brasileiros em JavaScript.
---

# Integração com Yup

O [Yup](https://github.com/jquense/yup) é usado para validar esquemas e estado em aplicações React. Como ele permite estender seus métodos de string com `yup.addMethod`, uma das funções `isX` do `validation-br` pode ser reaproveitada como uma regra customizada (`.cpf()`, `.cnpj()` etc). Este guia usa a API de funções soltas da versão 1.x; para projetos novos, veja a [integração com Yup na versão 2.0](/v2/integrations/yup).

## Criar validação personalizada

```js
import * as yup from 'yup';
import { isCPF } from 'validation-br';

yup.addMethod(yup.string, 'cpf', function (message) {
  return this.test('cpf', message ?? 'CPF inválido', (value) => isCPF(value));
});
```

## Como usar

`cpf()` já está disponível para uso dentro do Yup:

```js
const schema = yup.object().shape({
  cpf: yup.string().required().cpf(),
});
```

## Saiba mais

- [Yup](https://github.com/jquense/yup)
