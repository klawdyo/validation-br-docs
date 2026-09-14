---
outline: deep
---

# UUID

Validação de identificadores UUID — usada internamente como apoio pro `PixKey` reconhecer chaves aleatórias (EVP), que são sempre um UUID.

## Exemplos (API)

```js
const id = new UUID('550e8400-e29b-41d4-a716-446655440000')
console.log('id.value', id.value)
console.log('UUID.toString()', id.toString())
console.log('id.mask()', id.mask())

const fake = UUID.fake()
console.log('UUID.fake()', fake.toString())
```
