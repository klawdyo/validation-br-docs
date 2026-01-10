# yup
## Criar validação personalizada

Crie um arquivo `validation-br.ts` em seu diretório de bibliotecas auxiliares, exemplo ´/src/lib/validation-br.ts´

```js
// Importe o Yup
import * as yup from 'yup'

// Importe o validateOrFail do submódulo de CPF do validation-br
import { validateOrFail } from 'validation-br/dist/cpf'

// Crie seu método personalizado chamado cpf()
function cpf(message) {
  return this.test('cpf', message, function (value) {
    const { path, createError } = this

    try {
      const valid = validateOrFail(value)
      return true
    } catch (error) {
      // Cria um erro se cair no catch
      return createError({
        path,
        // Exibe a mensagem do catch
        message: message ?? error.message,
      })
    }
  })
}

// Adiciona seu método cpf() ao grupo de strings do yup
yup.addMethod(yup.string, 'cpf', cpf)
```

## Como usar

cpf() já está disponível para uso dentro do Yup

```js
const validationSchema = yup.object().shape({
  cpf: yup.string().required().cpf(),
})
```

## Saiba mais

- [Yup](https://github.com/jquense/yup)