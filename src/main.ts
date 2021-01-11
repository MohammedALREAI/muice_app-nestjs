import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as webPush from 'web-push';

import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { vapidKeys } from './config';
dotenv.config()

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', '/files'))
  app.setGlobalPrefix('api/v1')
  app.enableCors();
  const configService = app.get(ConfigService);
  const options = new DocumentBuilder()
    .setTitle('Music Land API')
    .setDescription('This is the official API of Music Land System')
    .setVersion('1.0')
    .addTag('songs, music, albums, artists, musicians, singers, notifications, chats, gateways, rooms, auth, strategies, jwt')
    .build();


  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey,

  );


  await app.listen(configService.get('PORT'));
};
bootstrap();






