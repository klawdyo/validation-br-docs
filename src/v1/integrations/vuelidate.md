# vuelidate
## Criar validação personalizada

```js
// Importação
import { validate as isCPF } from 'validation-br/dist/cpf'

const fnCpf = helpers.withMessage('CPF inválido', isCPF)

// ou

const fnCpf = { $validator: isCPF, $message: 'CPF inválido' }

```

## Como usar

```js

// Definição das regras do vuelidate
import { required, minLength } from '@vuelidate/validators'

const rules = {
  cpf: { fnCpf },
}
```

## Saiba mais

- [Vuelidate](https://vuelidate-next.netlify.app/)