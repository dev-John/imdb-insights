import { RequestDto } from 'src/dtos/request.dto';

export type AbstractRequestType<T> = {
  data: T;
  req: RequestDto;
};
