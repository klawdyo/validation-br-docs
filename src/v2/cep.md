---
outline: deep
title: CEP — validação de código postal por UF
description: Valide CEP em JavaScript ou TypeScript, descubra a UF pela faixa numérica e gere CEPs de exemplo para testes em Node.js ou no navegador.
---

# CEP

CEP identifica uma área de entrega dos Correios — uma cidade, um bairro ou até um endereço específico, dependendo da faixa. Esse validador também sabe a qual UF cada faixa de CEP pertence. É um dos campos mais comuns em formulários de cadastro, checkout de e-commerce e sistemas de logística no Brasil.

<Callout type="warning">
  Este validador só confere o <strong>formato</strong> do CEP (e,
  opcionalmente, se ele cai na faixa de uma UF) — ele <strong>não
  consulta</strong> nenhum serviço dos Correios ou de terceiros pra
  saber o endereço real. Pra buscar rua, bairro e cidade a partir de um
  CEP, use um serviço externo como o
  <a href="https://viacep.com.br/" target="_blank" rel="noopener">ViaCEP</a>.
</Callout>

<DocPlayground
  placeholder="Digite um CEP para validar"
  valid-label="CEP válido"
  invalid-label="CEP inválido"
  generate-label="Gerar CEP de exemplo"
  secondary-option-label="Só de SP"
  :validate="handleValidate"
  :generate="handleGenerate"
/>

## Exemplos (API)

```js
import { isCEP } from 'validation-br';
import { CEP } from 'validation-br/cep';
import { UF } from 'validation-br/uf';

// Modo rápido
isCEP('01001-000'); // -> true

// Criar e validar (lança se inválido)
const cep = new CEP('01001-000');
cep.value;      // -> '01001000'
cep.toString(); // -> '01001000'
cep.mask();      // -> '01001-000'

// Validar exigindo que o CEP seja de uma UF específica
new CEP('01001-000', { uf: UF.SP }); // ok, é de SP
new CEP('01001-000', { uf: UF.RJ }); // lança: não é do RJ

// Descobrir a UF a partir do CEP
CEP.getUFByCEP('59066-090').value; // -> 'RN'

// Gerar um CEP de exemplo (qualquer UF, ou de uma UF específica)
CEP.fake();
CEP.fake({ uf: UF.RN });

// Sortear um CEP válido dentro da faixa de uma UF
CEP.getRandomByUF(UF.RN);

// Ver a(s) faixa(s) de CEP de uma UF
CEP.getRangesByUF(UF.AM); // -> duas faixas, o Amazonas não é contínuo
```

> `CEP.checksum()` lança `NoChecksumException` — CEP não tem dígito verificador.

## Como funciona a faixa por UF

Os 2 primeiros dígitos do CEP indicam a faixa e, na prática, quase
sempre bastam para saber a UF: cada estado ocupa um bloco de prefixos
exclusivo (SP vai de 01 a 19, RJ de 20 a 28, e assim por diante). Uma
meia dúzia de prefixos (68, 69, 72, 73 e 76) são exceção e ficam
divididos entre dois estados vizinhos — nesses casos, saber a UF exata
exige olhar o 3º dígito em diante, e é isso que `CEP.getUFByCEP()` faz
internamente.

<img src="/diagrams/cep-uf-ranges.svg" alt="Faixas de prefixo de CEP por UF, com destaque para os prefixos compartilhados entre estados" />

<script setup lang="ts">
import { CEP } from 'validation-br-v2/cep'
import { UF } from 'validation-br-v2/uf'

function handleValidate(value: string) {
  try {
    new CEP(value)
    return true
  } catch {
    return false
  }
}

function handleGenerate(withMask: boolean, onlySP: boolean) {
  const fake = onlySP ? CEP.fake({ uf: UF.SP }) : CEP.fake()
  return withMask ? fake.mask() : fake.toString()
}
</script>
