/**
 * bearerAuth Policy
 *
 * Policy for authorizing API requests. The request is authenticated if the
 * it contains the accessToken in header, body or as a query param.
 * Unlike other strategies bearer doesn't require a session.
 * Add this policy (in config/policies.js) to controller actions which are not
 * accessed through a session. For example: API request from another client
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */

(function() {
  module.exports = function(req, res, next) {
    return passport.authenticate('bearer', {
      // 為了使用 API 確認 User 是否登入，因此改為 true
      session: true
    })(req, res, next);
  };

}).call(this);
