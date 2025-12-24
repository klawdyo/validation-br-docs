---
outline: deep
---

# CEP

**Versão 1.0** - Validador para códigos postais.

## API

```js
import { isCEP } from 'validation-br@1.0'

const result = isCEP('01001-000')
console.log(result) // true ou false
```

## Notas

Validação simples. Para mais recursos com máscaras e utilitários, use a v2.0.
