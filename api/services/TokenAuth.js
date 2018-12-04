var jwt = require('jsonwebtoken');

module.exports.issueToken = function(payload, options) {
  sails.log.verbose('=== api.service.TokenAuth.issueToken ===');
  if(!options){
    options = {};
    options.expiresIn = '100d';
  }
  try {
    var token = jwt.sign(payload, sails.config.jwt.token_secret, options);
    return token;
  } catch (e) {
    sails.log.verbose('error infromation', e);
    throw e;
  }
};

module.exports.verifyToken = async function(token, callback) {
  sails.log.verbose('=== api.service.TokenAuth.verifyToken ===');
  try {
    let promise = new Promise((resolve, reject) => {
      jwt.verify(token, sails.config.jwt.token_secret, {}, async function(err, decodedToken) {
        if (err) {
          if (callback)
            callback(err);
          return reject('invalidToken');
        }

        sails.log.verbose('decodedToken: ', decodedToken);
        if (callback)
          callback(null, decodedToken);
        return resolve(decodedToken);
      });
    });
    return promise;
  } catch (e) {
    throw e;
  }
};
