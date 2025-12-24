---
outline: deep
---

# PIX Key

Descrição: Validador de chaves PIX. Aceita `cpf`, `cnpj`, `email`, `phone` e `evp` (UUID).

O `PixKey` determina o tipo da chave e expõe `type` com o valor do enum `PixKeys`.

## Como a validação funciona

```text
O validador testa o valor contra os validadores disponíveis em `main`: isCPF, isCNPJ, isUUID (evp), isEmail e isPhone. O primeiro que casar define o `type`.
```

## Exemplos (API)

```js
// Validar e obter o tipo
const pk = new PixKey('user@example.com')
console.log('PixKey.type', pk.type) // 'email'

// Gerar chaves fake por tipo
console.log('PixKey.fake("cpf")', PixKey.fake({ type: 'cpf' }).toString())
console.log('PixKey.fake("cnpj")', PixKey.fake({ type: 'cnpj' }).toString())
console.log('PixKey.fake("evp")', PixKey.fake({ type: 'evp' }).toString())

// Sem tipo, gera um tipo aleatório
console.log('PixKey.fake()', PixKey.fake().toString())
```
