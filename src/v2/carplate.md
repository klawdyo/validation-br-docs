---
outline: deep
---

# Placa (CarPlate)

A placa identifica um veículo de forma única perante o DETRAN — o Brasil está em transição do formato antigo (AAA-0000) pro padrão Mercosul (AAA0A00), e o validador aceita os dois.

<DocPlayground
  placeholder="Digite uma placa para validar"
  valid-label="Placa válida"
  invalid-label="Placa inválida"
  generate-label="Gerar placa de exemplo"
  :show-mask-option="false"
  :validate="handleValidate"
  :generate="handleGenerate"
/>

## Exemplos (API)

```js
import { CarPlate } from 'validation-br/carplate';

// Validar uma placa (lança se inválida)
const plate = new CarPlate('ABC-1D23');
plate.toString(); // -> 'ABC1D23'
plate.mask();      // -> 'ABC-1D23'

// Gerar uma placa fake (formato Mercosul)
const fake = CarPlate.fake();
fake.mask();

// CarPlate.checksum() lança exceção — placas não têm dígito verificador
```

## Como a validação é feita

A validação aceita os dois formatos vigentes no Brasil — o antigo
(`AAA-0000`, 3 letras + 4 números) e o Mercosul (`AAA0A00`, 3 letras +
1 número + 1 letra + 2 números) — usando uma expressão regular, sem
nenhum cálculo de dígito verificador.

<script setup lang="ts">
import { CarPlate } from 'validation-br-v2/carplate'

function handleValidate(value: string) {
  try {
    new CarPlate(value)
    return true
  } catch {
    return false
  }
}

function handleGenerate() {
  return CarPlate.fake().mask()
}
</script>
