---
outline: deep
---

# Email

Validação básica de formato de e-mail — usada internamente como apoio pro `PixKey` reconhecer chaves do tipo e-mail, mas pode ser usada sozinha também.

## Exemplos (API)

```js
const e = new Email('user@example.com')
console.log('Email.toString()', e.toString())

const fake = Email.fake()
console.log('Email.fake()', fake.toString())
```
