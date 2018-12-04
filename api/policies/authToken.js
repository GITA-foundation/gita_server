module.exports = async function(req, res, next) {
  var token;

  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
      var scheme = parts[0],
        credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.unauthorized('wrongFormat');
    }
  } else if (req.param('token')) {
    token = req.param('token');
    // We delete the token from param to not mess with blueprints
    delete req.query.token;
  } else {
    return res.unauthorized('noAuthorizationHeaderFound');
  }

  try {
    let decodedToken = await TokenAuth.verifyToken(token);
    let user = await db.User.findByPk(decodedToken.sub);
    if(user){
      req.user = user.dataValues || user;
      return next();
    }else{
      return res.unauthorized('noAuthorizationHeaderFound');
    }
  } catch (e) {
    sails.log.verbose("error :", e);
    return res.unauthorized('invalidToken');
  }
};
