---
outline: deep
title: Integração com class-validator (v1) — NestJS
description: Guia da API legada 1.x — valide CPF, CNPJ e outros documentos brasileiros com class-validator em decorators TypeScript, usado em NestJS.
---

# Integração com Class Validator

O [class-validator](https://github.com/typestack/class-validator) é usado em NestJS, TypeORM e diversos outros frameworks baseados em decorators. Ele permite criar decorators customizados que reaproveitam uma das funções `isX` do `validation-br`, como `isCPF` ou `isCNPJ` — inclusive para validar o formato alfanumérico de CNPJ. A mesma técnica usada abaixo para CPF vale, sem alterações, para criar um decorator equivalente de CNPJ alfanumérico. Este guia usa a API de funções soltas da versão 1.x; para projetos novos, veja a [integração com class-validator na versão 2.0](/v2/integrations/class-validator).

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

O mesmo padrão serve para CNPJ. Crie um `iscnpj.decorator.ts` análogo:

```ts
// src/validators/iscnpj.decorator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { isCNPJ } from 'validation-br';

@ValidatorConstraint({ async: false })
export class IsCnpjConstraint implements ValidatorConstraintInterface {
  validate(cnpj: any, args: ValidationArguments) {
    // já valida CNPJ alfanumérico (novo formato, a partir de 2026)
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

## Como usar

```ts
import { IsCpf } from '../../validators/iscpf.decorator';
import { IsCnpj } from '../../validators/iscnpj.decorator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsCpf()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  @IsCnpj()
  cnpj: string;
}
```

## Saiba mais

- [NestJS](https://nestjs.com)
- [class-validator](https://github.com/typestack/class-validator)
- [TypeORM](https://typeorm.io/)
