---
outline: deep
---

# PIX Copy/Paste (BETA)

É o texto que aparece quando alguém copia um Pix pra colar em outro app — não é a chave em si, é o código completo (BR Code) que já carrega valor, beneficiário e outras informações do pagamento.

<Callout type="warning" badge="Beta">
  Esta funcionalidade está em <strong>beta</strong> e não é recomendada
  para uso em produção ainda.
</Callout>

<DocPlayground
  placeholder="Cole um payload Pix Copia e Cola para validar"
  valid-label="Payload válido"
  invalid-label="Payload inválido"
  generate-label="Ver exemplo válido"
  :show-mask-option="false"
  :validate="handleValidate"
  :generate="handleGenerate"
/>

## Exemplos (API)

```js
import { PixCopyPaste } from 'validation-br/pix-copy-paste';

const pix = '00020101021226820014br.gov.bcb.pix2560pix.stone.com.br/pix/v2/b411f5c8-e97f-4a18-af0e-fc66491748d7520400005303986540510.005802BR5925DIOGO DA SILVA SANTOS LTD6014RIO DE JANEIRO622905251e3afd7926983f8ffe086cdc16304FF60';

// Criar e validar (lança se inválido)
const copyPaste = new PixCopyPaste(pix);
copyPaste.toString(); // -> string original, sem espaços nas pontas
```

> `PixCopyPaste` não possui `fake()` nem `checksum()` isolado — o CRC16
> ao final da string é validado internamente contra todo o restante do
> payload, então não dá pra gerar um exemplo aleatório sem montar um
> BR Code completo e válido primeiro.

## Como a validação funciona

O payload segue o formato EMV (o mesmo padrão usado em QR Codes de
pagamento) — uma sequência de blocos `ID + tamanho + valor`. O
validador percorre esses blocos e confere duas coisas: que o último
bloco é o CRC16 (código `63`, tamanho `4`) e que o valor desse CRC
bate com o calculado sobre o restante da string.

<script setup lang="ts">
import { PixCopyPaste } from 'validation-br-v2/pix-copy-paste'

const EXAMPLE = '00020101021226820014br.gov.bcb.pix2560pix.stone.com.br/pix/v2/b411f5c8-e97f-4a18-af0e-fc66491748d7520400005303986540510.005802BR5925DIOGO DA SILVA SANTOS LTD6014RIO DE JANEIRO622905251e3afd7926983f8ffe086cdc16304FF60'

function handleValidate(value: string) {
  try {
    new PixCopyPaste(value)
    return true
  } catch {
    return false
  }
}

function handleGenerate() {
  return EXAMPLE
}
</script>
