import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { NodemailerOptions, NodemailerDrivers } from '@crowdlinker/nestjs-mailer';
const db: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: "postgres",
  password: "postgress",
  database: process.env.DATABASE_DB,
  synchronize: true,
  logging: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
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




export const AuthJwt = {
  secretKey: process.env.secretKey,
  strategies: ['jwt', 'google', 'facebook'],
  expiresIn: process.env.expiresIn
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
} as NodemailerOptions<NodemailerDrivers.SMTP>



const frontEndKeys = {
  url: 'localhost',
  port: 4200,
  endpoints: ['auth/reset-password', 'auth/verify-email'],
}


export const vapidKeys = {
  publicKey:'BHmTKWgGxm9qDw6H324W_WYvCntCLVsh5ZquNHPa7sxiZFw4rOWDK-_vXq48xUbMdjhG0Cn5R-h3GP9kkpVzuQ4',
  privateKey: 'NPmdY-Bxb0sYg3wXByR06ASusSsa8qJIg2n5T1PXPrU'
}
const CALL_BACK_URI = "http://localhost:3000/auth/google/callback"

const api_secret = "tPdPzI6LPvRQPjr7tbiPrlTcpSU"
const GOOGLE_CLIENT_ID = "186055676569-0o90qlq1u4dnhmfupj6f8j6pu2a68l5l.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "mCN6rFuOaGDpkH00mwHvFhV9"

const oAuthGoogle = {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  CALL_BACK_URI,
  SCOPE: ['email', 'profile'],

}
const FACEBOOK_CLIENT_ID = "880132266126578"
const FACEBOOK_SECRET_ID = "b060775fc2e0eb48841b2ca37c389249"

export const oAuthFacebook = {
  FACEBOOK_CLIENT_ID,
  FACEBOOK_SECRET_ID,
  CALL_BACK_URI,
  SCOPE: ['email'],
}


export default () => ({
  db,
  aws,
  cloudCon,
  nodeMailerOptions,
  frontEndKeys,
  vapidKeys,
  oAuthGoogle,
  AuthJwt,
  oAuthFacebook,
  port: Number(process.env.PORT),

});
