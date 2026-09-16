---
outline: deep
title: Integração com Vuelidate (v1) — CPF/CNPJ em Vue
description: Guia da API legada 1.x — combine o Vuelidate com a validation-br para validar CPF, CNPJ e documentos brasileiros em JavaScript.
---

# Integração com Vuelidate

O [Vuelidate](https://vuelidate-next.netlify.app/) é usado para validação de estado em aplicações Vue.js. Uma das funções `isX` do `validation-br` pode ser usada diretamente como um `$validator` customizado. Este guia usa a API de funções soltas da versão 1.x; para projetos novos, veja a [integração com Vuelidate na versão 2.0](/v2/integrations/vuelidate).

## Criar validação personalizada

```js
import { isCPF } from 'validation-br';
import { helpers } from '@vuelidate/validators';

const cpfValido = helpers.withMessage('CPF inválido', isCPF);
```

## Como usar

```js
// Definição das regras do Vuelidate
const rules = {
  cpf: { cpfValido },
};
```

## Saiba mais

- [Vuelidate](https://vuelidate-next.netlify.app/)
