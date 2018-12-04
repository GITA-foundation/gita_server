import validator from 'validator';

exports.register = async function(req, res, next) {
  sails.log.verbose('=== api.service.protocols.local.register ===');
  const { email, password, confirmPassword, node: NodeId } = req.body;
  try {

    if (!email) {
      throw new Error('No email was entered.');
    }

    if (!password) {
      throw new Error('No password was entered.');
    }

    if (password !== confirmPassword) {
      throw new Error('Confirm Password is wrong');
    }

    const isUserExistedQuery = {
      where: {
        $or: [
          { email },
          { username: email }
        ]
      }
    }

    const [isUserExisted, refsNode]  = await Promise.all([
      db.User.findOne(isUserExistedQuery),
      UserService.findOne(NodeId),
    ]);

    if(isUserExisted) {
      throw new Error('The user was existed.');
    }

    if (!refsNode) throw new Error('No refs Node was entered.');

    const newUserParams = req.body;
    const isEntity = true; // NOT YET support personal;

    const newUser = {
      username: email,
      email,
      fullName: isEntity ? newUserParams.company : newUserParams.contact,
      contact: newUserParams.contact,
      NodeId: NodeId,
      company: newUserParams.company,
      title: newUserParams.title,
      phone: newUserParams.phone,
      country: newUserParams.country,
      isPrivacyTermsAgreed: newUserParams.isPrivacyTermsAgreed || false,
    }

    const user = await UserService.create(newUser);
    const passport = await PassportService.createLocalPassport(user.id, password);

    const messageConfig = await CustomMailerService.verificationMail(user, refsNode);
    const message = await db.Message.create(messageConfig);
    await CustomMailerService.sendMail(message);
    return next(null, user);
  } catch (err) {
    console.error(err.stack);
    req.flash('error', err.message);
    return next(err);

  }
};

exports.connect = function(req, res, next) {
  sails.log.verbose('=== api.service.protocols.local.connect ===');
  var password, user;
  user = req.user;
  password = req.param('password');
  db.Passport.findOne({
    protocol: 'local',
    UserId: user.id
  }, function(err, passport) {
    if (err) {
      return next(err);
    }
    if (!passport) {
      db.Passport.create({
        protocol: 'local',
        password: password,
        UserId: user.id
      }, function(err, passport) {
        next(err, user);
      });
    } else {
      next(null, user);
    }
  });
};

exports.login = function(req, identifier, password, next) {
  sails.log.verbose('=== api.service.protocols.local.login ===');
  try {
    var isEmail, query;
    sails.log.verbose('identifier:', identifier);
    isEmail = validator.isEmail(identifier);
    query = {
      where: {},
    };
    sails.log.verbose('isEmail:', isEmail);
    if (isEmail) {
      query.where.email = identifier;
    } else {
      query.where.username = identifier;
    }
    db.User.findOne(query).then(function(user) {
      if (!user) {
        if (isEmail) {
          req.flash('error', 'Error.Passport.Email.NotFound');
        } else {
          req.flash('error', 'Error.Passport.Username.NotFound');
        }
        return next(null, false);
      }
      if(user.email){
        sails.log.verbose('== user ==', user.email);
      }

      db.Passport.findOne({
        where: {
          UserId: user.id
        }
      }).then(function(passport) {
        if (passport) {
          sails.log.verbose('== passport ==', passport.id);
          passport.validatePassword(password, function(err, res) {
            if (err) {
              return next(err);
            }
            if (!res) {
              req.flash('error', 'Error.Passport.Password.Wrong');
              return next(null, false);
            } else {
              return next(null, user);
            }
          });
        } else {
          sails.log.verbose('passport is empty');
          req.flash('error', 'Error.Passport.Password.NotSet');
          return next(null, false);
        }
      });
    });
  } catch (e) {
    sails.log.error(e);
  }
};
