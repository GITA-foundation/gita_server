module.exports = function(sequelize, DataTypes) {
  const FAQForm = sequelize.define('FAQForm', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    content: DataTypes.TEXT,
    finished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    memo: DataTypes.STRING,
  },{
    paranoid: true,
  });
  return FAQForm;
};
