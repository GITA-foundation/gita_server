/**
loginRequired

@module      :: Policy
@description :: Simple policy to allow any authenticated user
@docs        :: http://sailsjs.org/#!documentation/policies
 */
module.exports = function(req, res, next) {
  try {
    var referer = req.path.split('/');
    if (UserService.getLoginState(req)) {
      const userInfo = UserService.getLoginUser(req);
      if (UserService.isAdmin(userInfo.role)) return next();
      return res.redirect('/');
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
