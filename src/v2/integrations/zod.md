---
outline: deep
title: Validar CPF e CNPJ alfanumérico com Zod
description: Veja como validar CPF e CNPJ alfanumérico com Zod em TypeScript, usando isCPF e isCNPJ da validation-br em schemas com .refine().
---

# Integração com Zod

Valide CPF e CNPJ alfanumérico com Zod em TypeScript.

Use o validador de CPF e CNPJ da validation-br — as funções `isCPF` e `isCNPJ` — como predicado de um `.refine()` do [Zod](https://zod.dev/), o validador de esquemas TypeScript-first com suporte nativo a validações customizadas. Veja como plugar esses documentos brasileiros em um schema `zod` em TypeScript e Node.js, cobrindo tanto CPF quanto CNPJ — incluindo o novo formato alfanumérico —, como parte do mesmo schema usado para validar o restante do formulário ou payload, sem depender de bibliotecas adicionais.

## Como validar CPF e CNPJ alfanumérico com Zod

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
