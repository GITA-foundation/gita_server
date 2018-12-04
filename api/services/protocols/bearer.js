/*
 * Bearer Authentication Protocol
 *
 * Bearer Authentication is for authorizing API requests. Once
 * a user is created, a token is also generated for that user
 * in its passport. This token can be used to authenticate
 * API requests.
 *
 */

 // curl -v -H "Authorization: Bearer 123456789" http://127.0.0.1:3000/
 // curl -v http://127.0.0.1:3000/?access_token=123456789
exports.authorize = function(token, done) {
  console.log('=== api.services.protocals.bearer ===')

  db.Passport.findOne({ accessToken: token }, function(err, passport) {
    if (err) { return done(err); }
    if (!passport) { return done(null, false); }

    User.findOneById(passport.user, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'all' });
    });
  });

};
