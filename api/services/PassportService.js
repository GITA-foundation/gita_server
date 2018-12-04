import crypto from 'crypto';
/*
  PassportService.js
*/

module.exports = {
  updatePasswordAndCreateLocalPassport: async(userId, newPassword) => {
    sails.log.verbose('=== PassportService.updatePasswordAndCreateLocalPassport ===');

    let localPassport = await db.Passport.findOne({
      where: {
        protocol: 'local',
        UserId: userId
      }
    });

    if (localPassport) {
      localPassport.newPassword = true;
      localPassport.password = newPassword;
      return await localPassport.save();
    } else {
      return PassportService.createLocalPassport(userId, newPassword)
    }
  },

  createLocalPassport: async(userId, password) => {
    try {
      var token = crypto.randomBytes(48).toString('base64');
      let passport = await db.Passport.create({
        protocol: 'local',
        password: password,
        UserId: userId,
        token: token
      });
      return passport;
    } catch (e) {
      sails.log.error(e);
      throw e;
    }
  }
};
