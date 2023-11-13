import { HttpStatus } from '@nestjs/common';
import { ValidationError } from 'joi';
import { AbstractRequestError } from './../components/errors/abstract-request.error';

export class ErrorValidationHandler extends AbstractRequestError {
  constructor(readonly error: ValidationError) {
    super(
      error.details.map((detail) => ({
        statusCode: HttpStatus.BAD_REQUEST,
        title: 'Invalid Request',
        detail: detail.message,
      })),
      HttpStatus.BAD_REQUEST,
    );
  }
}
