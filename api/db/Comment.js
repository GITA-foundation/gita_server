// 回應 Model
module.exports = function(sequelize, DataTypes) {

  var Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT,
  }, {
    paranoid: true,
  });

  Comment.associate =  function(models) {
    Comment.belongsTo(models.User);
    Comment.belongsTo(models.Project);
    return;
  }

  return Comment;
};
