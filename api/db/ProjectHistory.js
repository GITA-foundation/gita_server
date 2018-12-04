// 專案歷史紀錄 Model
module.exports = function(sequelize, DataTypes) {

  const ProjectHistory = sequelize.define('ProjectHistory', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING
    },
    logo: {
      type: DataTypes.STRING,
      defaultValue: '/img/logo_only.png'
    },
    items: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM('draft', 'review', 'publish'),
      defaultValue: 'draft'
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isGitaStandard: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    percent: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        max: 100
      },
    }
  }, {
    paranoid: false,
    updatedAt: false
  });

  ProjectHistory.associate =  function(models) {
    ProjectHistory.belongsTo(models.Project);
    ProjectHistory.belongsTo(models.FormSchema);
    ProjectHistory.belongsTo(models.User);
    ProjectHistory.belongsTo(models.User, { as: 'AdminUser' });
    ProjectHistory.belongsTo(models.User, { as: 'ModifyUser' });
    return;
  }

  return ProjectHistory;
};
