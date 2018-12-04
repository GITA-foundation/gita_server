/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  '*': ['passport'],

  AdvanceApiController: {
    getProjects: ['authToken'],
    getUsers: ['authToken'],
    updateProject: ['authToken'],
    updateUser: ['authToken'],
  },
  UserController: {
    apiGetMe: ['authToken'],
    apiUpdate: ['authToken'],
    apiResetPassword: ['authToken'],
    controlMembers: ['loginRequired', 'adminRequired'],
    password: ['loginRequired'],
    getMemberDetail: ['loginRequired', 'adminRequired'],
    updateMemberDetail: ['loginRequired', 'adminRequired'],
  },
  AuthAPIController: {
    callback: []
  },
  ProjectController: {
    apiGetMyProject: ['authToken', 'verifiedUserRequired'],
    apiCreate: ['authToken', 'verifiedUserRequired'],
    apiCreateComment: ['authToken'],
    apiUpdate: ['authToken', 'verifiedUserRequired'],
  },
  ProjectHistoryController: [],
  FormController: {
    showView: ['loginRequired', 'adminRequired'],
    apiUpdate: ['loginRequired'],
  }
};
