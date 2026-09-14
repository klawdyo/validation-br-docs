---
outline: deep
---

# Telefone

Validação básica de números de telefone brasileiros (fixo e celular, com ou sem DDI) — usada internamente como apoio pro `PixKey` reconhecer chaves do tipo telefone.

## Exemplos (API)

```js
const p = new Phone('(11) 91234-5678')
console.log('Phone.toString()', p.toString())

const fake = Phone.fake()
console.log('Phone.fake()', fake.toString())
```
