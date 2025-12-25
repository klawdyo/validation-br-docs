---
outline: deep
---

# Processo Judicial

Descrição: Validador para números de processo judicial unificados (formato CNJ, 20 dígitos).

## Como o cálculo é feito

```text
O número tem 20 dígitos: NNNNNNN-DD.AAAA.J.TR.OOOO (sequencial 7, DV 2, ano 4, órgão 1, tribunal 2, origem 4).

O cálculo do DV usa o algoritmo Módulo 97 de Base 10 (ISO 7064):
- Remova o DV (ou substitua por '00' no final) e aplique uma fatoração por partes para evitar inteiros grandes.
- Aplicar %97 nas partes concatenadas conforme especificado e por fim dv = 98 - (resultado % 97).

Exemplo resumido no código-fonte: calcular part1 = primeiros 7 % 97, concatenar com ano/j/tr e %97, concatenar com origem + '00' e %97, então dv = 98 - resultado.

Fonte: documentação CNJ e referência ISO.
```

## Exemplos (API)

```js
// Construir, validar e acessar partes
const p = new JudicialProcess('0002080-25.2012.5.15.0049')
console.log('processNumber', p.processNumber) // primeiros 7
console.log('checksum', p.checksum)      // dv
console.log('year', p.year)
console.log('court', p.court)
console.log('subCourt', p.subCourt)
console.log('origin', p.origin)

// Gerar fake com opções
const fake = JudicialProcess.fake({ court: '5', subCourt: '15', year: '2012', origin: '0049' })
console.log('JudicialProcess.fake()', fake.toString())

// Calcular checksum para os 18 caracteres sem DV
const checksum = JudicialProcess.checksum('000208020125150049')
console.log('JudicialProcess.checksum()', checksum)
```
