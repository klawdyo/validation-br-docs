---
outline: deep
title: UUID — validação de identificadores
description: Valide identificadores UUID em JavaScript ou TypeScript, use como validador isolado ou como apoio interno ao reconhecimento de chave Pix aleatória.
---

# UUID

Valide identificadores UUID com JavaScript e TypeScript.

Use o validador de UUID isoladamente ou como apoio interno ao reconhecimento de chave Pix aleatória, com implementação completa em JavaScript, TypeScript e Node.js na validation-br. É a validação de identificadores UUID — usada internamente como apoio pro `PixKey` reconhecer chaves aleatórias (EVP), que são sempre um UUID. UUIDs também aparecem como identificador único em bancos de dados, filas e APIs, então esse validador pode ser usado sozinho, fora do contexto do Pix. Como o restante da biblioteca, funciona tanto em Node.js quanto no navegador, com tipos TypeScript inclusos.

## Exemplos (API)

```js
const id = new UUID('550e8400-e29b-41d4-a716-446655440000')
console.log('id.value', id.value)
console.log('UUID.toString()', id.toString())
console.log('id.mask()', id.mask())

const fake = UUID.fake()
console.log('UUID.fake()', fake.toString())
```
