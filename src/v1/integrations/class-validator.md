---
outline: deep
title: Integração com class-validator (v1) — NestJS
description: Guia da API legada 1.x — valide CPF, CNPJ e outros documentos brasileiros com class-validator em decorators TypeScript, usado em NestJS.
---

# Integração com Class Validator

O [class-validator](https://github.com/typestack/class-validator) é usado em NestJS, TypeORM e diversos outros frameworks baseados em decorators. Ele permite criar decorators customizados que reaproveitam uma das funções `isX` do `validation-br`. Este guia usa a API de funções soltas da versão 1.x; para projetos novos, veja a [integração com class-validator na versão 2.0](/v2/integrations/class-validator).

## Criar validação personalizada

Crie um arquivo `iscpf.decorator.ts` no seu diretório de validadores, por exemplo `src/validators/iscpf.decorator.ts`.

```ts
// src/validators/iscpf.decorator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { isCPF } from 'validation-br';

@ValidatorConstraint({ async: false })
export class IsCpfConstraint implements ValidatorConstraintInterface {
  validate(cpf: any, args: ValidationArguments) {
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

## Como usar

```ts
import { IsCpf } from '../../validators/iscpf.decorator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsCpf()
  cpf: string;
}
```

## Saiba mais

- [NestJS](https://nestjs.com)
- [class-validator](https://github.com/typestack/class-validator)
- [TypeORM](https://typeorm.io/)
