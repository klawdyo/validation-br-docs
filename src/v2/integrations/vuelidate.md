---
outline: deep
---

# Integração com Vuelidate

O [Vuelidate](https://vuelidate-next.netlify.app/) é usado para validação de estado em aplicações Vue.js. Uma das funções `isX` do `validation-br` pode ser usada diretamente como um `$validator` customizado.

## Exemplo (API)

```js
import { isCPF } from 'validation-br';
import { helpers } from '@vuelidate/validators';

const cpfValido = helpers.withMessage('CPF inválido', isCPF);

const rules = {
  cpf: { cpfValido },
};
```

> Bibliotecas de validação de terceiros só precisam de um predicado booleano — por
> isso o exemplo usa `isCPF` em vez de `new CPF()`. A API de classes é útil quando
> você quer o valor normalizado ou uma exceção detalhada, mas para plugar em outra
> lib de validação `isX` já é a integração completa, e funciona igual na 1.x e na 2.0.
