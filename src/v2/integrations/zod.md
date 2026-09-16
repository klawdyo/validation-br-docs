---
outline: deep
title: Integração com Zod — validação de CPF/CNPJ em TS
description: Combine o Zod com a validation-br para validar CPF e CNPJ, incluindo o formato alfanumérico, em schemas TypeScript, no Node.js ou no navegador.
---

# Integração com Zod

O [Zod](https://zod.dev/) é um validador de esquemas TypeScript-first, com suporte nativo a validações customizadas via `.refine()`. Uma das funções `isX` do `validation-br` pode ser usada diretamente como o predicado de um `refine`. A mesma técnica vale tanto para CPF quanto para CNPJ — incluindo o novo formato alfanumérico —, permitindo validar esses documentos brasileiros como parte do mesmo schema TypeScript usado para o restante do formulário ou payload, sem depender de bibliotecas adicionais.

## Exemplo (API)

```js
import { z } from 'zod';
import { isCPF } from 'validation-br';

const schema = z.object({
  cpf: z.string().refine(isCPF, { message: 'CPF inválido' }),
});

schema.parse({ cpf: '01234567890' });
```

O mesmo padrão se aplica a CNPJ. Como `isCNPJ` aceita tanto o formato numérico quanto o alfanumérico (novo formato brasileiro, a partir de 2026), nenhum ajuste extra é necessário no schema:

```js
import { z } from 'zod';
import { isCNPJ } from 'validation-br';

const schema = z.object({
  // aceita CNPJ numérico e alfanumérico
  cnpj: z.string().refine(isCNPJ, { message: 'CNPJ inválido' }),
});

schema.parse({ cnpj: '12ABC34501DE35' });
```

> Bibliotecas de validação de terceiros só precisam de um predicado booleano — por
> isso o exemplo usa `isCPF` em vez de `new CPF()`. A API de classes é útil quando
> você quer o valor normalizado ou uma exceção detalhada, mas para plugar em outra
> lib de validação `isX` já é a integração completa, e funciona igual na 1.x e na 2.0.
