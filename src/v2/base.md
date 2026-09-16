---
outline: deep
title: Base — classe comum a todos os validadores
description: Entenda a classe Base da validation-br, escrita em TypeScript, que dá a todo validador da biblioteca imutabilidade e métodos mask() e toString() consistentes.
---

# Base

Classe base que todo validador da lib estende — não é usada diretamente, mas entender ela ajuda a entender o comportamento comum (imutabilidade, `.mask()`, `.toString()`) de qualquer documento. Toda classe de documento da validation-br (CPF, CNPJ, Boleto etc.) herda dela, então o comportamento descrito aqui é comum a todas: o valor é normalizado e congelado assim que a instância é criada, e `.toString()`/`.mask()` sempre retornam o mesmo resultado para a mesma instância. Conhecer a Base ajuda principalmente quem quer estender a biblioteca com um validador próprio ou entender por que todos se comportam de forma tão parecida entre si.

## Exemplo de uso

```js
import { Base } from 'validation-br'

// Exemplo genérico
Base.someHelper(...)
```
