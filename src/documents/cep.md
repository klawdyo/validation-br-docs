---
outline: deep
---

# CEP

Descrição: Validador para códigos postais brasileiros (CEP). Página agrupada em `Utils`.

## Exemplos (API)

```js
const c = new CEP('01001-000')
console.log('CEP.toString()', c.toString())
console.log('CEP.mask()', c.mask())

const fake = CEP.fake()
console.log('CEP.fake()', fake.toString())
```
