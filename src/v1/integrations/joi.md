# joi
## Criar validação personalizada

```js
import { validateOrFail } from "validation-br/dist/cpf";

const isCPF = (value: string | number, helper: any) => {
  try {
    validateOrFail(value);
    return value;
  } catch (error: any) {
    return helper.message(error.message);
  }
};

```

## Como usar

```js
const Joi = require('@hapi/joi');

Joi.object({
  cpf: Joi.string().custom(isCPF) // <- Função personalizada
}).validate({
  cpf: '01234567890'
});

```

## Saiba mais

- https://github.com/hapijs/joi
- https://www.npmjs.com/package/joi


