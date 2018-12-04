let domain = sails.config.domain || process.env.domain || 'http://localhost:1337';

module.exports = {
  upload: async(req, res) => {
    let object = {
      filename: req.body['filename'] || req.query['filename'] || '',
    }
    let promise = new Promise((resolve, reject) => {
      const options = {
        maxBytes: 100 * 1000 * 1000,// 100 MB
        dirname: path.resolve(process.cwd(), './.tmp/uploads/')
      };
      req.file("uploadfile").upload(options, async(err, files) => {
        resolve(files);
      });
    });

    let files = await promise.then();
    sails.log.verbose('files >>>>', files);

    try {

      for (let i in files) {
        // upload s3 bucket
        files[i] = await FileService.uploadS3(req, files[i]);
      }

      object[0] = files[0];
      res.ok(object);
    } catch (e) {
      res.ok([]);
      console.error(e.stack);
    }
  },

};
