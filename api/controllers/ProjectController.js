const isUUID = (uuid) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.test(uuid);

const ProjectController = {
  apiCreate: async (req, res) => {
    try {
      const loginUser = UserService.getLoginUser(req);
      if (!loginUser) return res.serverError('Auth error');

      const isProjectExisted = await db.Project.findOne({ where: { UserId: loginUser.id } });

      if (isProjectExisted) return res.serverError('Every User can create only ONE project');

      const { data: formData} = req.body;
      const result = await db.Project.create({
        title: formData.project_name || 'noname',
        token: formData.token_ticker || 'token',
        logo: formData.project_icon && formData.project_icon[0] && formData.project_icon[0].fd,
        items: formData,
        UserId: loginUser.id
      });

      const projectId = result.id;
      const identity = result.identity;

      await Promise.all([
        ProjectMentionedPersonService.createMentionedPerson({ projectId, identity, user: loginUser, formData }),
        ProjectHistoryService.create(req, projectId)
      ]);

      return res.json({
        result: {
          id: result.identity,
        }
      });
    } catch (e) {
      return res.serverError(e);
    }
  },
  apiCreateComment: async (req, res) => {
    try {
      const loginUser = UserService.getLoginUser(req);
      if (!loginUser) return res.serverError('Auth error');

      const { identity } = req.params;
      if (!isUUID(identity)) return res.serverError('invalid id');

      const findProject = await ProjectService.findByIndetity(identity);
      if (!findProject) {
        throw new Error('找不到 Project！');
      }

      const { data } = req.body;
      console.log('data ==>', data);
      const result = await db.Comment.create(data);
      await result.setUser(loginUser.id);
      await result.setProject(findProject.id);
      return res.json({
        result: {
          id: result.id,
        }
      });
    } catch (e) {
      return res.serverError(e);
    }
  },
  apiGetCommentList: async(req, res) => {
    try {
      const { identity } = req.params;
      if (!isUUID(identity)) return res.serverError('invalid id');

      const findProject = await ProjectService.findByIndetity(identity);

      if (!findProject) {
        throw new Error('找不到 Project！');
      }

      const result = await db.Comment.findAll({
        attributes: [
          'id', 'content', 'createdAt'
        ],
        where: {
          ProjectId: findProject.id
        },
        include: [{
          model: db.User,
          attributes: ['fullName']
        }],
        order: [
          [
            'createdAt',
            'ASC',
          ]
        ]
      });
      const comments = _.map(result, (comment) => ({
        ...comment.dataValues,
        createdAt: sails.moment(comment.dataValues.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      }));
      res.json(comments);
    } catch (e) {
      return res.serverError(e);
    }
  },
  apiGetList: async(req, res) => {
    try {

      const result = await db.Project.findAll({
        attributes: [
          'identity', 'title', 'token', 'logo', 'percent', 'isGitaStandard'
        ],
        where: {
          status: "publish",
          isVerified: true,
        },
        include: [{
          model: db.User,
          as: 'AdminUser',
          attributes: ['fullName']
        }]
      });
      return res.json(result);

    } catch (error) {
      sails.log.error(error.stack);
      let msg = error.message;
      return res.serverError({
        msg
      });
    }
  },
  apiGetMyProject: async(req, res) => {
    try {
      const loginUser = UserService.getLoginUser(req);
      const project = await db.Project.findOne({
        attributes: [
          'identity', 'title', 'token', 'logo', 'items', 'status'
        ],
        where: { UserId: loginUser.id }
      });

      if (!project) {
        return res.badRequest('noProjectFound');
      }

      return res.json(project);
    } catch (error) {
      console.error(error.stack);
      let msg = error.message;
      return res.serverError({
        msg
      });
    }
  },
  apiGetOne: async(req, res) => {
    try {
      const { identity } = req.params;
      if (!isUUID(identity)) return res.serverError('invalid id');

      const items = await db.Project.findOne({
        attributes: [
          'identity', 'title', 'token', 'logo', 'items', 'status'
        ],
        where: {
          status: 'publish',
          isVerified: true,
          identity
        }
      });
      res.json(items);
    } catch (e) {
      return res.serverError(e);
    }
  },
  apiUpdate: async (req, res) => {
    try {
      const { identity } = req.params;
      if (!isUUID(identity)) return res.badRequest('invalid id');

      const formData = req.body;
      const loginUser = UserService.getLoginUser(req);
      let project = await db.Project.findOne({
        where: {
          identity,
          UserId: loginUser.id
        }
      });
      if (!project) {
        return res.badRequest('Project is not found');
      }
      const iconField = formData.items.project_icon;
      project.title = formData.items.project_name;
      project.token = formData.items.token_ticker;
      project.logo = iconField && iconField[0] && iconField[0].fd;
      project.items = formData.items;

      if (formData.status) {
        project.status = formData.status;
      }
      const projectId = project.id;
      await Promise.all([
        await ProjectMentionedPersonService.updateMentionedPerson({ projectId, user: loginUser, formData: formData.items, identity }),
        project.save(),
      ]);

      await ProjectHistoryService.create(req, projectId);


      return res.json({
        result: {
          id: project.id,
        }
      });
    } catch (e) {
      console.log(e, '===');
      return res.serverError(e);
    }
  },
  verify: async(req, res) => {
    try {
      const { identity } = req.params;
      if (!isUUID(identity)) return res.serverError('invalid id');

      const findProject = await ProjectService.findByIndetity(identity);
      if (!findProject) {
        throw new Error('找不到 Project！');
      }

      const loginUser = UserService.getLoginUser(req);

      findProject.isVerified = true;
      findProject.AdminUserId = loginUser.id;
      let updateProject = await findProject.save();
      if (!updateProject) {
        req.flash('message', `Project ID ${identity} verify fail`);
        throw new Error('verify fail');
      }
      await ProjectHistoryService.create(req, updateProject.id);

      return res.ok(updateProject.toJSON());

    } catch (error) {
      console.error(error.stack);
      let msg = error.message;
      return res.serverError({
        msg
      });
    }
  },

  unverify: async(req, res) => {
    try {
      const { identity } = req.params;
      if (!isUUID(identity)) return res.serverError('invalid id');

      const findProject = await ProjectService.findByIndetity(identity);
      if (!findProject) {
        throw new Error('找不到 Project！');
      }

      findProject.isVerified = false;
      const updateProject = await findProject.save();

      if (!updateProject) {
        req.flash('message', `Project ID ${identity} verify fail`);
        throw new Error('unverify fail');
      }
      await ProjectHistoryService.create(req, updateProject.id);
      return res.ok(updateProject.toJSON());

    } catch (error) {
      console.error(error.stack);
      let msg = error.message;
      return res.serverError({
        msg
      });
    }
  },
  updateStatus: async(req, res) => {
    try {
      const { identity } = req.params;
      if (!isUUID(identity)) return res.serverError('invalid id');

      const findProject = await ProjectService.findByIndetity(identity);
      if (!findProject) {
        throw new Error('找不到 Project！');
      }

      findProject.status = req.body.status;
      let updateProject = await findProject.save();
      if (!updateProject) {
        req.flash('message', `Project ID ${identity} status fail`);
        throw new Error('updateStatus fail');
      }

      await ProjectHistoryService.create(req, updateProject.id);
      return res.ok(updateProject.toJSON());

    } catch (error) {
      console.error(error.stack);
      let msg = error.message;
      return res.serverError({
        msg
      });
    }
  },
};

module.exports = ProjectController;
