---
outline: deep
---

# CNH

Descrição: Validador para números de Carteira Nacional de Habilitação (CNH).

## Como o cálculo é feito

```text
CNH possui 11 caracteres; os 9 primeiros são sequenciais e os 2 últimos são DV.

1) Primeiro DV: soma dos produtos dos 9 primeiros dígitos pelos fatores 2..10; aplicar regra MOD 11 (11 - resto), se resto for 10 então DV1 = 0.

2) Segundo DV: inclui DV1 e soma pelos fatores 3,4,5,6,7,8,9,10,11,2; aplica mesma regra.

Fonte: https://www.devmedia.com.br/forum/validacao-de-cnh/372972
```

## Exemplos (API)

```js
const cnh = new CNH('58316794534')
console.log('CNH.mask()', cnh.mask())

// Gerar uma CNH fake
const fake = CNH.fake()
console.log('CNH.fake()', fake.toString())

// Calcular checksum a partir dos 9 primeiros dígitos
const dv = CNH.checksum('583167945')
console.log('CNH.checksum("583167945")', dv)
```
