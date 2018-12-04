import path from 'path';
let domain = sails.config.domain || process.env.domain || 'http://localhost:1337';

module.exports = {
  upload: async(req, res) => {
    var object = {
      filename: req.body['filename'] || req.query['filename'] || '',
      width: parseInt(req.body['width'], 10) || req.query['width'] || 0,
      height: parseInt(req.body['height'], 10) || req.query['height'] || 0,
    }
    sails.log.verbose(object);

    let promise = new Promise((resolve, reject) => {
      const options = {
        maxBytes: 100 * 1000 * 1000,// 100 MB
        dirname: path.resolve(process.cwd(), './.tmp/uploads/')
      }
      req.file("uploadfile").upload(options, (err, files) => {
        if (err) return res.ok({ err });
        resolve(files);
      });
    });

    let files = await promise.then();
    sails.log.verbose('files >>>>', files);

    try {

      for (let i in files) {

        if(files[i].type != 'image/gif' && object.width > 0){
          await ImageService.resize({
            src: files[i].fd,
            dst: files[i].fd,
            width: object.width,
            height: object.height
          });
        }
        // upload s3 bucket

        files[i] = await ImageService.uploadS3(req, files[i]);
      }

      object[0] = files[0];
      res.ok(object);
    } catch (e) {
      res.ok([]);
      console.error(e.stack);
    }
  },

};
