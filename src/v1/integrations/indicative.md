---
outline: deep
title: Integração com Indicative (v1) — CPF/CNPJ no AdonisJS
description: Guia da API legada 1.x — use o Indicative do AdonisJS 4 com a validation-br para validar CPF, CNPJ alfanumérico e outros docs brasileiros.
---

# Integração com Indicative

[AdonisJS 4](https://legacy.adonisjs.com/docs/4.1/installation) usa [indicative](https://indicative-v5.adonisjs.com/) para realizar suas validações. Uma das funções `isX` do `validation-br` pode ser reaproveitada como uma regra customizada, seja para CPF ou para CNPJ — incluindo o formato alfanumérico de CNPJ. A mesma técnica abaixo, usada para criar a regra `cpf`, serve sem alterações para criar uma regra `cnpj` alfanumérico. Este guia usa a API de funções soltas da versão 1.x da `validation-br`, voltada a projetos Node.js e JavaScript que ainda usam o AdonisJS 4 legado.

## Criar validação personalizada

Crie um arquivo `validation_br.js` em seu diretório de validações customizadas, por exemplo `/app/Validators/extend/validation_br.js`.

```js
const { isCPF } = require('validation-br');

// /app/Validators/extend/validation_br.js
const _cpf = async (payload, fieldName, message, arguments, get) => {
  // Pega o valor do campo
  const cpf = get(payload, fieldName);
  // Pula caso esteja vazio
  if (!cpf) return;

  if (!isCPF(cpf)) {
    throw message;
  }
};

const Validator = use('Validator');
Validator.extend('cpf', _cpf);
```

O mesmo padrão serve para CNPJ. Adicione ao mesmo arquivo (ou a um `validation_br_cnpj.js` separado):

```js
const { isCNPJ } = require('validation-br');

// /app/Validators/extend/validation_br.js
const _cnpj = async (payload, fieldName, message, arguments, get) => {
  // Pega o valor do campo
  const cnpj = get(payload, fieldName);
  // Pula caso esteja vazio
  if (!cnpj) return;

  // já valida CNPJ alfanumérico (novo formato, a partir de 2026)
  if (!isCNPJ(cnpj)) {
    throw message;
  }
};

Validator.extend('cnpj', _cnpj);
```

## Como usar

Importe o arquivo na página que define as regras de validação do seu endpoint.

```js
// Importa o arquivo com as validações customizadas
require('../extend/validation_br');

// Inclui as regras criadas para os campos cpf e cnpj
get rules() {
  return {
    cpf: [
      rule('required'),
      rule('cpf'),
    ],
    cnpj: [
      rule('required'),
      rule('cnpj'),
    ],
  };
}
```

## Saiba mais

- [Adonis 4](https://legacy.adonisjs.com/docs/4.1/installation)
- [Indicative](https://indicative-v5.adonisjs.com/)
