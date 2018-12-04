import Promise from 'bluebird';
import easyimg from 'easyimage';
let gm = require('gm').subClass({ imageMagick: true });
import path from 'path';
import fse from 'fs-extra';
import fs from 'fs';
import AWS from 'aws-sdk';

const accessKeyId = sails.config.aws.accessKeyId;
const secretAccessKey = sails.config.aws.secretAccessKey;
const myBucket = sails.config.aws.myBucket;
AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});

var domain = sails.config.domain || process.env.domain || 'http://localhost:1337';
let domainS3 = `http://s3.amazonaws.com/`;
let home = process.cwd();
Promise.promisifyAll(gm.prototype);

module.exports = {
  uploadS3: async (req, uploadInput) => {

    var s3 = new AWS.S3();
    console.log(uploadInput);
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
    console.log(putObjectPromise);
    uploadInput.fd = putObjectPromise.Location;
    console.log(uploadInput);
    return uploadInput;

  },
  upload: async (req, uploadInput) => {
    return new Promise((resolve, reject) => {
      async.map(uploadInput, (file, cb) => {
        req.file(file).upload((err, files) => {
          return cb(err, files);
        });
      }, (err, files) => {
        if (err) return reject(err);
        return resolve(files);
      });
    });
  },
  resize: async (imageResizeConfig) => {

    try {
      var dst = path.join(home, `./.tmp/images/resize.jpg`);
      var resizeConfig = {
        src: imageResizeConfig.src,
        dst: imageResizeConfig.dst || dst,
        width: imageResizeConfig.width || 100,
        height: imageResizeConfig.height || 100
      }
      await fse.ensureDirSync(path.join(home, `./.tmp/images`));
      let result = await gm(resizeConfig.src).resize(resizeConfig.width, resizeConfig.height, "!").quality(92).writeAsync(resizeConfig.dst);
      return resizeConfig;

    } catch (e) {
      console.error(e.stack);
      throw e;
    }
  },

  processPath: (originPath) => {
    var path = originPath.split(process.cwd())[1];
    path = path.replace('.tmp/', '');
    return path;
  },

  processS3Path: (originPath) => {
    var path = originPath.split(process.cwd())[1];
    path = path.replace('/.tmp/uploads/', '');
    return path;
  },

  processLoop: async (files, width, height, beArray) => {
    let that = this;
    let buffers = files;

    if ( ! buffers)
      return [];

    if (buffers.length) {
      for (let i in buffers) {
        try {
          if(buffers[i].type != 'image/gif'){
            await ImageService.resize({
              src: buffers[i].fd,
              dst: buffers[i].fd,
              width: width,
              height: height
            });
          }
        } catch (e) {
          console.error(e.stack);
        }
        buffers[i] = domain + ImageService.processPath(buffers[i].fd);
        buffers[i] = buffers[i].replace('.tmp/', '');
      }
      if (beArray)
        return buffers;

      if (buffers.length > 1)
        return buffers;
      else
        return buffers[0];
    }
  }
};
