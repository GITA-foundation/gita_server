/**
* Authentication Controller
*
* This is merely meant as an example of how your Authentication controller
* should look. It currently includes the minimum amount of functionality for
* the basics of Passport.js to work.
*/

var AuthAPIController = {
  /**
  * Render the login page
  *
  * The login form itself is just a simple HTML form:
  *
  <form role="form" action="/auth/local" method="post">
  <input type="text" name="identifier" placeholder="Username or Email">
  <input type="password" name="password" placeholder="Password">
  <button type="submit">Sign in</button>
  </form>
  *
  * You could optionally add CSRF-protection as outlined in the documentation:
  * http://sailsjs.org/#!documentation/config.csrf
  *
  * A simple example of automatically listing all available providers in a
  * Handlebars template would look like this:
  *
  {{#each providers}}
  <a href="/auth/{{slug}}" role="button">{{name}}</a>
  {{/each}}
  *
  * @param {Object} req
  * @param {Object} res
  */
  login: function(req, res) {
    sails.log.verbose('=== AuthController login ===');

    var strategies = sails.config.passport,
    providers = {};



    // Get a list of available providers for use in your templates.
    Object.keys(strategies).forEach(function(key) {
      if (key === 'local') {
        return;
      }

      providers[key] = {
        name: strategies[key].name,
        slug: key
      };
    });

    // Render the `auth/login.ext` view
    res.view({
      providers: providers,
      errors: req.flash('error')
    });
  },

  /**
  * Create a third-party authentication endpoint
  *
  * @param {Object} req
  * @param {Object} res
  */
  provider: function(req, res) {
    sails.log.verbose('=== AuthController provider ===');
    passport.endpoint(req, res);
  },

  /**
  * Create a authentication callback endpoint
  *
  * This endpoint handles everything related to creating and verifying Pass-
  * ports and users, both locally and from third-aprty providers.
  *
  * Passport exposes a login() function on req (also aliased as logIn()) that
  * can be used to establish a login session. When the login operation
  * completes, user will be assigned to req.user.
  *
  * For more information on logging in users in Passport.js, check out:
  * http://passportjs.org/guide/login/
  *
  * @param {Object} req
  * @param {Object} res
  */
  callback: async(req, res) => {
    sails.log.verbose('=== AuthController callback ===');
    var provider = req.param('provider', 'local');

    function tryAgain(err) {

      // Only certain error messages are returned via req.flash('error', someError)
      // because we shouldn't expose internal authorization errors to the user.
      // We do return a generic error and the original request body.

      var flashError = req.flash('error')[0];
      if (err && !flashError) {
        req.flash('error', 'Error.Passport.Generic');
      } else if (flashError) {
        req.flash('error', flashError);
      }
      req.flash('form', req.body);


      // If an error was thrown, redirect the user to the
      // login, register or disconnect action initiator view.
      // These views should take care of rendering the error messages.
      var action = req.param('action');
      sails.log.verbose('=== AuthController callback tryAgain ===')
      sails.log.verbose('action:', action);
      sails.log.verbose('flashError:', flashError);

      // switch (action) {
      //   case 'disconnect':
      //     // res.redirect('back');
      //     break;
      //   default:
      //     // res.redirect('/login')
      // }
      if (flashError !== undefined) {
        res.status(500);
        return res.json({ error: flashError });
      } else {
        sails.log.verbose('=== successful login ===')

        const user = req.user;

        if (!user) {
          res.status(401);
          return res.json({ error: flashError });
        }

        const token = TokenAuth.issueToken({
          sub: user.id
        });

        res.ok({
          username: user.fullName,
          avatar: user.avatar,
          token: token,
          email: user.email
        });
      }
    }

    sails.log.verbose('=== call passport callback ===')
    await passport.callback(req, res, function(err, user, challenges, statuses) {

      if (err || !user) {
        return tryAgain(challenges);
      }

      req.login(user, async(err) => {
        sails.log.verbose('=== try to login ===');
        if (err) {
          return tryAgain(err);
        }

        sails.log.verbose('=== successful login ===')
        const token = TokenAuth.issueToken({
          sub: user.id
        });

        res.ok({
          username: user.fullName,
          avatar: user.avatar,
          token: token,
          email: user.email
        });

      });
    }); // passport.callback end
  }, // callback end

  /**
  * Disconnect a passport from a user
  *
  * @param {Object} req
  * @param {Object} res
  */
  disconnect: function(req, res) {
    sails.log.verbose('=== AuthController disconnect ===');
    passport.disconnect(req, res);
  },

  logout: function(req, res) {
    req.session.authenticated = false;
    req.logout();
    res.ok();
  }

};

  module.exports = AuthAPIController;
