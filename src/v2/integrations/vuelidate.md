---
outline: deep
title: Validar CPF e CNPJ alfanumérico com Vuelidate
description: Aprenda a validar CPF e CNPJ alfanumérico com Vuelidate em aplicações Vue.js, usando isCPF e isCNPJ da validation-br como validators.
---

# Integração com Vuelidate

Valide CPF e CNPJ alfanumérico com Vuelidate em Vue.js.

Use `isCPF` e `isCNPJ` da validation-br diretamente como um `$validator` customizado do [Vuelidate](https://vuelidate-next.netlify.app/), a biblioteca de validação de estado em aplicações Vue.js. Veja como plugar essa validação em JavaScript e TypeScript: a mesma técnica vale tanto para CPF quanto para CNPJ — incluindo o formato alfanumérico —, de modo que os campos ganham validação reativa junto com o restante das regras definidas no componente.

## Como validar CPF e CNPJ alfanumérico com Vuelidate

```js
import { isCPF } from 'validation-br';
import { helpers } from '@vuelidate/validators';

const cpfValido = helpers.withMessage('CPF inválido', isCPF);

const rules = {
  cpf: { cpfValido },
};
```

A mesma regra pode ser criada para CNPJ. Como `isCNPJ` já valida CNPJ alfanumérico (novo formato, a partir de 2026) além do numérico, basta reaproveitar o mesmo padrão:

```js
import { isCNPJ } from 'validation-br';
import { helpers } from '@vuelidate/validators';

const cnpjValido = helpers.withMessage('CNPJ inválido', isCNPJ);

const rules = {
  cnpj: { cnpjValido },
};
```

> Bibliotecas de validação de terceiros só precisam de um predicado booleano — por
> isso o exemplo usa `isCPF` em vez de `new CPF()`. A API de classes é útil quando
> você quer o valor normalizado ou uma exceção detalhada, mas para plugar em outra
> lib de validação `isX` já é a integração completa, e funciona igual na 1.x e na 2.0.
