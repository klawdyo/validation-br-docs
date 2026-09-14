---
outline: deep
---

# Base

Classe base que todo validador da lib estende — não é usada diretamente, mas entender ela ajuda a entender o comportamento comum (imutabilidade, `.mask()`, `.toString()`) de qualquer documento.

## Exemplo de uso

```js
import { Base } from 'validation-br'

// Exemplo genérico
Base.someHelper(...)
```
