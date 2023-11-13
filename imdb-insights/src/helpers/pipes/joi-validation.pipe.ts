import { Injectable, PipeTransform } from '@nestjs/common';
import {
  AlternativesSchema,
  ArraySchema,
  NumberSchema,
  ObjectSchema,
} from 'joi';
import { ErrorValidationHandler } from './../error-handlers/error-validation.handler';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(
    private schema:
      | AlternativesSchema
      | ObjectSchema
      | ArraySchema
      | NumberSchema,
  ) {}

  transform(value: any) {
    const { error } = this.schema.validate(value, { abortEarly: false });
    if (error) throw new ErrorValidationHandler(error);

    return value;
  }
}
