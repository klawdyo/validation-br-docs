---
outline: deep
---

# Processo Judicial

É o número que identifica um processo em qualquer tribunal do país desde 2010 — antes disso, cada tribunal tinha sua própria numeração, o que dificultava acompanhar um processo entre instâncias diferentes.

<DocPlayground
  placeholder="Digite um número de processo para validar"
  valid-label="Processo válido"
  invalid-label="Processo inválido"
  generate-label="Gerar processo de exemplo"
  :validate="handleValidate"
  :generate="handleGenerate"
/>

## Como o cálculo é feito

O número tem 20 dígitos: `NNNNNNN-DD.AAAA.J.TR.OOOO` (sequencial 7,
DV 2, ano 4, órgão 1, tribunal 2, origem 4). Diferente do CPF ou do
CNPJ, o DV **não** é uma soma ponderada dígito a dígito — o algoritmo é
o Módulo 97 de Base 10 (ISO 7064), o mesmo usado em IBAN. Como o número
tem dígitos demais para o inteiro do JavaScript calcular de uma vez só,
o cálculo é fatorado em 3 etapas: primeiro o sequencial sozinho, depois
o resultado concatenado com ano/órgão/tribunal, e por fim concatenado
com a origem — cada etapa aplicando `% 97` de novo antes de seguir para
a próxima. No final, o dígito verificador é `98` menos o resto da
última etapa.

<img src="/diagrams/judicial-process-check-digits.svg" alt="Cálculo passo a passo do dígito verificador do Processo Judicial (Módulo 97)" />

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

<script setup lang="ts">
import { JudicialProcess } from 'validation-br-v2/judicial-process'

function handleValidate(value: string) {
  try {
    new JudicialProcess(value)
    return true
  } catch {
    return false
  }
}

function handleGenerate(withMask: boolean) {
  const fake = JudicialProcess.fake()
  return withMask ? fake.mask() : fake.toString()
}
</script>
