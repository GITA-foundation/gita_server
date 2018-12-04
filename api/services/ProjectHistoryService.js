module.exports = {
  create: async (req, projectId) => {
    try {
      const user = UserService.getLoginUser(req);
      const project = await db.Project.findByPk(projectId);
      const {
        title, token, logo, items, status,
        isVerified, isGitaStandard, percent, UserId, AdminUserId
      } = project.dataValues;

      const payload = {
        title,
        token,
        logo,
        items,
        status,
        isVerified,
        isGitaStandard,
        percent,
        UserId,
        AdminUserId,
        ModifyUserId: user.id,
        ProjectId: project.id,
        FormSchemaId: sails.config.schemaVersion || 1,
      }
      const result = await db.ProjectHistory.create(payload);
      return result;
    } catch (e) {
      console.warn(e);
      return {};
    }
  },
}
