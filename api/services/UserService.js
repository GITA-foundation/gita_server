import fs from 'fs';
import util from "util";

module.exports = {
  isAdmin: (role) => {
    return ['admin'].includes(role);
  },
  getLoginState: (req) => {
    if (req.session.authenticated) {
      return true;
    } else {
      return false;
    }
  },
  getLoginUser: (req) => {
    if (req.session.passport != undefined && req.session.passport.user) {
      return req.session.passport.user;
    }

    if (req.user)
      return req.user;

    return null;
  },
  create: async (user) => {
    let newUser = await db.User.create(user);
    if (newUser.NodeId) {
      let nodeUser = await db.User.findOne({ where: { id: newUser.NodeId }});
      newUser.nodeName = nodeUser.fullName;
    }
    return newUser;
  },

  findAll: async(query = {}) => {
    let users = await db.User.findAll(query);
    return users;
  },

  findOne: async(id) => {
    let user = await db.User.findByPk(id);
    return user;
  },

  findOneByEmail: async(email) => {
    let user = await db.User.findOne({
      where: {
        email: email
      },
    });
    return user;
  },
  updateUser: async (userId, param) => {
    let user = await db.User.findByPk(userId);
    user.type = param.type;
    user.phone = param.phone;
    user.comment = param.comment;
    user.isVerified = param.isVerified === 'true' ? true : false;
    user.role = param.role;
    await user.save();
  },

  getMembersReport: async (req, editableRoles = []) => {
    const addUserQuery = function (queryData, tableField) {
      if (queryData[tableField] && queryData[tableField] !== '' ) {
        this[tableField] = {
          'like': '%' + queryData[tableField] + '%'
        };
      }
    }

    try {
      sails.log.verbose('getMembersReport query', req.query);

      let query = req.query;
      let queryObj = {};

      addUserQuery.bind(queryObj, query, 'username')();
      addUserQuery.bind(queryObj, query, 'fullName')();
      addUserQuery.bind(queryObj, query, 'phone')();
      addUserQuery.bind(queryObj, query, 'email')();

      if (query.type && query.type !== '') {
        queryObj.type = query.type;
      }

      if (query.role && query.role !== '') {
        queryObj.role = query.role;
      } else {
        queryObj.role = { $in: editableRoles }
      }

      const userInfo = UserService.getLoginUser(req);
      if (userInfo.role === 'node') {
        queryObj.NodeId = userInfo.id;
      }
      let page = {};
      let offset = {};
      let limit = {};
      let members = {};

      if (query.viewType === 'report') {
        members = await db.User.findAndCountAll({
          where: queryObj,
          order: [['id', 'DESC']]
        });
      } else {
        offset = await pagination.offset(req);
        limit = await pagination.limit(req);
        members = await db.User.findAndCountAll({
          where: queryObj,
          offset: offset,
          limit: limit,
          order: [['id', 'DESC']]
        });
      }

      for (var i = 0; i < members.rows.length; i++) {
        let member = members.rows[i];

        // 後台會員資料備註最多顯示兩行即可
        if (member.comment && member.comment.length > 20) {
          member.comment = member.comment.substring(0, 20) + '...';
        }
        members.rows[i] = member;

      }

      return {members, query};
    } catch (error) {
      sails.log.error(error);
      return false;
    }
  }
};
