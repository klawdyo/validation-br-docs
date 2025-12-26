---
outline: deep
---

# UUID

Descrição: Validador básico de `UUID`. Implementação simples usada principalmente para dar suporte ao `PixKey` (EVP).

## Exemplos (API)

```js
const id = new UUID('550e8400-e29b-41d4-a716-446655440000')
console.log('UUID.toString()', id.toString())

const fake = UUID.fake()
console.log('UUID.fake()', fake.toString())
```
