---
layout: home

hero:
  name: "validation-br"
  text: "2.0"
  tagline: Valide, formate e gere documentos brasileiros com uma API orientada a classes — CPF, CNPJ, CNH, PIS/PASEP, placas, processos judiciais e muito mais.
  actions:
    - theme: brand
      text: Começar agora →
      link: /v2/install
    - theme: alt
      text: Ver documentos suportados
      link: /v2/cpf
    - theme: alt
      text: Documentação da v1.x (legacy)
      link: /v1/

features:
  - icon: 🧩
    title: Uma classe por documento
    details: "new CPF(valor) já valida, normaliza e formata. Sem chamar 3 funções soltas pra cada operação."
    link: /v2/cpf
  - icon: 🎭
    title: Dados fake para testes
    details: "CPF.fake(), CNPJ.fake()... geram instâncias válidas prontas pra popular formulários e seeds."
    link: /v2/cpf
  - icon: 🛡️
    title: Checksum isolado
    details: "checksum() calcula o dígito verificador sem depender de máscara ou normalização implícita."
    link: /v2/cpf
  - icon: 🔤
    title: CNPJ alfanumérico
    details: Suporte ao novo formato de CNPJ com letras e números, já compatível com a mudança de 2026.
    link: /v2/cnpj
  - icon: 🔑
    title: PIX e mais
    details: Validação de chaves PIX (CPF, CNPJ, telefone, e-mail, aleatória) e Pix Copia e Cola.
    link: /v2/pix-key
  - icon: 🧰
    title: Integrações prontas
    details: Adapters para Yup, Zod, Class Validator, Vuelidate e Joi.
    link: /v2/integrations/zod
---

<div class="vp-doc" style="max-width: 720px; margin: 64px auto; text-align: center;">

## Por que migrar para a 2.0?

Na 1.x, cada documento era um conjunto de funções soltas (`validate`, `dv`,
`fake`, `mask`, `normalize`). Na 2.0, cada documento é uma **classe
imutável** que já valida no construtor e guarda o valor normalizado —
menos chamadas repetidas, menos chance de esquecer de normalizar antes de
validar.

As funções `isX` (ex. `isCPF`, `isCNPJ`) importadas direto de
`validation-br` continuam funcionando como antes. A mudança afeta só quem
importava os submódulos diretamente.

[Ver todas as breaking changes →](/v2/migration)

</div>
