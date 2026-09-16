---
outline: deep
title: Email — validação de formato em JavaScript
description: Valide o formato de e-mail com JavaScript ou TypeScript, útil como validador isolado ou como apoio interno ao reconhecimento de chave Pix.
---

# Email

Valide formato de e-mail com JavaScript e TypeScript.

Use o validador de e-mail para conferir rapidamente o formato de um endereço, isoladamente ou como apoio interno ao reconhecimento de chave Pix, com implementação completa em JavaScript, TypeScript e Node.js na validation-br. É uma validação básica de formato de e-mail — usada internamente pro `PixKey` reconhecer chaves do tipo e-mail, mas também é útil para checar rapidamente um campo de e-mail em formulários de cadastro sem precisar de uma dependência separada só para isso. Por fazer parte de uma biblioteca JavaScript e TypeScript, funciona tanto em Node.js quanto diretamente no navegador.

## Exemplos (API)

```js
const e = new Email('user@example.com')
console.log('e.value', e.value)
console.log('Email.toString()', e.toString())
// e.mask() lança exceção — Email não tem máscara

const fake = Email.fake()
console.log('Email.fake()', fake.toString())
```
