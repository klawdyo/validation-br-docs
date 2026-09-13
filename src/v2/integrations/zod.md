---
outline: deep
---

# Integração com Zod

O [Zod](https://zod.dev/) é um validador de esquemas TypeScript-first, com suporte nativo a validações customizadas via `.refine()`. Uma das funções `isX` do `validation-br` pode ser usada diretamente como o predicado de um `refine`.

## Exemplo (API)

```js
import { z } from 'zod';
import { isCPF } from 'validation-br';

const schema = z.object({
  cpf: z.string().refine(isCPF, { message: 'CPF inválido' }),
});

schema.parse({ cpf: '01234567890' });
```

> Bibliotecas de validação de terceiros só precisam de um predicado booleano — por
> isso o exemplo usa `isCPF` em vez de `new CPF()`. A API de classes é útil quando
> você quer o valor normalizado ou uma exceção detalhada, mas para plugar em outra
> lib de validação `isX` já é a integração completa, e funciona igual na 1.x e na 2.0.
