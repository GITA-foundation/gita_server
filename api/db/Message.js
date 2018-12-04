module.exports = function(sequelize, DataTypes) {
  const Message = sequelize.define('Message', {
    sendBy: DataTypes.ENUM('email', 'sms'),
    type: DataTypes.ENUM('requestMentionedPersonToVerified', 'greeting', 'checkForgotPassword', 'newPassword', 'verification', 'contactUs'),
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    toName: DataTypes.STRING,
    subject: DataTypes.STRING,
    text: DataTypes.TEXT,
    html: DataTypes.TEXT,
    success: DataTypes.BOOLEAN,
    response: DataTypes.STRING,
    error: DataTypes.STRING,
    bcc: DataTypes.STRING
  });
  return Message;
};

