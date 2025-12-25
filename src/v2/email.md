---
outline: deep
---

# Email

Descrição: Validador básico de endereços de e-mail. Esta implementação é simples e serve principalmente como suporte para `PixKey`.

## Exemplos (API)

```js
const e = new Email('user@example.com')
console.log('Email.toString()', e.toString())

const fake = Email.fake()
console.log('Email.fake()', fake.toString())
```
