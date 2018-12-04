var self = module.exports = {
  apiGetVerifiedEmail: async(req, res) => {
    try {
      const { identity } = req.params;

      const findProject = await ProjectService.findByIndetity(identity);

      if (!findProject) {
        throw new Error('找不到 Project！');
      }

      const result = await db.ProjectMentionedPerson.findAll({
        attributes: ['email', 'modelName'],
        where: {
          ProjectId: findProject.id,
          status: 'VERIFIED'
        }
      }).reduce((r, person) => ({
        ...r,
        [person.modelName]: [...r[person.modelName], person.email]
      }), ProjectMentionedPersonService.defaultModelDataObj)
      return res.json(result);
    } catch (error) {
      sails.log.error(error.stack);
      let msg = error.message;
      return res.serverError({ msg });
    }
  },
  verified: async(req, res) => {
    const { token } = req.query;
    try {
      const tokenData = await TokenAuth.verifyToken(token);
      console.log('verified tokenData >>',tokenData);
      const { identity, name, email, modelName } = tokenData;

      const findProject = await ProjectService.findByIndetity(identity);

      if (!findProject) {
        throw new Error('找不到 Project！');
      }

      let person = await db.ProjectMentionedPerson.findOne({
        attributes: [
          'id', 'status'
        ],
        where: {
          email,
          modelName,
          ProjectId: findProject.id,
          status: 'PENDING'
        }
      });

      if (!person) return res.json({ ok: false, msg: 'Invalid Token or Your already verified' });

      person.status = 'VERIFIED';
      const result = await person.save();
      return res.json({ ok: true, result, msg: 'Successful verification!' });
    } catch (e) {
      console.log('verified failed >>>', e);
      return res.json({ ok: false, msg: 'opps, try again please or contact Gita admin' });
    }
  }
}
