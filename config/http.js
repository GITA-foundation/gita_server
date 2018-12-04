var path = require('path');

module.exports.http = {

  middleware: {
    /***************************************************************************
     *                                                                          *
     * The order in which middleware should be run for HTTP request. (the Sails *
     * router is invoked by the "router" middleware below.)                     *
     *                                                                          *
     ***************************************************************************/
    passportInit: require('passport').initialize(),
    passportSession: require('passport').session(),
    flash: require('connect-flash')(),
    order: [
      // auto create
      // 'startRequestTimer',
      // 'cookieParser',
      'session',
      'passportInit', // <==== passport HTTP middleware should run after "session"
      'passportSession', // <==== (see https://github.com/jaredhanson/passport#middleware)
      'flash',
      // 'myRequestLogger',
      'customBodyParser',
      // #1_to_remove
      // 'handleBodyParserError',

      // 'compress',
      // 'methodOverride',
      // 'poweredBy',
      '$custom',
      'router',
      'www',
      'favicon',
      // '404',
      // '500'
    ],

    /****************************************************************************
     *                                                                           *
     * Example custom middleware; logs each request to the console.              *
     *                                                                           *
     ****************************************************************************/

    // myRequestLogger: function (req, res, next) {
    //     console.log("Requested :: ", req.method, req.url);
    //     return next();
    // }


    /***************************************************************************
     *                                                                          *
     * The body parser that will handle incoming multipart HTTP requests. By    *
     * default as of v0.10, Sails uses                                          *
     * [skipper](http://github.com/balderdashy/skipper). See                    *
     * http://www.senchalabs.org/connect/multipart.html for other options.      *
     *                                                                          *
     ***************************************************************************/
    customBodyParser : (function (){
      var skipper = require('skipper');
      var fn = skipper({parameterLimit: 100 * 1024 * 1024 });
      return fn;
    })(),

  },

  /***************************************************************************
   *                                                                          *
   * The number of seconds to cache flat files on disk being served by        *
   * Express static middleware (by default, these files are in `.tmp/public`) *
   *                                                                          *
   * The HTTP static cache is only active in a 'production' environment,      *
   * since that's the only time Express will cache flat-files.                *
   *                                                                          *
   ***************************************************************************/

  // cache: 31557600000
};
