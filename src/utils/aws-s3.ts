import aws from 'aws-sdk';

export const initS3 = (): aws.S3 => {
  return new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });
}

export const getBucket = (): string => {
  return process.env.AWS_BUCKET || "uomlms";
}

export const getObject = (key: string) => {
  const s3 = initS3();
  const bucket = getBucket();

  const options = {
    Bucket: bucket,
    Key: key
  };

  return new Promise<aws.S3.Types.GetObjectOutput>((resolve, reject) => {
    s3.getObject(options, (err, object) => {
      if (err) {
        reject(err);
      } else {
        resolve(object);
      }
    });
  });
}