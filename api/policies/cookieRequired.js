/**
cookieRequired

@module      :: Policy
@description :: Simple policy to allow any authenticated user
@docs        :: http://sailsjs.org/#!documentation/policies
 */

(function() {
  module.exports = function(req, res, next) {
    var cookie;
    cookie = req.cookies;
    if (!cookie.version || cookie.version < sails.config.cookieVersion) {
      res.clearCookie('picklete_cart');
      res.cookie('version', sails.config.cookieVersion);
    }
    return next();
  };

}).call(this);
