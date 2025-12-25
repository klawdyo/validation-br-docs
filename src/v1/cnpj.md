---
outline: deep
---

# CNPJ

**Versão 1.0** - Validador para números de CNPJ.

## API

```js
import { isCNPJ } from 'validation-br@1.0'

const result = isCNPJ('12.345.678/0001-95')
console.log(result) // true ou false
```

## Notas

Na versão 1.0, apenas validação booleana. [Upgrade para v2.0](/) para máscaras e classes.
