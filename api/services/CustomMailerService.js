import {sprintf} from 'sprintf-js';

var self = module.exports = {

  /*
   * 向新註冊的使用者問安
   */
  greeting: (user) => {
    try {
      var greetingTpl = sails.config.mail.templete.greeting;
      var email = user.email;
      var fullName = user.fullName || user.username;
      var mailSendConfig = {...greetingTpl, from: sails.config.mail.config.from, to: email};

      mailSendConfig.subject = sprintf(mailSendConfig.subject, {
        storeName: sails.config.store.name
      });

      mailSendConfig.html = sprintf(mailSendConfig.html, {
        fullName: fullName,
        userEmail: user.email,
        storeName: sails.config.store.name,
        storeName2: sails.config.store.name2,
        storeName3:sails.config.store.name3,
        serviceMail: sails.config.store.serviceMail
      });

      mailSendConfig.type = 'greeting';

      return mailSendConfig;
    } catch (error) {
      throw error;
    }
  },
  sendMail: async (message) => {
    try {
      if(sails.config.environment === 'production' || sails.config.mail.active){
        sails.log('=== sendMail ===');
        let config = message.toJSON();

        if (sails.config.forword.active) {
          config['bcc'] = config.bcc && config.bcc.length > 0
            ? [config.bcc, ...sails.config.forword.recipients]
            : sails.config.forword.recipients;
        }

        let send = await sails.config.mail.mailer.send(config);
        sails.log.verbose("send!!!",send);
        message.error = '';
      } else {
        message.error = 'test only';
      }

      message.success = true;
      await message.save();
    } catch (error) {
      console.error(error.stack);
      message.success = false;
      message.error = error.message;
      await message.save();
    }
  },
  checkForgotPasswordMail: async({user, link}) => {
    try {
      var checkForgotTpl = sails.config.mail.templete.checkForgot;
      var email = user.email;
      var mailSendConfig = {...checkForgotTpl, from: sails.config.mail.config.from, to: email};
      mailSendConfig.subject = sprintf(mailSendConfig.subject, {
        storeName: sails.config.store.name
      });

      mailSendConfig.html = sprintf(mailSendConfig.html, {
        fullName: user.fullName || user.username,
        link: link,
        storeName: sails.config.store.name,
        storeName2: sails.config.store.name2,
        storeName3:sails.config.store.name3,
        serviceMail: sails.config.store.serviceMail
      });

      mailSendConfig.type = 'checkForgotPassword';

      return mailSendConfig;
    } catch (error) {
      throw error;
    }
  },
  newPasswordMail: async({user,passport}) =>{
    try {
      var newPasswordTpl = sails.config.mail.templete.newPassword;
      var email = user.email;
      var password = passport.password;
      var mailSendConfig = {...newPasswordTpl, from: sails.config.mail.config.from, to: email};
      mailSendConfig.subject = sprintf(mailSendConfig.subject, {
        storeName: sails.config.store.name
      });

      mailSendConfig.html = sprintf(mailSendConfig.html, {
        fullName: user.fullName || user.username,
        createdAt: sails.moment(passport.updatedAt).format('YYYY/MM/DD HH:mm:ss'),
        userId: user.email,
        password: password,
        storeName: sails.config.store.name,
        storeName2: sails.config.store.name2,
        storeName3: sails.config.store.name3,
        serviceMail: sails.config.store.serviceMail
      });

      mailSendConfig.type = 'newPassword';

      return mailSendConfig;
    } catch (error) {
      throw error;
    }
  },
  verificationMail: async(user, refsUser) => {
    try {
      var verificationTpl = sails.config.mail.templete.verification;
      var email = user.email;
      var mailSendConfig = {...verificationTpl, from: sails.config.mail.config.from, to: email};
      mailSendConfig.subject = sprintf(mailSendConfig.subject, {
        storeName: sails.config.store.name
      });

      mailSendConfig.bcc = refsUser.email;

      mailSendConfig.html = sprintf(mailSendConfig.html, {
        fullName: user.fullName || user.contact,
        nodeName: refsUser.fullName || refsUser.company,
        storeName: sails.config.store.name
      });

      mailSendConfig.type = 'verification';


      return mailSendConfig;
    } catch (error) {
      throw error;
    }
  },
  userUpdateMail: async(user) => {
    try {
      var userUpdateTpl = sails.config.mail.templete.userUpdate;
      var email = user.email;
      var fullName = user.fullName || user.username
      var mailSendConfig = {...userUpdateTpl, from: sails.config.mail.config.from, to: email};
      mailSendConfig.subject = sprintf(mailSendConfig.subject, {
        fullName: fullName
      });

      mailSendConfig.html = sprintf(mailSendConfig.html, {
        fullName: fullName,
        createdAt: sails.moment(new Date()).format('YYYY/MM/DD HH:mm:ss'),
        userId: user.email,
        storeName: sails.config.store.name,
        storeName2: sails.config.store.name2,
        storeName3: sails.config.store.name3,
        serviceMail: sails.config.store.serviceMail,
      });

      mailSendConfig.type = 'verification';

      return mailSendConfig;
    } catch (error) {
      throw error;
    }
  },
  // Gita mentioned Person
  requestMentionedPersonToVerified: (data) => {
    try {
      const {
        projectName, personName, personEmail, memberName, memberEmail,
        token, website, projectUrl, activeLink, roleType
      } = data;

      const personConfirmTpl = sails.config.mail.templete.requestMentionedPersonToVerified;

      let mailSendConfig = {...personConfirmTpl, from: sails.config.mail.config.from, to: personEmail};


      mailSendConfig.subject = sprintf(mailSendConfig.subject, { memberName });

      mailSendConfig.html = sprintf(mailSendConfig.html, {
        projectName, personName, personEmail, memberName, memberEmail,
        token, website, projectUrl, activeLink, roleType
      });

      mailSendConfig.type = 'requestMentionedPersonToVerified';

      return mailSendConfig;
    } catch (error) {
      throw error;
    }
  },
  /*
   * 前台聯絡聯絡我們
   */
  contactUs: (user, target) => {

    try {
      var contactUsTpl = sails.config.mail.templete.contactUs;
      var email = user.email;
      var mailSendConfig = {...contactUsTpl, from: sails.config.mail.config.from, to: target};

      mailSendConfig.subject = sprintf(mailSendConfig.subject, {
        userName: user.name,
        storeName: sails.config.store.name
      });

      mailSendConfig.html = sprintf(mailSendConfig.html, {
        userName: user.name,
        userId: user.email,
        userContact: user.contact,
        userIssue: user.issue,
        userQuestion: user.question.replace(/\n/g, '<br>'),
        storeName: sails.config.store.name,
        serviceMail: sails.config.store.serviceMail,
      });

      mailSendConfig.type = 'contactUs';
      return mailSendConfig;

    } catch (error) {
      throw error;
    }
  },
  getBCC: () => {
    let bcc = '';
    if(sails.config.forword.active){
      bcc = sails.config.forword.recipients.join();
      sails.log.verbose('bcc:', bcc);
    }
    return bcc;
  }

};
