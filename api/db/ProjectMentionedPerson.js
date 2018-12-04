// 專案與資訊中所提及的人的 Model
module.exports = function(sequelize, DataTypes) {

  var ProjectMentionedPerson = sequelize.define('ProjectMentionedPerson', {
    modelName: {
      type: DataTypes.ENUM("biography_team", "biography_advisor", "biography_developer", "advisor_role", "marketing_partnership"),
      allowNull: false
    },
    // Person name
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("PENDING", "VERIFIED", "REJECTED"),
      defaultValue: "PENDING"
    },
  }, {
    paranoid: false,
  });

  ProjectMentionedPerson.associate =  function(models) {
    ProjectMentionedPerson.belongsTo(models.Project);
    return;
  }

  return ProjectMentionedPerson;
};
