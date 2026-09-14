---
outline: deep
---

# CNPJ

O CNPJ identifica uma empresa (ou outra entidade jurídica) perante a Receita Federal — é o CPF das pessoas jurídicas, exigido pra abrir conta bancária, emitir nota fiscal e formalizar qualquer contrato empresarial.

<Callout type="new">
  <strong>validation-br suporta CNPJ alfanumérico.</strong> A partir da
  Nota Técnica conjunta COCAD/SUARA/RFB nº 49/2024, os 12 primeiros
  caracteres do CNPJ podem ser letras ou números — com entrada em
  vigor em 2026. O <code>validation-br</code> já valida, mascara e
  gera exemplos dos dois formatos.
</Callout>

<DocPlayground
  placeholder="Digite um CNPJ para validar"
  valid-label="CNPJ válido"
  invalid-label="CNPJ inválido"
  generate-label="Gerar CNPJ de exemplo"
  secondary-option-label="Alfanumérico"
  :validate="handleValidate"
  :generate="handleGenerate"
/>

## Exemplos (API)

```js
import { CNPJ } from 'validation-br/cnpj';

// Criar e validar (lança se inválido)
const cnpj = new CNPJ('55.585.709/0001-98');
cnpj.value;       // -> '55585709000198'
cnpj.toString();  // -> '55585709000198'
cnpj.mask();      // -> '55.585.709/0001-98'

// Gerar um CNPJ de exemplo válido (numérico ou alfanumérico)
const exemplo = CNPJ.fake();
exemplo.toString();
CNPJ.fake({ alphanumeric: true }).mask(); // -> 'WX.BC2.1FX/0001-00'

// Calcular checksum a partir dos 12 primeiros caracteres
CNPJ.checksum('555857090001'); // -> '98'
```

## Como o cálculo é feito

O CNPJ tem 14 caracteres: os 12 primeiros identificam a empresa e a
filial, e os 2 últimos são dígitos verificadores calculados a partir
dos anteriores. Existem **dois formatos** de base — o cálculo do DV é
o mesmo nos dois, a única diferença é um passo extra de conversão pras
letras.

<div class="cnpj-tabs">
  <div class="cnpj-tabs-nav">
    <button
      class="cnpj-tab-btn"
      :class="{ active: calcTab === 'numeric' }"
      @click="calcTab = 'numeric'"
    >
      CNPJ numérico
    </button>
    <button
      class="cnpj-tab-btn"
      :class="{ active: calcTab === 'alphanumeric' }"
      @click="calcTab = 'alphanumeric'"
    >
      CNPJ alfanumérico
    </button>
  </div>

  <div v-show="calcTab === 'numeric'" class="cnpj-tab-panel">

Os 12 primeiros caracteres são só dígitos. Cada um é multiplicado pelo
seu peso, os produtos são somados, e o resto da divisão por 11 dá o
dígito verificador (`11 - resto`; se der 10, o DV é `0`).

<img src="/diagrams/cnpj-check-digits.svg" alt="Cálculo passo a passo dos dígitos verificadores do CNPJ numérico" />

  </div>

  <div v-show="calcTab === 'alphanumeric'" class="cnpj-tab-panel">

Quando o CNPJ tem letras, cada caractere passa por uma conversão antes
de entrar na soma: um dígito já é seu próprio valor, e uma letra vira o
código ASCII maiúsculo menos 48 (`A` → 65 - 48 = `17`, `B` → `18`, e
assim por diante). Depois dessa conversão, o cálculo é **idêntico** ao
do CNPJ numérico — mesmos pesos, mesma divisão por 11.

<img src="/diagrams/cnpj-alphanumeric-check-digits.svg" alt="Cálculo passo a passo dos dígitos verificadores do CNPJ alfanumérico" />

  </div>
</div>

## Referências

- [Nota Técnica conjunta COCAD/SUARA/RFB nº 49/2024](https://github.com/user-attachments/files/15851229/Nota.COCAD.SUARA.2024.05.49.CNPJ.Alfanumerico-1.pdf) — institui o CNPJ alfanumérico
- [Cálculo do dígito verificador do CNPJ — macoratti.net](http://www.macoratti.net/alg_cnpj.htm)

<script setup lang="ts">
import { ref } from 'vue'
import { CNPJ } from 'validation-br-v2/cnpj'

const calcTab = ref<'numeric' | 'alphanumeric'>('numeric')

function handleValidate(value: string) {
  try {
    new CNPJ(value)
    return true
  } catch {
    return false
  }
}

function handleGenerate(withMask: boolean, alphanumeric: boolean) {
  const fake = CNPJ.fake({ alphanumeric })
  return withMask ? fake.mask() : fake.toString()
}
</script>

<style scoped>
.cnpj-tabs {
  margin-top: 16px;
}

.cnpj-tabs-nav {
  display: flex;
  gap: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 20px;
}

.cnpj-tab-btn {
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--vp-c-text-2);
  border-bottom: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s;
}

.cnpj-tab-btn:hover {
  color: var(--vp-c-text-1);
}

.cnpj-tab-btn.active {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}
</style>
