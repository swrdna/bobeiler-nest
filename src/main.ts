import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/app.module';
import { BaseExceptionFilter } from '@/common/filters/base-exception.filter';
import { HTTPResponseInterceptor } from '@/common/interceptors/http-response.interceptor';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new HTTPResponseInterceptor());
  app.useGlobalFilters(new BaseExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.APP_PORT ?? 3000);
};

bootstrap();
