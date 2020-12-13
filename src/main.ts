import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import * as webPush from 'web-push';

import { join } from 'path';
import { setUpSwagger } from './commons/helpers/setupSwagger';
import { ConfigService } from '@nestjs/config';

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', '/files'))
  app.setGlobalPrefix('api/v1')
  app.enableCors();
  const configService = app.get(ConfigService);
  setUpSwagger(app, SwaggerModule);
  
  webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    configService.get('vapidKeys')[0],
    configService.get('vapidKeys')[1],
  );


  await app.listen(configService.get('PORT'));
};
bootstrap();
