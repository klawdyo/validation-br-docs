---
outline: deep
---

# RENAVAM

Descrição: Validador para números RENAVAM de veículos (11 dígitos).

## Como o cálculo é feito

```text
RENAVAM possui 11 caracteres; os 10 primeiros são a numeração e o 11º é DV.

O somatório dos produtos pelos fatores [3,2,9,8,7,6,5,4,3,2] é multiplicado por 10 e então aplicado MOD11; se o resto for >=10, DV = 0.
```

## Exemplos (API)

```js
const r = new Renavam('26827649960')
console.log('Renavam.mask()', r.mask())

// Gerar fake
const fake = Renavam.fake()
console.log('Renavam.fake()', fake.toString())

// Calcular checksum (10 primeiros dígitos)
const dv = Renavam.checksum('2682764996')
console.log('Renavam.checksum("2682764996")', dv)
```
