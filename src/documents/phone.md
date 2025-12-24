---
outline: deep
---

# Telefone

Descrição: Validador básico para números de telefone brasileiros. Implementação simples — usado principalmente para dar suporte a `PixKey`.

## Exemplos (API)

```js
const p = new Phone('(11) 91234-5678')
console.log('Phone.toString()', p.toString())

const fake = Phone.fake()
console.log('Phone.fake()', fake.toString())
```
