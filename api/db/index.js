
(function() {
  'use strict';
  var Sequelize, config, db, fs, path, sequelize;

  fs = require('fs');

  path = require('path');

  Sequelize = require('sequelize');

  config = sails.config.db;

  sequelize = new Sequelize(config.database, config.username, config.password, config);

  db = {};

  fs.readdirSync(__dirname).filter(function(file) {
    return file.indexOf('.') !== 0 && file !== 'index.js';
  }).forEach(function(file) {
    var model;
    model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

  var modules = fs.readdirSync(__dirname + '/../../node_modules').filter(function(file) {
    return file.match('sails-hook-picklete');
  });
  modules.map(function (pickleteModule) {
    var customerPath = __dirname + '/../../node_modules/' + pickleteModule + '/api/models';
    fs.readdirSync(customerPath).filter(function(file) {
      return file.indexOf('.') !== 0 && file !== 'index.js';
    }).forEach(function(file) {
      var model;
      model = sequelize["import"](path.join(customerPath, file));
      db[model.name] = model;
    });
  })




  Object.keys(db).forEach(function(modelName) {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;

  db.Sequelize = Sequelize;

  module.exports = db;

}).call(this);
