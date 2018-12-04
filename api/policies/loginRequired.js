/**
loginRequired

@module      :: Policy
@description :: Simple policy to allow any authenticated user
@docs        :: http://sailsjs.org/#!documentation/policies
 */
module.exports = function(req, res, next) {
  var referer;
  referer = req.path.split('/');
  try {
    if (UserService.getLoginState(req)) {
      let userInfo = UserService.getLoginUser(req);
      sails.log.verbose("=== getLoginUser ===", userInfo.username, userInfo.role);
      if(referer['1'] === 'admin'){
        if (UserService.isAdmin(userInfo.role)) return next();
        return res.redirect('/');
      }else{
        return next();
      }
    }

    if (referer['1'] === 'admin') {
      return res.redirect('/admin/login');
    } else {
      return res.redirect('/');
    }

  } catch (e) {
    sails.log.error(e);
    if (referer['1'] === 'admin') {
      return res.redirect('/admin/login');
    } else {
      return res.redirect('/');
    }
  }
};
