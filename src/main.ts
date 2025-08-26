import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

import dns from 'dns';

dns.setDefaultResultOrder('ipv4first');

async function bootstrap() {
  const port = 5600;
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(port);

  Logger.log(`${process.env.STAGE} running on ${port}`);
}
bootstrap();
