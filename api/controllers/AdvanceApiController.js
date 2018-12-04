const isUUID = (uuid) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.test(uuid);

const AdvanceApiController = {
  getProjects: async(req, res) => {
    try {
      const loginUser = UserService.getLoginUser(req);
      if (loginUser.role === 'user') return res.forbidden();

      let whereObj = {};

      if (loginUser.role === 'node') {
        const users = await db.User.findAll({
          attributes: ['id'],
          where: { NodeId: loginUser.id }
        });
        const userIds = _.map(users, 'id');
        whereObj.UserId = { $in: userIds };
      }

      const result = await db.Project.findAll({
        attributes: [
          'identity', 'title', 'token', 'logo', 'percent', 'isGitaStandard', 'isVerified', 'status'
        ],
        where: whereObj,
        include: [{
          model: db.User,
          as: 'AdminUser',
          attributes: ['fullName']
        }]
      });
      return res.json(result);
    } catch ({ message, stack }) {
      sails.log.error(stack);
      return res.serverError({ message });
    }
  },
  getUsers: async(req, res) => {
    try {
      const loginUser = UserService.getLoginUser(req);
      if (loginUser.role === 'user') return res.forbidden();

      let query = {
        where: {
          role: {
            $in: ['supernode', 'node', 'user']
          }
        },
        include: {
          as: 'Node',
          model: db.User,
          attributes: [
            'fullName'
          ]
        }
      }

      if (loginUser.role === 'node') {
        query.where.NodeId = loginUser.id;
      }

      const users = await UserService.findAll(query);
      return res.ok({
        users
      });
    } catch (error) {
      return res.serverError(error);
    }
  },
  updateProject: async(req, res) => {
    try {
      const { identity } = req.params;
      const updateProject = req.body;
      const loginUser = UserService.getLoginUser(req);

      if (!isUUID(identity)) return res.serverError('invalid id');

      const findProject = await ProjectService.findByIndetity(identity);
      if (!findProject) {
        throw new Error('找不到 Project！');
      }

      if (updateProject.isVerified !== undefined) {
        findProject.isVerified = updateProject.isVerified
      }

      if (updateProject.isVerified === true) {
        findProject.AdminUserId = loginUser.id;
      }

      if (updateProject.status) {
        findProject.status = updateProject.status;
      }
      await findProject.save();
      await ProjectHistoryService.create(req, findProject.id);
      return res.ok({});
    } catch ({ message, stack }) {
      console.error(stack);
      return res.serverError({ message });
    }
  },
  updateUser: async(req, res) => {
    try {
      const loginUser = UserService.getLoginUser(req);
      const userId = req.param("id");
      const updateUser = req.body;

      console.log('updateUser =>', updateUser);
      let user = await UserService.findOne(userId);
      if (!user) {
        return res.serverError({ msg: '找不到User！ 請確認User ID！' });
      }

      if (updateUser.isVerified !== undefined) {
        user.isVerified = updateUser.isVerified
      }

      if (user.type === 'entity' && user.role === 'user' && updateUser.isVerified === true) {
        const hasProject = await ProjectService.findOneByUser(userId);
        if (!hasProject) {
          const newProject = await db.Project.create({
            AdminUserId: loginUser.id,
            UserId: user.id,
            title: user.company,
            isVerified: true,
            items: {}
          });
          await ProjectHistoryService.create(req, newProject.id);
        }
      }

      if (updateUser.role) {
        user.role = updateUser.role;
      }

      await user.save();
      return res.ok({});
    } catch ({ message, stack }) {
      console.error(stack);
      return res.serverError({ message });
    }
  },
};

module.exports = AdvanceApiController;
