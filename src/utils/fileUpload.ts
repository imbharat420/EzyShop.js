import multer, { FileFilterCallback }  from 'multer';
import { Request } from 'express'
import path from 'path';
import fs from 'fs';

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

let options = {
  limits: 500000,
  inMemory: true,
  destination: function (req:Request, file: Express.Multer.File, cb:(error: Error | null, filename: string) => void) {
    const location = path.join(__dirname, '..', 'uploads');
    fs.mkdirSync(location, { recursive: true });
    cb(null, location);
  },
  filename: function (req:Request, file: Express.Multer.File, cb:(error: Error | null, filename: string) => void) {
    if(!file) return
    cb(null, file.originalname);
  },
}

var config = multer.diskStorage(options);

var fileUpload = multer({ storage: config });

export default fileUpload;
