import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import * as webPush from 'web-push';
import { config } from './config';

import { join } from 'path';
import { setUpSwagger } from './utils/setupSwagger';
const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', '/files'))
  app.enableCors();
  setUpSwagger(app, SwaggerModule);
  webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    config.vapidKeys.publicKey,
    config.vapidKeys.privateKey,
  );
  const port: number = Number(process.env.PORT) || 3000;

  await app.listen(port);
};
bootstrap();
