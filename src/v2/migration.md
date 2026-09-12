# Migrando da 1.x para a 2.0

A versão 2.0 reescreve a API de cada submódulo: em vez de funções soltas
(`validate`, `dv`, `fake`, `mask`, `normalize`), cada documento agora é uma
**classe imutável** que já valida o valor no construtor. Ao instanciar, o
valor informado já é convertido para o formato interno normalizado e fica
disponível em `.value` a partir daí — a instância funciona como um *value
object*: pode ser guardada, passada adiante ou usada em qualquer lugar,
sempre representando o mesmo documento.

As funções `isX` importadas diretamente de `validation-br` (ex.: `isCPF`,
`isCNPJ`) continuam funcionando exatamente como antes — a mudança afeta só
quem importava os submódulos (`validation-br/cpf`, `validation-br/cnpj`
etc).

| 1.x (submódulo) | 2.0 (submódulo) | O que muda |
| --- | --- | --- |
| `validate('01234567890')` → `true`/`false` | `new CPF('01234567890')` → lança `ValidationBRError` se inválido | Não retorna mais `false`; use `try/catch` ou a função `isCPF` se só quiser um booleano |
| `dv('906.259.666')` → `'51'` | `CPF.checksum('906259666')` → `'51'` | `dv()` foi removido, veja "`checksum()`" abaixo |
| `fake()` → `'90625966651'` / `fake(true)` → `'906.259.666-51'` | `CPF.fake()` → **instância** de `CPF` | Veja "`fake()`" abaixo |
| `mask('90625966651')` → `'906.259.666-51'` | `new CPF('90625966651').mask()` | Veja "`mask()`" abaixo |
| `normalize('906.259.666-51')` → `'90625966651'` | `new CPF('906.259.666-51').value` (ou `.toString()`) | Veja "`normalize()`" abaixo |
| `import { CPF } from 'validation-br/dist/cpf'` | `import { CPF } from 'validation-br/cpf'` | O caminho perdeu o prefixo `dist/` |

## A classe é imutável (value object)

O valor passado no construtor é validado e convertido para o formato
interno normalizado nesse momento — e não muda mais depois disso.

```js
const cpf = new CPF('906.259.666-51')
cpf.value // -> '90625966651', sempre o mesmo valor para essa instância
```

## `checksum()` não faz mais suposições sobre o formato

Em 1.x, `dv()` tentava adivinhar o formato do valor recebido: aceitava
número ou string, com ou sem máscara, e limpava tudo o que não fosse
dígito antes de calcular. Em 2.0, `checksum()` espera receber exatamente
os dígitos esperados — sem máscara, sem conversão implícita.

```js
// 1.x
dv(906259666)          // -> '51'
dv('906.259.666')      // -> '51'

// 2.0
CPF.checksum('906259666')   // -> '51'
CPF.checksum('906.259.666') // -> lança exceção, limpe antes de chamar
```

## `fake()` agora retorna uma instância

```js
const cpf = CPF.fake()
cpf.value  // -> somente o número, ex.: '90625966651'
cpf.mask() // -> com máscara, ex.: '906.259.666-51'
```

## `mask()` agora é método de instância

```js
new CPF('90625966651').mask() // -> '906.259.666-51'
```

## `normalize()` não existe mais

```js
new CPF('906.259.666-51').value // -> '90625966651'
```

Quer continuar na 1.x por enquanto? A documentação da [versão legacy está aqui](/v1/).
