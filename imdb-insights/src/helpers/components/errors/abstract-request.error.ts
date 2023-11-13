import { HttpException, HttpStatus } from '@nestjs/common';
import { RequestErrorType } from './types/request-error.type';

export class AbstractRequestError extends HttpException {
  constructor(readonly errors: RequestErrorType[], statusCode: HttpStatus) {
    super({ errors }, statusCode);
  }
}
