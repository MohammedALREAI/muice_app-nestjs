import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {config} from'dotenv'

import {
  NodemailerOptions,
  NodemailerDrivers,
} from '@crowdlinker/nestjs-mailer';


type ConfigOptions = {
  cloud_name: string;
  api_key: string;
  api_secret: string;
};
config()

const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
const FACEBOOK_SECRET_ID = process.env.FACEBOOK_SECRET_ID;
const Api_secret = process.env.api_secret;
const CALL_BACK_URI =  process.env.CALL_BACK_URI;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET =process.env.GOOGLE_CLIENT_SECRET;

const oAuthFacebook = {
  FACEBOOK_CLIENT_ID,
  FACEBOOK_SECRET_ID,
  CALL_BACK_URI,
  SCOPE: ['email'],
}
type awsType = {
  AWS_S3_BUCKET_NAME: string;
  ACCESS_KEY_ID: string;
  SECRET_ACCESS_KEY: string;
  cdnUrl: string;
};
const oAuthGoogle = {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  CALL_BACK_URI,
  SCOPE: ['email', 'profile'],
};

 const Jwt = {
  secretKey: process.env.secretKey,
  strategies: ['jwt', 'google', 'facebook'],
  expiresIn: process.env.expiresIn,
};


export namespace Config {

export const DB: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  synchronize: true,
  logging: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  ssl: {
    rejectUnauthorized: false,
  },
  migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
  migrationsRun: false,
  maxQueryExecutionTime: 0.1 /** To log request runtime */,
  cli: {
    migrationsDir: __dirname + "/migrations/**/*{.ts,.js}",
  },
};


export const AWS: awsType = {
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
  ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
  SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
  cdnUrl: process.env.cdnUrl,
};




export const nodeMailerOptions = {
  transport: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      username: 'username',
      pass: 'pass',
    },
    tls: {
      rejectUnauthorized: false,
    },
  },
} as NodemailerOptions<NodemailerDrivers.SMTP>;

 export const frontEndKeys = {
  url: 'localhost',
  port: 4200,
  endpoints: ['auth/reset-password', 'auth/verify-email'],
};

export const vapidKeys = {
  webPushEmail:process.env.webPushEmail,
  publicKey:process.env.publicKey,
  privateKey: process.env.privateKey
};




export const Auth={
  oAuthFacebook,
  oAuthGoogle,
  Jwt,
  api_secret: process.env.api_secret
}


}
