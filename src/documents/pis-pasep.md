---
outline: deep
---

# PIS / PASEP

Descrição: Validador para números PIS/PASEP/NIS/NIT (11 dígitos).

## Como o cálculo é feito

```text
PIS possui 11 caracteres; os 10 primeiros compõem o número e o 11º é DV.

O cálculo do DV consiste em multiplicar os 10 dígitos pelos fatores [3,2,9,8,7,6,5,4,3,2], somar, aplicar MOD11 e subtrair de 11; regras especiais: se o resultado for 0 => DV = 5; se for 1 => DV = 0.

Fonte: http://www.macoratti.net/alg_pis.htm
```

## Exemplos (API)

```js
const pis = new PIS('26827649960')
console.log('PIS.mask()', pis.mask())

// Gerar fake
const fake = PIS.fake()
console.log('PIS.fake()', fake.toString())

// Calcular checksum (10 primeiros dígitos)
const dv = PIS.checksum('2682764996')
console.log('PIS.checksum("2682764996")', dv)
```
