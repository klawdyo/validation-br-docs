---
outline: deep
---

# NUP17

Descrição: Validador para NUP17 (Número Unificado de Protocolo, 17 caracteres).

## Como o cálculo é feito

```text
NUP17 tem 17 dígitos: 15 + 2 DV.

O cálculo usa multiplicadores decrescentes (16..2 para o primeiro DV) aplicados ao número invertido; aplica-se regra MOD11 com exceções (se resto 11 => DV 1, se resto 10 => DV 0).

Etapas: inverter número, somar produtos com multiplicadores crescentes a partir de 2, converter soma em DV com regras específicas e repetir para o segundo DV.

Fonte: portaria interministerial.
```

## Exemplos (API)

```js
const nup = new NUP17('23037001462202165')
console.log('NUP17.toString()', nup.toString())

// Gerar fake
const fake = NUP17.fake()
console.log('NUP17.fake()', fake.toString())

// Calcular checksum a partir dos 15 primeiros dígitos
const dv = NUP17.checksum('230370014622021')
console.log('NUP17.checksum("230370014622021")', dv)
```
