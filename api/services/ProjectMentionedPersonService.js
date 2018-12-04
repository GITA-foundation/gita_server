import { clearEmptyPersonData, sendMentionedPersonVerifiedLetter } from '../utils/project';

const defaultModelDataObj = {
  biography_team: [],
  biography_advisor: [],
  biography_developer: [],
  advisor_role: [],
  marketing_partnership: []
};


const filterInsertAndDeleteData = (projectId, modelName, formData, modelDataObj) => {
  const existModalData = modelDataObj[modelName];
  const preInsertData = clearEmptyPersonData(formData, modelName, projectId);
  return {
    // differenceBy(A, B) => 取出 A 比 B 多的
    insertPerson: _.differenceBy(preInsertData, existModalData, 'email'),
    deletePersonIds:  _.differenceBy(existModalData, preInsertData, 'email').map((d) => d.id)
  };
}

module.exports = {
  defaultModelDataObj,
  createMentionedPerson: async ({ formData, projectId, identity, user }) => {
    try {

      // prepare send email and add link to mentioned person
      const allMentionedPerson = [
        ...clearEmptyPersonData(formData, "biography_team", projectId),
        ...clearEmptyPersonData(formData, "biography_advisor", projectId),
        ...clearEmptyPersonData(formData, "biography_developer", projectId),
        ...clearEmptyPersonData(formData, "advisor_role", projectId),
        ...clearEmptyPersonData(formData, "marketing_partnership", projectId),
      ];

      const sendEmailRequestPromises = allMentionedPerson.map((person) =>
        sendMentionedPersonVerifiedLetter(identity, user, person, formData));

      await Promise.all([
        ...sendEmailRequestPromises,
        db.ProjectMentionedPerson.bulkCreate(allMentionedPerson),
      ])
      return { ok: true };
    } catch (e) {
      console.warn(e);
      return { ok: false };
    }
  },
  updateMentionedPerson: async ({ formData, projectId, user, identity }) => {
    try {
      const modelDataObj = await db.ProjectMentionedPerson.findAll({
        attributes: ['id', 'modelName', 'name', 'email', 'status'],
        where: {
          ProjectId: projectId,
        }
      }).reduce((r, personModal) => {
        const person = personModal.dataValues;
        return {
          ...r,
          [person.modelName]: [...r[person.modelName], person]
        }
      }, defaultModelDataObj);

      const { insertPerson, deletePersonIds } = Object.keys(defaultModelDataObj).reduce((r, modelName) => {
        const filterResult = filterInsertAndDeleteData(projectId, modelName, formData, modelDataObj);
        return {
          insertPerson: [...r.insertPerson, ...filterResult.insertPerson],
          deletePersonIds: [ ...r.deletePersonIds, ...filterResult.deletePersonIds],
        }
      }, { insertPerson: [], deletePersonIds: []});

      const sendEmailRequestPromises = insertPerson.map((person) =>
        sendMentionedPersonVerifiedLetter(identity, user, person, formData));

      await Promise.all([
        ...sendEmailRequestPromises,
        db.ProjectMentionedPerson.bulkCreate(insertPerson),
        db.ProjectMentionedPerson.destroy({ where: { ProjectId: projectId, id: { $in: deletePersonIds }}}),
      ])
      return { ok: true };
    } catch (e) {
      console.warn(e);
      return { ok: false };
    }
  },
}
