---
outline: deep
---

# PIX Copy/Paste (BETA)

Descrição: Validador para conteúdo `copy-paste` do PIX (código de pagamento).

Nota: Esta funcionalidade está em BETA; não é recomendada para produção.

## Exemplos (API)

```js
// Validar string do payload copy-paste (exemplo resumido)
const p = new PixCopyPaste('000201...')
console.log(p.toString())

// Gerar fake (se disponível)
// const fake = PixCopyPaste.fake()
```
