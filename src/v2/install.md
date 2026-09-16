---
title: Instalação — validation-br via npm, yarn ou pnpm
description: Como instalar a validation-br, biblioteca JavaScript e TypeScript para validar documentos brasileiros, via npm, yarn ou pnpm em projetos Node.js.
---

# Instalação

`validation-br` está publicada no [npm](https://npmjs.com/package/validation-br)
e pode ser instalada com qualquer gerenciador de pacotes JavaScript, em
projetos Node.js (backend, CLI, scripts) ou em aplicações front-end
(React, Vue, Angular, Next.js):

```sh
# npm
npm install validation-br

# yarn
yarn add validation-br

# pnpm
pnpm add validation-br
```

O pacote é distribuído com build duplo, compatível tanto com `require`
(CommonJS) quanto com `import` (ES Modules), com tipos TypeScript
inclusos, sem necessidade de instalar `@types/validation-br` à parte.

## Importação direta

Valida diretamente a partir do objeto principal — retorna `true`/`false`,
sem lançar exceção:

```js
import { isCPF, isCNPJ } from 'validation-br';

isCPF('280.012.389-38'); // -> true
```

## Importação por submódulo (API de classes)

Cada documento tem uma classe própria, com validação, máscara, geração de
dados fake e cálculo de dígito verificador:

```js
import { CPF } from 'validation-br/cpf';

const cpf = new CPF('280.012.389-38'); // lança se inválido
cpf.mask();      // '280.012.389-38'
cpf.toString();  // '28001238938'

CPF.fake();             // instância de CPF válida e aleatória
CPF.checksum('280012389'); // '38'
```

Já usa a 1.x e quer migrar? Veja o [guia de migração](/v2/migration).
