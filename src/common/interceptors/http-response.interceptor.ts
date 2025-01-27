import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HTTPResponseInterface } from '../interfaces/http-response.interface';

@Injectable()
export class HTTPResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<HTTPResponseInterface> {
    return next
      .handle()
      .pipe(map((data) => this.responseMapper(context, data)));
  }

  private responseMapper(
    context: ExecutionContext,
    data: any,
  ): HTTPResponseInterface {
    const response = context.switchToHttp().getResponse();

    return {
      status_code: response.statusCode,
      data,
      message: response.statusMessage || 'Success',
    };
  }
}
