module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    fullName: DataTypes.STRING, // type === entity ? contact : user fullname
    role: {
      type: DataTypes.ENUM('user', 'node', 'supernode', 'admin'),
      defaultValue: 'user'
    },
    type: {
      type: DataTypes.ENUM('personal', 'entity'),
      defaultValue: 'entity'
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    contact: DataTypes.STRING,
    company: DataTypes.STRING,
    title: DataTypes.STRING,
    phone: DataTypes.STRING, // mobile
    avatar: DataTypes.STRING,
    country: DataTypes.STRING,
    address: DataTypes.STRING,
    comment: DataTypes.STRING,
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isDisabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isPrivacyTermsAgreed: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    forgotToken: DataTypes.STRING,
  }, {
    paranoid: true,
  });

  User.associate =  function(models) {
    User.hasMany(models.Passport);
    User.belongsTo(models.User, { foreignKey: 'NodeId', sourceKey: 'id', as: 'Node' });
    User.hasMany(models.Project);
    return;
  }

  return User;
};
