---
outline: deep
title: Validar CPF e CNPJ alfanumérico com class-validator
description: Veja como validar CPF e CNPJ alfanumérico com class-validator em DTOs TypeScript do NestJS, usando decorators baseados em isCPF e isCNPJ.
---

# Integração com Class Validator

Valide CPF e CNPJ alfanumérico com class-validator em TypeScript.

Use `isCPF` e `isCNPJ` da validation-br para criar decorators customizados do [class-validator](https://github.com/typestack/class-validator), usado em NestJS, TypeORM e diversos outros frameworks baseados em decorators. Veja como implementar essa validação em classes de DTO de uma API TypeScript e Node.js: a mesma estrutura de decorator serve tanto para CPF quanto para CNPJ — incluindo o formato alfanumérico —, com a mesma sintaxe usada nos demais campos.

## Como validar CPF e CNPJ alfanumérico com class-validator

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

O mesmo decorator pode ser criado para CNPJ. `isCnpj` já valida CNPJ alfanumérico (novo formato, a partir de 2026) além do formato numérico, então nenhuma lógica extra é necessária:

```ts
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isCNPJ } from 'validation-br';

@ValidatorConstraint({ async: false })
export class IsCnpjConstraint implements ValidatorConstraintInterface {
  validate(cnpj: any) {
    return isCNPJ(cnpj);
  }
  defaultMessage() {
    return 'CNPJ inválido';
  }
}

export function IsCnpj(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCnpjConstraint,
    });
  };
}
```

> Bibliotecas de validação de terceiros só precisam de um predicado booleano — por
> isso o exemplo usa `isCPF` em vez de `new CPF()`. A API de classes é útil quando
> você quer o valor normalizado ou uma exceção detalhada, mas para plugar em outra
> lib de validação `isX` já é a integração completa, e funciona igual na 1.x e na 2.0.
