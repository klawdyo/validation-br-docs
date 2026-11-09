---
outline: deep
title: UF — sigla dos estados brasileiros
description: Biblioteca TypeScript para validar sigla de UF, obter o nome completo do estado e gerar valores aleatórios para testes em Node.js e no navegador.
---

# UF

Valide sigla de UF e gere estados aleatórios com JavaScript e TypeScript.

Use o validador de UF para conferir a sigla de duas letras de um estado ou do Distrito Federal, obtenha o nome completo de cada unidade federativa e gere valores aleatórios para testes em Node.js e no navegador com a validation-br. UF é usada em endereços, documentos e faixas de CEP, e esse validador conhece as 27 unidades federativas do Brasil. É usado internamente por outros validadores da biblioteca, como o CEP, para checar a qual estado uma faixa pertence.

## Exemplos (API)

```js
import { isUF } from 'validation-br';
import { UF } from 'validation-br/uf';

// Modo rápido
isUF('SP'); // -> true

const uf = new UF('SP')
console.log('uf.value', uf.value)
console.log('uf.toString()', uf.toString())
console.log('uf.mask()', uf.mask())
console.log('uf.short', uf.short)
console.log('uf.name', uf.name)
console.log('uf.getName()', uf.getName())

// static getters
console.log('UF.SP.toString()', UF.SP.toString())
console.log('UF.getList().length', UF.getList().length)
console.log('UF.getRandom().short', UF.getRandom().short)

const fake = UF.getRandom()
console.log('fake.short', fake.short)
```
