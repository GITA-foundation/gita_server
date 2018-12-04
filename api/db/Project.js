import { isProjectStandard, getTotalFinished } from '../utils/project';

// 專案 Model
module.exports = function(sequelize, DataTypes) {

  var Project = sequelize.define('Project', {
    // 另一個 UUID 的 id
    identity: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    // 專案標題
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
    // 專案內容
    // description: DataTypes.TEXT,
    items: {
      type: DataTypes.TEXT,
      set: function(newContent) {
        if (!newContent) {
          return this.setDataValue("items", null);
        }

        const total = Object.keys(newContent).length;
        const finishedTotal = getTotalFinished(newContent);
        console.log(`total ==> ${total}, finishedTotal ==> ${finishedTotal}`);
        const percent = total === 0
          ? 0
          : finishedTotal >= total
            ? 100 : parseInt(finishedTotal / total * 100);

        this.setDataValue("percent", percent);
        this.setDataValue("isGitaStandard", isProjectStandard(newContent));
        return this.setDataValue("items", JSON.stringify(newContent));
      },
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
    }
  }, {
    paranoid: true,
  });

  Project.associate =  function(models) {
    Project.belongsTo(models.User);
    Project.belongsTo(models.User, { as: 'AdminUser' });
    return;
  }

  return Project;
};
