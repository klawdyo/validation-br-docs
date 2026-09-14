---
outline: deep
---

# Email

Validação básica de formato de e-mail — usada internamente como apoio pro `PixKey` reconhecer chaves do tipo e-mail, mas pode ser usada sozinha também.

## Exemplos (API)

```js
const e = new Email('user@example.com')
console.log('e.value', e.value)
console.log('Email.toString()', e.toString())
// e.mask() lança exceção — Email não tem máscara

const fake = Email.fake()
console.log('Email.fake()', fake.toString())
```
