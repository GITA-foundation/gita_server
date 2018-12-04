/**
 * Authentication Controller
#
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */
var url = require('url');
var AuthController;

AuthController = {

  admin: (req, res) => {
    return res.redirect(sails.config.admin.redirectLogin);
  },

  login: function(req, res) {
    res.view('admin/login', {
      errors: req.flash('error')
    });
  },
  logout: function(req, res) {
    let reference = url.parse(req.headers.referer);
    let referencePath = reference.path.split('/');

    req.session.authenticated = false;

    req.logout();

    if (referencePath[1] === 'admin') {
      return res.redirect('/admin/login');
    }
    return res.redirect('/');

  },
  provider: function(req, res) {
    try {
      passport.endpoint(req, res);
    } catch (e) {
      console.error(e.stack);
    }
  },
  callback: async function(req, res) {
    var tryAgain;
    tryAgain = function(err) {
      var action, flashError;
      flashError = req.flash('error')[0];
      if (err && !flashError) {
        req.flash('error', 'Error.Passport.Generic');
      } else if (flashError) {
        req.flash('error', flashError);
      }
      req.flash('form', req.body);
      action = req.param('action');
      switch (action) {
        case 'disconnect':
          res.redirect('back');
          break;
        default:
          var reference;
          try {
            reference = url.parse(req.headers.referer);
          } catch (e) {
            reference = { path : "" };
          }
          if (req.xhr)
            return res.ok({
              status: "fail",
              message: "login fail"
            });

          if (reference.path === '/admin/login') {
            res.redirect('/admin/login');
          }else {
            res.redirect('/');
          }

      }
    };
    await passport.callback(req, res, function(err, user, challenges, statuses) {
      if (err || !user) {
        return tryAgain(challenges);
      }

      req.login(user, function(err) {
        if (err) {
          return tryAgain(err);
        }
        req.session.authenticated = true;
        const isRefererFromAdminLogin = /\/admin\/login/.test(req.headers.referer);
        if (isRefererFromAdminLogin && UserService.isAdmin(user.role)) {
          return res.redirect(sails.config.admin.redirectLogin);
        }

        sails.log.verbose('=== user.dataValues ===', user.dataValues);

        if (req.xhr)
          return res.ok({
            status: "ok",
            message: "login success",
            isVerified: user.isVerified,
            email: user.email
          });

        // User was failed that need logout
        AuthController.logout(req, res);

      });
    });
  },
  disconnect: function(req, res) {
    passport.disconnect(req, res);
  },
  forgotPassword: async (req, res )=>{
    try {
      let data = req.query;
      let check = await AuthService.sendForgotMail(data.email);
      let message = '已寄出mail，請至信箱確認';
      return res.ok(message);
    } catch (e) {
      console.error(e.stack);
      let {message} = e;
      let success = false;
      return res.json(500,{message, success});
    }
  }
};

module.exports = AuthController;
