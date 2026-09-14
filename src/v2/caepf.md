---
outline: deep
---

# CAEPF

CAEPF identifica, perante a Receita Federal, uma atividade econômica exercida por uma pessoa física que não tem CNPJ — o caso mais comum é produtor rural e segurado especial (quem trabalha em regime de economia familiar na agricultura, sem ser empregado nem ter empresa constituída). Substituiu o antigo cadastro CEI da Receita/INSS.

<DocPlayground
  placeholder="Digite um CAEPF para validar"
  valid-label="CAEPF válido"
  invalid-label="CAEPF inválido"
  generate-label="Gerar CAEPF de exemplo"
  :validate="handleValidate"
  :generate="handleGenerate"
/>

## Exemplos (API)

```js
import { CAEPF } from 'validation-br/caepf';

// Criar e validar (lança se inválido)
const caepf = new CAEPF('411.422.600/001-01');
caepf.toString(); // -> '41142260000101'
caepf.mask();      // -> '411.422.600/001-01'

// Gerar um CAEPF de exemplo válido
const exemplo = CAEPF.fake();
exemplo.toString();

// Calcular o DV a partir dos 12 primeiros dígitos (base do CPF + número de ordem)
CAEPF.checksum('411422600001'); // -> '01'
```

## Como o cálculo é feito

O CAEPF tem 14 caracteres, no formato `000.000.000/000-00`: os 9
primeiros são a base do CPF do titular (sem os 2 dígitos verificadores
do próprio CPF), os 3 seguintes são um **número de ordem** — já que uma
mesma pessoa pode ter várias atividades ou estabelecimentos, cada um
com seu próprio CAEPF —, e os 2 últimos são os dígitos verificadores.

O cálculo é uma soma ponderada por coluna, igual ao CPF/CNPJ, mas com
uma diferença importante: aqui o dígito verificador é o **resto direto**
da divisão por 11 (não `11 - resto`). Depois de calcular DV1 e DV2 dessa
forma, o CAEPF ainda passa por um ajuste final que não existe em nenhum
outro documento desta lista: os dois dígitos juntos somam 12 e, se
ultrapassarem 99, subtraem 100.

<img src="/diagrams/caepf-check-digits.svg" alt="Cálculo passo a passo dos dígitos verificadores do CAEPF" />

<script setup lang="ts">
import { CAEPF } from 'validation-br-v2/caepf'

function handleValidate(value: string) {
  try {
    new CAEPF(value)
    return true
  } catch {
    return false
  }
}

function handleGenerate(withMask: boolean) {
  const fake = CAEPF.fake()
  return withMask ? fake.mask() : fake.toString()
}
</script>
