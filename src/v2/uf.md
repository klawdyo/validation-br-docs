---
outline: deep
title: UF — sigla dos estados brasileiros
description: Biblioteca TypeScript para validar sigla de UF, obter o nome completo do estado e gerar valores aleatórios para testes em Node.js e no navegador.
---

# UF

UF é a sigla de duas letras que identifica um estado ou o Distrito Federal (SP, RJ, MG...) — usada em endereços, documentos e faixas de CEP. Esse validador conhece as 27 unidades federativas do Brasil e oferece nome completo, sigla e geração de valores aleatórios para testes. É usado internamente por outros validadores da biblioteca, como o CEP, para checar a qual estado uma faixa pertence.

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
