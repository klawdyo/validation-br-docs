---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "validation-br v2.0"
  text: "Validação de documentos do Brasil"
  tagline: Versão atual com classes, máscaras e utilitários avançados
  actions:
    - theme: brand
      text: Documentação
      link: /documents/cpf
    - theme: alt
      text: Ver v1.0
      link: /v1/

features:
  - title: CPF
    details: Validação com classe, máscara e geração de dados fake
    link: /documents/cpf
  - title: CNPJ
    details: Suporte para alfanuméricos (entrada 2026)
    link: /documents/cnpj
  - title: Documentos
    details: CNH, RENAVAM, Título de Eleitor e mais
    link: /documents/cnh
  - title: PIX
    details: Validação de chaves PIX com múltiplos formatos
    link: /documents/pix-key
  - title: Utilitários
    details: Funções para manipulação e validação de dados
    link: /documents/utils
  - title: UF
    details: Validador de Unidades Federativas com nome preenchido
    link: /documents/uf
---

## Migração de v1.0

Se você está usando a v1.0, [consulte a documentação legada](/v1/).

**Principais mudanças em v2.0:**
- ✅ Classes com validação automática
- ✅ Método `.mask()` para formatação
- ✅ Método `.fake()` para dados de teste
- ✅ Checksum calculável independentemente
- ✅ Getters para acesso a propriedades
