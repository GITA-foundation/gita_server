/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

const getCORS = (str) => {
  const [controller, action] = str.split('.');
  return { controller, action, cors: true };
}

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` (or `views/homepage.pug`, *
   * etc. depending on your default view engine) your home page.              *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/
  //## for Public (no need to register)
  'GET /api/node/list': 'UserController.getNodeList',
  'GET /api/project/list': 'ProjectController.apiGetList',
  'GET /api/project/:identity': 'ProjectController.apiGetOne',
  'POST /api/faq/forms': 'FAQController.apiCreateForm',

  //## for Client
  'GET /api/project/one': 'ProjectController.apiGetMyProject',
  'GET /api/project/schema': 'FormController.apiGetSchema',

  'GET /api/project/:identity/history/:historyId': 'ProjectHistoryController.apiGetOne',
  'GET /api/project/:identity/history': 'ProjectHistoryController.apiGetList',

  'GET /api/project/:identity/verifiedEmails': 'ProjectMentionedPersonController.apiGetVerifiedEmail',
  'GET /api/project/verified': 'ProjectMentionedPersonController.verified',

  'GET /api/project/:identity/comment': 'ProjectController.apiGetCommentList',
  'POST /api/project/:identity/comment': 'ProjectController.apiCreateComment',

  // if supernode/node verified user than system will auto-create for user
  // 'POST /api/project': 'ProjectController.apiCreate',
  'PUT /api/project/:identity': 'ProjectController.apiUpdate',

  'POST /api/image/upload': getCORS('ImageController.upload'),
  'POST /api/file/upload': getCORS('FileController.upload'),

  'GET /api/me': getCORS('UserController.apiGetMe'),
  'PUT /api/me': getCORS('UserController.apiUpdate'),
  'POST /api/forgetRequest': getCORS('UserController.apiForgetRequest'),
  'POST /api/resetPassword': getCORS('UserController.apiResetPassword'),

  // === api auth ===
  'GET /api/logout': getCORS('AuthAPIController.logout'),
  'POST /api/auth/local': getCORS('AuthAPIController.callback'),
  'POST /api/auth/local/:action': getCORS('AuthAPIController.callback'),
  'GET /api/auth/:provider': getCORS('AuthAPIController.provider'),
  'GET /api/auth/:provider/callback': getCORS('AuthAPIController.callback'),
  '/api/auth/:provider/:action': getCORS('AuthAPIController.callback'),

  //### For Client supernode / node
  'GET /advance-api/projects': 'AdvanceApiController.getProjects',
  'GET /advance-api/users': 'AdvanceApiController.getUsers',
  'PUT /advance-api/projects/:identity': 'AdvanceApiController.updateProject',
  'PUT /advance-api/users/:id': 'AdvanceApiController.updateUser',

  //## for Backend Admin
  'GET /admin/': 'AuthController.admin',
  'GET /admin/login': 'UserController.controlLogin',
  'GET /admin/members': 'UserController.controlMembers',
  'PUT /admin/member-detail/:id': 'UserController.updateMemberDetail',
  'GET /admin/member-detail/:id': 'UserController.getMemberDetail',
  'GET /admin/password': 'UserController.password',
  'POST /admin/password': 'UserController.password',
  'GET /admin/schema': 'FormController.showView',
  'POST /api/admin/schema/update': 'FormController.apiUpdate',
  'GET /admin/faq': 'FAQController.adminFormList',
  'PUT /admin/project/verify/:identity': 'ProjectController.verify',
  'PUT /admin/project/unverify/:identity': 'ProjectController.unverify',
  'PUT /admin/project/status/:identity': 'ProjectController.updateStatus',
  'DELETE /api/user/:id': 'UserController.delete',

  // === auth login and register and logout ===
  'POST /auth/local': 'AuthController.callback',
  'POST /auth/local/:action': 'AuthController.callback',
  'GET /logout': 'AuthController.logout',

  /***************************************************************************
   *                                                                          *
   * Custom routes here...                                                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the custom routes above, it   *
   * is matched against Sails route blueprints. See `config/blueprints.js`    *
   * for configuration options and examples.                                  *
   *                                                                          *
   ***************************************************************************/
};
