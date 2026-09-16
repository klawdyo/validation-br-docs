---
outline: deep
title: Integração com Yup — validação de CPF/CNPJ (React)
description: Estenda o Yup com a validation-br para validar CPF, CNPJ e outros documentos brasileiros em formulários JavaScript e TypeScript.
---

# Integração com Yup

O [Yup](https://github.com/jquense/yup) é usado para validar esquemas e estado em aplicações React. Como ele permite estender seus métodos de string com `yup.addMethod`, uma das funções `isX` do `validation-br` pode ser reaproveitada como uma regra customizada (`.cpf()`, `.cnpj()` etc). Depois de registrado, o método fica disponível em qualquer schema `yup.string()` do projeto, em JavaScript ou TypeScript.

## Exemplo (API)

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

> Bibliotecas de validação de terceiros só precisam de um predicado booleano — por
> isso o exemplo usa `isCPF` em vez de `new CPF()`. A API de classes é útil quando
> você quer o valor normalizado ou uma exceção detalhada, mas para plugar em outra
> lib de validação `isX` já é a integração completa, e funciona igual na 1.x e na 2.0.
