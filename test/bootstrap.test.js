
(function() {
  var Sails, options, sails;

  Sails = require('sails');

  sails = void 0;

  global.request = require('supertest');

  global.should = require('chai').should();

  global.moment = require('moment');

  global.sinon = require('sinon');

  // global.config = require('./resources/config');

  require("@babel/register")({presets: ['@babel/preset-env']});
  require("@babel/polyfill");

  before(function(done) {
    Sails.lift({
      environment: 'process.env.NODE_ENV' | 'test',
      port: 1338,
      hooks: {
        grunt: false,
        orm: false,
        i18n: false,
        pubsub: false,
        blueprints: false
      }
    }, function(err, server) {
      sails = server;
      if (err) {
        return done(err);
      }
      done(err, sails);
    });
  });

  after(function(done) {
    sails.lower(done());
  });

}).call(this);
