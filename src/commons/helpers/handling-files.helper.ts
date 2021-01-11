import { extname } from 'path';
import { diskStorage } from 'multer';
import * as Express from 'express';

export const fileFilter = (req: Express.Request, file: any, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('only image file are allowed not matched type'))
  }
  callback(null, true);
};

type EditType = (req: Express.Request, file: any, callback: any) => void
export const editFile = (req: Express.Request, file: any, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Math.random().toString(36).substr(2);

  callback(null, `${name}-${randomName}${fileExtName}`);
};



export const storageName = (name: string) => (
  {
    storage: diskStorage({
      destination: `./file/${name}`,
      filename: editFile
    })
  })


