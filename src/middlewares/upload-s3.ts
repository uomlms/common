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

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const bucket = process.env.AWS_BUCKET || "uomlms";

interface UploadS3ParametersInterface {
  destination: string;
}

export const uploadS3 = (params: UploadS3ParametersInterface) => {
  return multer({
    storage: multerS3({
      s3,
      bucket,
      contentType: multerS3.AUTO_CONTENT_TYPE,
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