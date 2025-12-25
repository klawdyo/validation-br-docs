---
outline: deep
---

# CNPJ

Descrição: Validador para números de CNPJ. Suporta caracteres alfanuméricos conforme Nota Técnica (entrada em 2026).

## Como o cálculo é feito

```text
CNPJ possui 14 caracteres (12 + 2 DV). Caracteres 1..12 podem conter letras ou números (convertidos via tabela ASCII e subtraídos por 48 para obter número).

1) Primeiro DV: soma dos produtos dos 12 primeiros caracteres pelos fatores [5,4,3,2,9,8,7,6,5,4,3,2]; aplicar MOD11 e 11 - resto; se resultar 10 => DV = 0.

2) Segundo DV: soma dos 13 primeiros (incluindo DV1) pelos fatores [6,5,4,3,2,9,8,7,6,5,4,3,2] e aplicar mesma regra.

Fonte: http://www.macoratti.net/alg_cnpj.htm
```

## Exemplos (API)

```js
const cnpj = new CNPJ('12.345.678/0001-95')
console.log('CNPJ.mask()', cnpj.mask())

// Gerar CNPJ fake (opção alfanumérica)
const fake = CNPJ.fake({ alphanumeric: false })
console.log('CNPJ.fake()', fake.toString())

// Calcular checksum
const dv = CNPJ.checksum('123456780001')
console.log('CNPJ.checksum("123456780001")', dv)
```
