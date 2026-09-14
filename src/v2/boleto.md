---
outline: deep
---

# Boleto

Boleto bancário é o meio de cobrança e pagamento mais usado no Brasil fora de cartão e Pix. O validador entende tanto a **linha digitável** (47 dígitos, a sequência impressa pra digitar manualmente) quanto o **código de barras** (44 dígitos), convertendo entre os dois formatos e também expondo campos já decompostos: banco, valor, data de vencimento e o "campo livre".

<DocPlayground
  placeholder="Digite uma linha digitável ou código de barras para validar"
  valid-label="Boleto válido"
  invalid-label="Boleto inválido"
  generate-label="Gerar boleto de exemplo"
  :validate="handleValidate"
  :generate="handleGenerate"
/>

## Exemplos (API)

```js
import { Boleto } from 'validation-br/boleto';

// Criar a partir da linha digitável (com ou sem máscara)
const boleto = new Boleto('34198.53241 94297.019419 40804.574073 7 16770000123456');
boleto.toString(); // -> linha digitável, sempre 47 dígitos

// Ou a partir do código de barras
Boleto.fromBarcode('34197167700001234568532494297019414080457407');

// Sempre devolve o formato pedido, independente do usado no construtor
boleto.toBarcode(); // -> 44 dígitos
boleto.toString();  // -> 47 dígitos
boleto.mask();       // -> '34198.53241 94297.019419 40804.574073 7 16770000123456'

// Campos decompostos, comuns a todos os boletos
boleto.bank;       // -> '341'
boleto.amount;      // -> 1234.56 (em reais)
boleto.expiresAt;   // -> Date, ou null se não houver vencimento definido
boleto.freeField;   // -> campo livre (25 dígitos), não decomposto por este validador

// Gerar um boleto de exemplo (aceita opções: bank, amount, expiresAt)
Boleto.fake({ bank: '341', amount: 1234.56, expiresAt: new Date('2026-12-31') });

// Calcular o DV geral a partir dos 43 dígitos do código de barras SEM o DV
Boleto.checksum('3419167700001234568532494297019414080457407'); // -> '7'
```

## Como o cálculo é feito

O código de barras tem 44 dígitos: `banco(3) + moeda(1) + DV geral(1) +
fator de vencimento(4) + valor(10) + campo livre(25)`. A linha
digitável (47 dígitos) reorganiza esses mesmos dados em 5 campos, 3
deles com um dígito verificador próprio — ao todo, um boleto tem **4
dígitos verificadores**: 3 de campo (Módulo 10) usados internamente
pelo validador para checar a linha digitável, e o **DV geral** (Módulo
11), o único exposto publicamente via `Boleto.checksum()`.

O DV de cada campo soma o produto dos seus dígitos por pesos
alternados 2 e 1 (da direita pra esquerda), somando os dois algarismos
do resultado quando o produto passa de 9 — o DV é `10 - resto` da
divisão por 10 (se o resto for 0, o DV é 0). Já o DV geral soma o
produto dos 43 dígitos do código de barras (sem o próprio DV) por
pesos cíclicos de 2 a 9, e o resultado é `11 - resto`, com uma exceção:
se o resto for 0 ou 1, o DV é sempre **1** (cada validador desta lista
tem seu próprio valor de exceção — no PIS/PASEP, por exemplo, a
exceção cai para 0).

O diagrama abaixo mostra onde cada um dos 4 dígitos verificadores fica
na linha digitável (azul para os de campo, vermelho para o geral) e o
cálculo de cada um deles.

<img src="/diagrams/boleto-linha-digitavel-check-digits.svg" alt="Onde ficam e como são calculados os 4 dígitos verificadores do Boleto" />

<Callout type="info">
  O fator de vencimento (4 dígitos) conta os dias corridos desde
  07/10/1997 — e essa contagem deu uma volta completa em 22/02/2025,
  quando a Febraban reiniciou o contador. Por isso o validador usa um
  corte em <strong>6000</strong>: um fator abaixo disso é da era nova
  (válida até 2038), um fator igual ou acima é da era antiga (válida
  até 21/02/2025).
</Callout>

<script setup lang="ts">
import { Boleto } from 'validation-br-v2/boleto'

function handleValidate(value: string) {
  try {
    new Boleto(value)
    return true
  } catch {
    return false
  }
}

function handleGenerate(withMask: boolean) {
  const fake = Boleto.fake()
  return withMask ? fake.mask() : fake.toString()
}
</script>
