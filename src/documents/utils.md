---
outline: deep
---

# Utils

Descrição: Funções utilitárias usadas pelos validadores. Contém helpers como `sumToDV`, `checkRepeatedSequence`, `sumElementsByMultipliers`, `clearValue`, `insertAtPosition` e `removeFromPosition`.

## Funções principais

- `sumToDV(sum)` — aplica regra MOD11 para retorno do dígito
- `checkRepeatedSequence(value)` — detecta sequência de dígitos iguais
- `sumElementsByMultipliers(value, multipliers)` — soma produtos entre dígitos e multiplicadores
- `clearValue(value, length, options)` — limpa caracteres não numéricos e aplica regras de tamanho
- `insertAtPosition(value, insertValue, position)` — insere string em posição
- `removeFromPosition(value, startPosition, endPosition)` — remove substring

## Exemplos (API)

```js
import { sumToDV, clearValue, sumElementsByMultipliers } from 'validation-br/lib/src/utils'

// calcular DV a partir de uma soma
const dv = sumToDV(162)
console.log('sumToDV(162)', dv)

// limpar valor e garantir tamanho
const cleaned = clearValue('012.345.678-90', 11)
console.log('clearValue("012.345.678-90", 11)', cleaned)

// somar elementos por multiplicadores
const sum = sumElementsByMultipliers('280012389', [10,9,8,7,6,5,4,3,2])
console.log('sumElementsByMultipliers("280012389", [10,9,8,7,6,5,4,3,2])', sum)
```
