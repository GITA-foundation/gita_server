module.exports = {
  findByIndetity: async (identity) => {
    try {
      const project = await db.Project.findOne({ where: { identity } });
      return project;
    } catch (e) {
      console.log('====findByIndetity====>', e);
      return null;
    }
  },
  findOneByUser: async (UserId) => {
    try {
      const project = await db.Project.findOne({ where: { UserId } });
      return project;
    } catch (e) {
      console.log('====findByIndetity====>', e);
      return null;
    }
  },
}
