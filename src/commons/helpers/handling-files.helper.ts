import { extname } from 'path';
import { diskStorage } from 'multer';
export const fileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('only image file are allowed not matched type'))
  }
  callback(null, true);
};

export const editFile = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Math.random().toString(36).substr(2);

  callback(null, `${name}-${randomName}${fileExtName}`);
};



export const storageName = (name: string) => {
  return {
    storage: diskStorage({
      destination: `./file/${name}`,
      filename: editFile
    })
  }
}

