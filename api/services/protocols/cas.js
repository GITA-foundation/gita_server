

/**
 * Central Authentication Service (CAS) Authentication Protocol
 *
 * CAS is a single sign-on protocol meant to give a user access to
 * more than one application by only submitting their credentials once.
 *
 * @param {Object}   req
 * @param {string}   identifier
 * @param {Function} next
 */

(function() {
  module.exports = function(req, identifier, next) {
    var query;
    query = {
      identifier: identifier,
      protocol: 'cas'
    };
    passport.connect(req, query, {
      username: identifier
    }, next);
  };

}).call(this);
