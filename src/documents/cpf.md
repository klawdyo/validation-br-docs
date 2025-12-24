outline: deep

# CPF

Descrição: Validador para números de CPF (Cadastro de Pessoas Físicas).

## Como o cálculo é feito

```text
CPF deve possuir 11 dígitos.

- Os caracteres 1 a 8 são números sequenciais definidos pela Receita Federal

- O caractere 9 refere-se à região fiscal emissora do documento
	1 – DF, GO, MS, MT e TO
	2 – AC, AM, AP, PA, RO e RR
	3 – CE, MA e PI
	4 – AL, PB, PE, RN
	5 – BA e SE
	6 – MG
	7 – ES e RJ
	8 – SP
	9 – PR e SC
	0 – RS

- Os caracteres 10 e 11 são dígitos verificadores.

1) Partes do número: número sequencial + região + DV

2) Cálculo do primeiro DV: soma dos produtos dos 9 primeiros dígitos pelos multiplicadores 10..2; o resto da divisão por 11 é subtraído de 11; se resultar 10 o DV é 0.

3) Cálculo do segundo DV: soma dos produtos dos 10 primeiros dígitos (incluindo DV1) pelos multiplicadores 11..2; aplica a mesma regra.

Fonte: http://clubes.obmep.org.br/blog/a-matematica-nos-documentos-cpf/
```

## Exemplos (API)

```js
// Criar e validar (lança se inválido)
const cpf = new CPF('280.012.389-38')
console.log('CPF.toString()', cpf.toString())   // '28001238938'
console.log('CPF.mask()', cpf.mask())           // '280.012.389-38'

// Gerar um CPF fake válido
const fake = CPF.fake()
console.log('CPF.fake()', fake.toString())

// Calcular checksum a partir dos 9 primeiros dígitos
const partial = '280012389'
const dv = CPF.checksum(partial) // '38'
console.log('CPF.checksum("' + partial + '")', dv)
```
