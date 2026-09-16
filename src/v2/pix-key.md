---
outline: deep
title: Chave Pix — CPF, CNPJ, e-mail, telefone ou EVP
description: Valide qualquer chave Pix em JavaScript ou TypeScript, com reconhecimento automático entre CPF, CNPJ, e-mail, telefone e chave aleatória (EVP).
---

# PIX Key

Chave Pix é o apelido que identifica uma conta bancária pro Pix — pode ser um CPF, CNPJ, e-mail, telefone ou uma chave aleatória (EVP). Esse validador reconhece automaticamente qual desses tipos foi informado. É o validador mais indicado para campos genéricos de "chave Pix" em formulários de pagamento, já que evita ter que perguntar ao usuário qual tipo de chave ele está informando.

<DocPlayground
  placeholder="Digite uma chave Pix para validar"
  valid-label="Chave válida"
  invalid-label="Chave inválida"
  generate-label="Gerar chave de exemplo"
  :show-mask-option="false"
  :validate="handleValidate"
  :generate="handleGenerate"
/>

## Tipos de chave suportados

Cada tipo de chave é validado internamente por um validador próprio, com suas próprias regras e particularidades — por exemplo, a chave aleatória (EVP) é sempre um UUID, mas só é aceita a **versão 4**.

<img src="/diagrams/pix-key-types.svg" alt="Os 5 tipos de chave Pix suportados (CPF, CNPJ, e-mail, telefone e chave aleatória/EVP) com o formato esperado e as particularidades de cada um" />

| Tipo | Validador | Documentação |
| --- | --- | --- |
| CPF | `isCPF` | [/v2/cpf](/v2/cpf) |
| CNPJ | `isCNPJ` | [/v2/cnpj](/v2/cnpj) |
| E-mail | `isEmail` | [/v2/email](/v2/email) |
| Telefone | `isPhone` | [/v2/phone](/v2/phone) |
| Aleatória (EVP) | `isUUID` (só v4) | [/v2/uuid](/v2/uuid) |

## Como a validação funciona

```text
O PixKey testa o valor contra os validadores disponíveis (isCPF, isCNPJ, isUUID pro EVP, isEmail e isPhone) — o primeiro que casar define o `type`, exposto com o valor do enum `PixKeys`.
```

## Exemplos (API)

```js
// Validar e obter o tipo
const pk = new PixKey('user@example.com')
console.log('pk.value', pk.value)           // -> 'user@example.com'
console.log('pk.toString()', pk.toString()) // -> 'user@example.com'
console.log('pk.mask()', pk.mask())         // -> 'user@example.com'
console.log('PixKey.type', pk.type) // 'email'

// Gerar chaves fake por tipo
console.log('PixKey.fake("cpf")', PixKey.fake({ type: 'cpf' }).toString())
console.log('PixKey.fake("cnpj")', PixKey.fake({ type: 'cnpj' }).toString())
console.log('PixKey.fake("evp")', PixKey.fake({ type: 'evp' }).toString())

// Sem tipo, gera um tipo aleatório
console.log('PixKey.fake()', PixKey.fake().toString())
```

<script setup lang="ts">
import { PixKey } from 'validation-br-v2/pix-key'

function handleValidate(value: string) {
  try {
    new PixKey(value)
    return true
  } catch {
    return false
  }
}

function handleGenerate() {
  return PixKey.fake().toString()
}
</script>
