---
outline: deep
---

# CPF

**Versão 1.0** - Validador para números de CPF (Cadastro de Pessoas Físicas).

## API

```js
import { isCPF } from 'validation-br@1.0'

// Validar um CPF
const result = isCPF('280.012.389-38')
console.log(result) // true ou false
```

## Notas

Na versão 1.0, apenas validação booleana é suportada. Para mais recursos, veja a [v2.0](/).
