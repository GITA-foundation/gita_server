/**
Bootstrap
(sails.config.bootstrap)

An asynchronous bootstrap function that runs before your Sails app gets lifted.
This gives you an opportunity to set up your data model, run jobs, or perform some special logic.

For more information on bootstrapping your app, check out:
http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */




const sailsMailer = require('sails-service-mailer');
const init = require('./init');
const path = require('path');


module.exports.bootstrap = async (cb) => {
  try {
    // inject moment for pug views
    require('moment-timezone').tz.setDefault('Asia/Taipei');
    sails.moment = require('moment');
    sails.moment.locale("zh-TW");

    // log json
    sails.lj = (jsonObj, desc = 'json') => {
      console.log('====== '+ desc +' ======');
      console.log(JSON.stringify(jsonObj, null, 4));
      console.log('==== '+ desc +' end ==== ');
    }

    sails.config.mail.mailer = sailsMailer(sails.config.mail.type, sails.config.mail.config);
    sails.services.passport.loadStrategies();

    let models = require('../api/db');

    global.db = models;

    // Development environment
    if (sails.config.environment !== 'production') {

      if(sails.config.db.force){
        await init.databaseDropAndCreate();
      }

      await init.database();
      await init.basicData();
      if (sails.config.createInitData) {
        await init.testData();
      }
    }

    return cb();
  } catch (e) {
    return cb(e);
  }

};
