var self = module.exports = {
  apiGetList: async(req, res) => {
    try {
      const { identity } = req.params;
      const findProject = await ProjectService.findByIndetity(identity);
      if (!findProject) {
        throw new Error('找不到 Project！');
      }

      const result = await db.ProjectHistory.findAll({
        attributes: [
          'id', 'title', 'token', 'logo', 'percent', 'status', 'isVerified', 'createdAt', 'ProjectId'
        ],
        where: {
          ProjectId: findProject.id,
        },
        order: [ [ 'createdAt', 'DESC' ]],
        include: [{
          model: db.User,
          as: 'ModifyUser',
          attributes: ['fullName']
        }]
      });

      const formatedResult = _.map(result, (history) => ({
        ...history.dataValues,
        createdAt: sails.moment(history.dataValues.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      }));
      return res.json(formatedResult);

    } catch (error) {
      sails.log.error(error.stack);
      let msg = error.message;
      return res.serverError({
        msg
      });
    }
  },
  apiGetOne: async(req, res) => {
    const { identity, historyId, } = req.params;
    console.log(identity, historyId, '===');
    if (historyId.length < 1) {
      return res.serverError('invalid historyId');
    }

    const findProject = await ProjectService.findByIndetity(identity);
    if (!findProject) {
      throw new Error('找不到 Project！');
    }

    const historyQuery = historyId === 'latest' ? {} : { id: historyId };

    try {
      let result = await db.ProjectHistory.findOne({
        attributes: [
          'id', 'title', 'token', 'logo', 'items', 'status', 'createdAt'
        ],
        where: {
          ...historyQuery,
          ProjectId: findProject.id,
        },
        order: [ [ 'createdAt', 'DESC' ]],
        include: [{
          model: db.User,
          as: 'ModifyUser',
          attributes: ['fullName']
        }]
      });

      const formatedResult = {
        ...result.dataValues,
        createdAt: sails.moment(result.dataValues.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      }
      return res.json(formatedResult);
    } catch (e) {
      return res.serverError(e);
    }
  },

}
