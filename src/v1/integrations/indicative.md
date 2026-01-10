# indicative
## Criar validação personalizada

[AdonisJS 4](https://legacy.adonisjs.com/docs/4.1/installation) usa [indicative](https://indicative-v5.adonisjs.com/) para realizar suas validações.

Crie um arquivo `validation_br.js` em seu diretório de validações customizadas, exemplo ´/app/Validators/extend/validation_br.js´.

```js
const { isCPF } = require('validation-br')

///app/Validators/extend/validation_br.js
const _cpf = async (payload, fieldName, message, arguments, get) => {
  // Pega o valor do campo
  const cpf = get(payload, fieldName)
  // Pulando caso esteja vazio
  if (!cpf) return

  if (!isCPF(cpf)) {
    throw message
  }
}

const Validator = use('Validator')
Validator.extend('cpf', _cpf)
```

## Como usar

Agora é necessário importar o arquivo na página que avalia as suas regras de validação do seu endpoint.

```js

// Importa o arquivo com as validações customizadas
require('../extend/validation_br')

// Inclui a regra criada para o campo cpf
get rules() {
return {
    cpf: [
      rule('required'),
      rule('cpf'),
    ]
  }
}
```

## Saiba mais

- [Adonis 4](https://legacy.adonisjs.com/docs/4.1/installation)
- [Indicative](https://indicative-v5.adonisjs.com/)