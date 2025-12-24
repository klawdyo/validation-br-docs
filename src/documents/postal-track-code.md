---
outline: deep
---

# Código de Rastreamento Postal

Descrição: Validador para códigos de rastreamento postal no formato `JT194690698BR`.

## Como o cálculo é feito

```text
O código tem 13 caracteres: 2 letras (tipo), 8 números (sequência), 1 DV e 2 letras do país.

O DV é calculado multiplicando os 8 dígitos pelos fatores [8,6,4,2,3,5,9,7], somando, aplicando resto %11 e transformando em DV com especificidades: se resto 0 => DV 5; se resto 1 => DV 0; caso contrário DV = 11 - resto.
```

## Exemplos (API)

```js
const p = new PostalTrackCode('JT194690698BR')
console.log('PostalTrackCode.toString()', p.toString())

// Gerar fake
const fake = PostalTrackCode.fake()
console.log('PostalTrackCode.fake()', fake.toString())

// Calcular checksum dos 8 dígitos
const dv = PostalTrackCode.checksum('19469069')
console.log('PostalTrackCode.checksum("19469069")', dv)
```
