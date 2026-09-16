---
outline: deep
title: Telefone — validação de número brasileiro
description: Valide telefones fixos e celulares brasileiros em JavaScript ou TypeScript, com ou sem DDI, isoladamente ou como apoio ao reconhecimento de chave Pix.
---

# Telefone

Validação básica de números de telefone brasileiros (fixo e celular, com ou sem DDI) — usada internamente como apoio pro `PixKey` reconhecer chaves do tipo telefone. Números de telefone aparecem em cadastros, autenticação por SMS e formulários de contato, então esse validador também pode ser usado isoladamente, fora do contexto do Pix.

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
