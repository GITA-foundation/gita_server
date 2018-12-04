import fs from 'fs';
import AWS from 'aws-sdk';

const accessKeyId = sails.config.aws.accessKeyId;
const secretAccessKey = sails.config.aws.secretAccessKey;
const myBucket = sails.config.aws.myBucket;
AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});

module.exports = {
  uploadS3: async (req, uploadInput) => {

    var s3 = new AWS.S3();
    var mkey = ImageService.processS3Path(uploadInput.fd);
    var myBody = fs.readFileSync(uploadInput.fd);

    var params = {
      Bucket: myBucket,
      Key: mkey,
      Body: myBody, // file body
      ContentType: uploadInput.type,
      ACL: 'public-read'
    }
    let putObjectPromise = await s3.upload(params).promise()
    uploadInput.fd = putObjectPromise.Location;
    return uploadInput;

  },
  processS3Path: (originPath) => {
    var path = originPath.split(process.cwd())[1];
    path = path.replace('/.tmp/uploads/', '');
    return path;
  },
};
