# class-validator

## Criar validação personalizada

**Adiciona os decorators ao class-validator.**

Crie um arquivo iscpf.decorator.ts e adicione em seu diretório de validadores, exemplo:
`src/validators/iscpf.decorator.ts` ou em qualquer outro diretório a seu critério.

```js
// src/validators/iscpf.decorator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator'

// Importa o isCPF do validation-br
import { isCPF } from 'validation-br'

@ValidatorConstraint({ async: false })
export class IsCpfConstraint implements ValidatorConstraintInterface {
  validate(cpf: any, args: ValidationArguments) {
    return isCPF(cpf)
  }
  defaultMessage() {
    return 'CPF inválido'
  }
}

// Registra o decorator
export function IsCpf(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCpfConstraint,
    })
  }
}
```

## Como usar

**Forma de uso no DTO**

```ts
import { IsCpf } from '../../validators/iscpf.decorator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsCpf()
  cpf: string
}
```

## Saiba mais

- [NestJS](https://nestjs.com)
- [class-validator](https://github.com/typestack/class-validator)
- [TypeORM](https://typeorm.io/)