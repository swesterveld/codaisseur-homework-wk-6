import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validator,
} from "class-validator";

import {Colors} from "./entity";

@ValidatorConstraint({ name: 'validColor', async: true })
export class ValidColorValidator implements ValidatorConstraintInterface {

  validate(color: string) {
    const validator = new Validator()
    return validator.isEnum(color, Colors)
  }
}