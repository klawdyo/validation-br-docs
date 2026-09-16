---
layout: doc
sidebar: true
lastUpdated: true
title: validation-br v1 (legada) — validação de documentos brasileiros em JavaScript
description: Documentação da versão 1.x (legada) da validation-br, biblioteca JavaScript para validar, formatar e gerar CPF, CNPJ, CNH, PIS/PASEP e outros documentos brasileiros em Node.js.
---

# validation-br v1 (legada)

Biblioteca JavaScript com funções prontas para validar documentos brasileiros.

Versão 1.x da `validation-br` traz funções soltas (`isCPF`, `isCNPJ`,
`validate`, `mask`, `fake`...) para cada tipo de documento, prontas para uso
em Node.js e no navegador, sem necessidade de instanciar classes. Para
projetos novos, veja a [documentação da 2.0](/v2/), com API orientada a
classes e tipagem TypeScript completa.

## Instalação

```sh
npm install validation-br

# OR

yarn add validation-br

```


## Validadores

- [CPF](./cpf.md)
- [CNPJ](./cnpj.md)
- [CNH](./cnh.md)
- [Telefone](./phone.md)
- [PIS/PASEP](./pis-pasep.md)
- [NUP-17](./nup17.md)
- [Processo Judicial](./judicial-process.md)
- [Renavam](./renavam.md)
- [Título de Eleitor](./tituloEleitor.md)
- [Código de Rastreamento Postal](./postal-track-code.md)