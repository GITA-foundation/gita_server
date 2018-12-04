import express from '../../node_modules/express';
import path from 'path';

module.exports = function customMiddleware (sails) {

  return {
    initialize: function (done) {

      // Otherwise, create a compiler so that we can watch files.
      sails.after('hook:http:loaded', function () {
        const expressApp = sails.hooks.http.app;
        expressApp.use('/uploads', express.static(path.join(process.cwd(), '.tmp/uploads')));
        if (process.env.NODE_ENV !== 'production') {

          expressApp.set('view options', {
            pretty: true,
            cache: true
          });
          expressApp.locals.pretty = true;
        }
      });

      // Continue lifting Sails.
      return done();

    }
  };
}
