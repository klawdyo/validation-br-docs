---
outline: deep
title: Telefone — validação de número brasileiro
description: Valide telefones fixos e celulares brasileiros em JavaScript ou TypeScript, com ou sem DDI, isoladamente ou como apoio ao reconhecimento de chave Pix.
---

# Telefone

Valide telefone brasileiro com JavaScript e TypeScript.

Use o validador de telefone para conferir números fixos e celulares, com ou sem DDI, isoladamente ou como apoio ao reconhecimento de chave Pix, com implementação completa em JavaScript, TypeScript e Node.js na validation-br. É uma validação básica de números de telefone brasileiros — usada internamente pro `PixKey` reconhecer chaves do tipo telefone. Números de telefone aparecem em cadastros, autenticação por SMS e formulários de contato, então esse validador também pode ser usado isoladamente, fora do contexto do Pix.

## Exemplos (API)

```js
import { isPhone } from 'validation-br';
import { Phone } from 'validation-br/phone';

// Modo rápido
isPhone('(11) 91234-5678'); // -> true

const p = new Phone('(11) 91234-5678')
console.log('p.value', p.value)           // -> '+5511912345678'
console.log('p.toString()', p.toString()) // -> '+5511912345678'
console.log('p.mask()', p.mask())         // -> '11 912345678'

const fake = Phone.fake()
console.log('Phone.fake()', fake.toString())
```
