/**
loginRequired

@module      :: Policy
@description :: Simple policy to allow any authenticated user
@docs        :: http://sailsjs.org/#!documentation/policies
 */


module.exports = async function (req, res, next) {
  try {
    const loginUser = UserService.getLoginUser(req);
    const currentUser = await UserService.findOne(loginUser.id);
    return currentUser.isVerified ? next() : res.unauthorized('noAuthorizationHeaderFound');
  } catch (e) {
    sails.log.verbose("error :", e);
    return res.unauthorized('noAuthorizationHeaderFound');
  }
};
