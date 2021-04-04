import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as webPush from 'web-push';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument } from './swagger/swagger';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { vapidKeys } from './config';
dotenv.config();

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', '/files'));
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  const configService = app.get(ConfigService);
  SwaggerModule.setup('api', app, createDocument(app));

  webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey,
  );

  await app.listen(configService.get('PORT'));
};
bootstrap();
