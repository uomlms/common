/**
 * @todo
 * It will moved inside common library with parameters
 *  > path
 */
import { Request } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import crypto from 'crypto';
import { initS3, getBucket } from '../utils/aws-s3';

interface UploadS3ParametersInterface {
  destination: string;
}

export const uploadS3 = (params: UploadS3ParametersInterface) => {
  const s3 = initS3();
  const bucket = getBucket();

  return multer({
    storage: multerS3({
      s3,
      bucket,
      metadata: function (req: Request, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req: Request, file, cb) {
        const id = crypto.randomBytes(16).toString("hex");
        const path = `${params.destination}/${id}-${file.originalname}`;
        cb(null, path);
      }
    })
  })
};