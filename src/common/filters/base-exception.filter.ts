import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

import { HTTPResponseInterface } from '../interfaces/http-response.interface';

export class BaseExceptionFilter implements ExceptionFilter {
  private logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const status = exception.getStatus();

    const error: HTTPResponseInterface = this.errorMapper(exception);

    // print to http response
    const response = ctx.getResponse();
    response.status(status).json(error);

    // print to console
    this.logger.error(exception);
  }

  private errorMapper(exception: HttpException): HTTPResponseInterface {
    const response: any = exception.getResponse();
    const message = typeof response === 'string' ? response : response.message;

    return {
      status_code: response.statusCode,
      data: null,
      message,
    };
  }
}
