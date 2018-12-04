/**
loginRequired

@module      :: Policy
@description :: Simple policy to allow any authenticated user
@docs        :: http://sailsjs.org/#!documentation/policies
 */
module.exports = function(req, res, next) {
  try {
    const userInfo = UserService.getLoginUser(req);
    return userInfo.isVerified ? next() : res.unauthorized('noAuthorizationHeaderFound');
  } catch (e) {
    sails.log.verbose("error :", e);
    return res.unauthorized('noAuthorizationHeaderFound');
  }
};
