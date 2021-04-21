import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { extname } from 'path';
const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID||"",
  secretAccessKey: process.env.SECRET_ACCESS_KEY||"",
});
@Injectable()
export class AwsService {
  async fileUpload(file: any, folderName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const name = file.originalname.split('.')[0];
      const fileExtName = extname(file.originalname);
      const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      const params: AWS.S3.Types.PutObjectRequest = {
        Bucket: 'music-land',
        Key: `${folderName}/${name}-${randomName}${fileExtName}`,
        Body: file.buffer,
        ACL: 'public-read',
      };
      s3.upload(params, (err, data: AWS.S3.ManagedUpload.SendData) => {
        if (err) {
          return reject(err);
        }
        resolve(`${process.env.cdnUrl}/${data.Key}`);
      });
    });
  }

  async fileDelete(filename: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const params: AWS.S3.DeleteObjectRequest = {
        Bucket: 'music-land',
        Key: filename.substring(46),
      };
      s3.deleteObject(params, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }
}
