import { HttpStatus } from '@nestjs/common';

export type RequestErrorType = {
  statusCode: HttpStatus;
  title: string;
  detail: unknown;
};
