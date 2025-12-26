---
outline: deep
---

# Título de Eleitor

Descrição: Validador para o Título de Eleitor (12 dígitos).

## Como o cálculo é feito

```text
Título de eleitor tem 12 dígitos: 8 sequenciais + 2 dígitos da UF + 2 DV.

1) DV1: soma dos produtos dos 8 primeiros dígitos pelos fatores [2,3,4,5,6,7,8,9]; DV1 = resto % 11 (se resto 10 => DV1 = 0).

2) DV2: soma dos produtos dos dois dígitos da UF e DV1 pelos fatores [7,8,9]; DV2 = resto % 11 (se resto 10 => DV2 = 0).
```

## Exemplos (API)

```js
const t = new TituloEleitor('102385010671')
console.log('TituloEleitor.mask()', t.mask())

// Gerar fake
const fake = TituloEleitor.fake()
console.log('TituloEleitor.fake()', fake.toString())

// Calcular checksum (10 primeiros dígitos)
const dv = TituloEleitor.checksum('1023850106')
console.log('TituloEleitor.checksum("1023850106")', dv)
```
