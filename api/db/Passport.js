import bcrypt from 'bcryptjs';

module.exports = function(sequelize, DataTypes) {
  const Passport = sequelize.define('Passport', {
    protocol: DataTypes.STRING,
    password: DataTypes.STRING,
    accessToken: DataTypes.STRING,
    provider: DataTypes.STRING,
    identifier: DataTypes.STRING,
    tokens: {
      type: DataTypes.TEXT,
      get: function() {
        var value;
        if (value = this.getDataValue('tokens')) {
          return JSON.parse(value);
        } else {
          return [];
        }
      },
      set: function(value) {
        sails.log.verbose('value', value);
        return this.setDataValue('tokens', JSON.stringify(value));
      }
    }
  });

  Passport.associate = function(models) {
      Passport.belongsTo(models.User);
    }

  Passport.prototype.validatePassword = function(password, next) {
    bcrypt.compare(password, this.password, next);
  }

  Passport.prototype.hashPassword = function(password, next) {
    return bcrypt.hashSync(this.password, 10);
  }

  Passport.addHook('beforeCreate', 'updatePasswordOnCreate', async function(passport, options) {
    if(passport.password){
        passport.password = passport.hashPassword();
    }
  });

  Passport.addHook('beforeUpdate', 'updatePasswordOnUpdate', async function(passport, options) {
    if(passport.password){
        passport.password = passport.hashPassword();
    }
  });

  return Passport;
};
