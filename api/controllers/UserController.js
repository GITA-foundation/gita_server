/**
 * Authentication Controller
#
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */
const UserController = {
  apiForgetRequest: async(req, res) => {
    try {
      if (!req.body.email) {
        return res.badRequest('Invalid Parameter');
      }

      const email = req.body.email;
      const user = await UserService.findOneByEmail(email);

      if (!user) {
        res.status(401);
        return res.json({
          message: 'Not found email!'
        });
      }

      const token = TokenAuth.issueToken({ sub: user.id }, { expiresIn: '1d' });
      const link = UrlHelper.resolve(`resetPassword?code=${token}`, true);
      const messageConfig = await CustomMailerService.checkForgotPasswordMail({
        user,
        link
      });

      const message = await db.Message.create(messageConfig);
      await CustomMailerService.sendMail(message);
      res.created();
    } catch (e) {
      return res.serverError(e)
    }
  },

  apiResetPassword: async(req, res) => {
    sails.log.verbose('=== apiResetPassword ===');
    try {
      const user = UserService.getLoginUser(req);

      if (!req.body.newPassword) {
        return res.badRequest('Invalid Parameter');
      }

      const newPassword = req.body.newPassword
      await PassportService.updatePasswordAndCreateLocalPassport(user.id, newPassword);
      const passport = {
        updatedAt: new Date(),
        password: newPassword
      }

      const messageConfig = await CustomMailerService.newPasswordMail({
        user, passport
      });
      const message = await db.Message.create(messageConfig);
      await CustomMailerService.sendMail(message);

      const token = TokenAuth.issueToken({
        sub: user.id
      });
      res.redirect(`/?verify=ok&accessToken=${token}`);
    } catch (err) {
      console.error(err.stack);
      return res.serverError(e)
    }
  },

  apiUpdate: async(req, res) => {
    sails.log.verbose('=== apiUpdate ===');

    try {
      const currentUser = UserService.getLoginUser(req);

      if (currentUser) {

        const user = await db.User.findOne({
          where: {id: currentUser.id}
        });

        user.fullName = req.body.fullName;
        user.title = req.body.title;
        user.phone = req.body.phone;
        user.address = req.body.address;
        user.country = req.body.country;

        await user.save();

        if (req.body.password) {
          await PassportService.updatePasswordAndCreateLocalPassport(user.id, req.body.password)
        }
        res.status(204);
        res.end();
      } else {
        res.status(401);
        return res.json({
          message: 'Invalid Token',
        });
      }
    } catch (e) {
      return res.serverError(e);
    }
  },

  apiGetMe: async(req, res) => {
    try {
      const currentUser = await UserService.getLoginUser(req);
      const userRawData = await db.User.findOne({
        attributes: [
          'id', 'username', 'email', 'contact', 'fullName',
          'phone', 'title', 'type', 'country', 'isVerified',
          'role'
        ],
        where: {
          id: currentUser.id
        },
      });
      const user = userRawData.get({plain: true});
      res.ok(user);
    } catch (e) {
      return res.serverError(e);
    }
  },

  update: async(req, res) => {

    try {
      const userId = req.param("id");
      const updateUser = req.body;
      let passport = await db.Passport.findOne({
        where: { UserId: userId }
      });

      let user = await db.User.findOne({
        where: { id: userId },
      });

      if (!user) {
        return res.serverError({ msg: '找不到User！ 請確認User ID！' });
      }

      if (updateUser.password && updateUser.password !== passport.password) {
        passport.password = updateUser.password;
        await passport.save()
      }

      Object.keys(updateUser).forEach((key) => {
        if (typeof(user[key]) != undefined) user[key] = updateUser[key];
      });

      await user.save();

      const messageConfig = await CustomMailerService.userUpdateMail(user);
      const message = await db.Message.create(messageConfig);
      await CustomMailerService.sendMail(message);

      req.login(user, function(err) {
        if (err) return res.serverError(err);
        return res.redirect('/');
      })

    } catch ({ message, stack }) {
      console.error(stack);
      return res.serverError({ message });
    }
  },
  controlLogin: function(req, res) {
    if (UserService.getLoginState(req))
      return res.redirect(sails.config.admin.redirectLogin);
    else
      res.view("admin/login");
  },
  password: async function(req, res) {
    let message = '無';

    try {
      if (req.method == 'POST') {
        const user = await UserService.getLoginUser(req);

        // confirm oldPassword
        const currentPassport = await db.Passport.findOne({
          where: {
            UserId: user.id
          }
        });

        const oldPassword = req.body.oldPassword;
        if (UserService.isAdmin(user.role)) {
          sails.log.verbose("admin update password", req.body.newPassword);
          if (user) {
            let passport = await db.Passport.findOne({
              where: {
                protocol: 'local',
                UserId: user.id,
              }
            });
            sails.log.verbose("check old password");
            let passportCheck = await new Promise((resolve, reject) => {
              passport.validatePassword(oldPassword, function(err, res) {
                if (err) {
                  return reject(err);
                }
                if (!res) {
                  return reject('Error.Passport.Password.Wrong');
                } else {
                  return resolve(res);
                }
              });
            });

            // let result = await passportCheck;
            sails.log.verbose(passportCheck);
            if (passportCheck) {
              sails.log.verbose(req.body.newPassword);
              await PassportService.updatePasswordAndCreateLocalPassport(user.id, req.body.newPassword);
              message = '密碼已經更新';
            } else {
              message = "原密碼錯誤，更新失敗";
            }

          } else {
            message = "找不到此使用者";
          }
        } else {
          message = "非管理者權限無法進行存取";
        }
      }
    } catch (error) {
      message = "原密碼錯誤，更新失敗";
    }

    res.view({
      message
    });
  },
  controlMembers: async function(req, res) {

    try {
      sails.log.verbose('controlMembers query', req.query);
      const loginUser = UserService.getLoginUser(req);
      const editableRoles = AuthService.getEditableRoles(loginUser.role);
      const result = await UserService.getMembersReport(req, editableRoles);
      const page = await pagination.page(req);
      const limit = await pagination.limit(req);

      res.view("user/controlMembers", {
        pageName: "/admin/members",
        members: result.members,
        page: page,
        limit: limit,
        totalPages: Math.ceil(result.members.count / limit),
        totalRows: result.members.count,
        query: result.query,
        roles: editableRoles
      });
    } catch (error) {
      return res.serverError(error);
    }
  },
  getMemberDetail: async function(req, res) {
    try {
      const userId = req.param('id');

      const loginUser = UserService.getLoginUser(req);

      let whereObj = { id: userId };

      if (loginUser.role === 'node') {
        whereObj.NodeId = loginUser.id;
      }

      const member = await db.User.findOne({
        where: whereObj,
        include: [db.Project]
      });

      if (!member) return res.notFound();

      // check req user can view the page
      const allowedRoles = AuthService.getEditableRoles(loginUser.role);
      if (!allowedRoles.includes(member.role)) return res.forbidden();

      res.view("user/controlMemberDetail", {
        pageName: "/admin/members",
        member: member.toJSON(),
        projects: member.Projects,
        roles: allowedRoles
      });
    } catch (error) {
      return res.serverError(error);
    }
  },
  updateMemberDetail: async function(req, res) {
    try {
      const body = req.body;
      const userId = req.param('id');
      await UserService.updateUser(userId, body);
      return res.ok();
    } catch (error) {
      return res.serverError(error);
    }
  },

  delete: async(req, res) => {
    try {
      let userId = req.param("id");
      sails.log.verbose(userId);
      let findUser = await db.User.findByPk(userId);
      if (!findUser) {
        return res.serverError({
          msg: '找不到User！ 請確認UserID！'
        });
      }
      await findUser.destroy();
      const ensureDelete = await db.User.findByPk(userId);
      if (ensureDelete) {
        return res.serverError({
          msg: 'delete失敗'
        });
      }
      return res.ok({
        status: 'ok'
      });
    } catch (error) {
      return res.serverError(error);
    }
  },

  getNodeList: async(req, res) => {
    try {
      let nodes = await db.User.findAll({
        attributes: [
          'id',
          'company'
        ],
        where: {
          role: {
            $in: ['node', 'supernode']
          }
        }
      });
      return res.json(nodes);
    } catch (error) {
      return res.serverError(error);
    }
  }
};

module.exports = UserController;
