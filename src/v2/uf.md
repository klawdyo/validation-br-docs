---
outline: deep
---

# UF

Descrição: Validador para siglas de Unidades Federativas (UF). Página agrupada em `Utils`.

## Exemplos (API)

```js
const uf = new UF('SP')
console.log('uf.toString()', uf.toString())
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
