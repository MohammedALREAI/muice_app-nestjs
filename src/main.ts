import { SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as webPush from 'web-push';
import { Logger } from "@nestjs/common";

import { createDocument } from './swagger/swagger';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { Config } from './config';
dotenv.config();

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{logger:new Logger()});
  app.useStaticAssets(join(__dirname, '..', '/files'));
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  SwaggerModule.setup('api', app, createDocument(app));

webPush.setVapidDetails(
    "mailto:mhamad.aa1997.aa@gmail.com",
    Config.vapidKeys.publicKey,
    Config.vapidKeys.privateKey,
    );

    await app.listen(process.env.PORT || 4000, () => {
      Logger.log(`🚀  Server is listening on port ${process.env.PORT}`, "Bootstrap", false);
    });
  };
bootstrap().catch(e => {
  Logger.error(`❌  Error starting server, ${e}`, "", "Bootstrap", false);
  throw e;
});