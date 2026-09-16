---
outline: deep
title: Integração com class-validator — CPF/CNPJ (NestJS)
description: Valide CPF, CNPJ e outros documentos brasileiros com class-validator em decorators TypeScript, como usado em NestJS e TypeORM.
---

# Integração com Class Validator

O [class-validator](https://github.com/typestack/class-validator) é usado em NestJS, TypeORM e diversos outros frameworks baseados em decorators. Ele permite criar decorators customizados que reaproveitam uma das funções `isX` do `validation-br`. Isso permite validar CPF, CNPJ e outros documentos brasileiros diretamente nas classes de DTO de uma API TypeScript, com a mesma sintaxe de decorators usada nos demais campos.

## Exemplo (API)

```ts
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isCPF } from 'validation-br';

@ValidatorConstraint({ async: false })
export class IsCpfConstraint implements ValidatorConstraintInterface {
  validate(cpf: any) {
    return isCPF(cpf);
  }
  defaultMessage() {
    return 'CPF inválido';
  }
}

export function IsCpf(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCpfConstraint,
    });
  };
}
```

> Bibliotecas de validação de terceiros só precisam de um predicado booleano — por
> isso o exemplo usa `isCPF` em vez de `new CPF()`. A API de classes é útil quando
> você quer o valor normalizado ou uma exceção detalhada, mas para plugar em outra
> lib de validação `isX` já é a integração completa, e funciona igual na 1.x e na 2.0.
