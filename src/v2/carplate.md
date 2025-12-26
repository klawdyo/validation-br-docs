---
outline: deep
---


# Placa (CarPlate)

Descrição: Validador para placas de veículos (formato antigo e Mercosul).

## Como o cálculo / validação é feito

```text
Aceita formatos antigos AAA-0000 e formato Mercosul AAA-0A00.
Validação é feita por expressão regular; não existe dígito verificador (o método static checksum lança uma exceção).
```

## Exemplos (API)

```js
// Validar uma placa (lança se inválida)
const plate = new CarPlate('ABC-1D23')
console.log('CarPlate.toString()', plate.toString())
console.log('CarPlate.mask()', plate.mask())

// Gerar uma placa fake
const fake = CarPlate.fake()
console.log('CarPlate.fake()', fake.toString())

// Obs: CarPlate.checksum() não existe (lança), pois placas não usam DV
```
