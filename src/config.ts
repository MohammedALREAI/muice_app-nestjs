import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const db: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.HOST_DB,
  database: process.env.DATABASE_NAME,
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  port: 5432,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
}
type awsType = {
  AWS_S3_BUCKET_NAME: string
  ACCESS_KEY_ID: string
  SECRET_ACCESS_KEY: string
  cdnUrl: string
}
const aws: awsType = {
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
  ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
  SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
  cdnUrl: process.env.cdnUrl,
}


type ConfigOptions = {
  cloud_name: string,
  api_key: string,
  api_secret: string

}
const cloudCon: ConfigOptions = {
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret


}




const AuthJwt = {
  secretKey: process.env.secretKey,
  strategies: ['jwt'],
  expiresIn: process.env.expiresIn
};


const nodeMailerOptions = {
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
}



const frontEndKeys = {
  url: 'localhost',
  port: 4200,
  endpoints: ['auth/reset-password', 'auth/verify-email'],
}


const vapidKeys = {
  publicKey: 'publicKey',
  privateKey: 'privateKey'
}

const oAuthGoogle = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  CALL_BACK_URI: process.env.CALL_BACK_URI,
  SCOPE: ['email', 'profile'],
}
const oAuthFacebook = {
  FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
  FACEBOOK_SECRET_ID: process.env.FACEBOOK_SECRET_ID,
  CALL_BACK_URI: process.env.CALL_BACK_URI,
  SCOPE: ['email'],
}

export const config = {
  db,
  aws,
  cloudCon,
  nodeMailerOptions,
  frontEndKeys,
  vapidKeys,
  oAuthGoogle,
  AuthJwt,
  oAuthFacebook

};
