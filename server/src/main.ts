import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import * as cors from 'cors';

async function startup() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: false,
  });

  app.use(
    cors({
      credentials: true,
      origin: true,
    }),
  );

  const config = app.get(ConfigService);
  const port = config.get<number>('SERVER_PORT');
  app.useStaticAssets(join(__dirname, '..', 'build', 'static'));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api');
  await app.listen(port);
}

void startup();
