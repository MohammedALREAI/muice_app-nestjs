import { Config } from './../../config';
import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { extname } from 'path';


@Injectable()
export class AwsService {
  constructor(private s3: AWS.S3) {
    this.s3 = new AWS.S3();
    AWS.config.update({
      accessKeyId: Config.AWS.ACCESS_KEY_ID,
      secretAccessKey: Config.AWS.SECRET_ACCESS_KEY,
    });
  }

  async fileUpload(file: any, folderName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const name = file.originalname.split('.')[0];
      const fileExtName = extname(file.originalname);
      const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      const params: AWS.S3.Types.PutObjectRequest = {
        Bucket: Config.AWS.AWS_S3_BUCKET_NAME,
        Key: `${folderName}/${name}-${randomName}${fileExtName}`,
        Body: file.buffer,
        ACL: 'public-read',
      };
      this.s3.upload(params, (err, data: AWS.S3.ManagedUpload.SendData) => {
        if (err) {
          return reject(err);
        }
        resolve(`${Config.AWS.cdnUrl}/${data.Key}`);
      });
    });
  }

  async fileDelete(filename: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const params: AWS.S3.DeleteObjectRequest = {
        Bucket: 'music-land',
        Key: filename.substring(46),
      };
      this.s3.deleteObject(params, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }
}
