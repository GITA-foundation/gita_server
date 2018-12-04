
var self = module.exports = {
  defaultLimitValue: async (req) => {
    const defaultLimitValue = 20;
    return defaultLimitValue;
  },
  limit: async (req) => {
    return parseInt(req.param('limit', await self.defaultLimitValue(req)), 10);
  },
  offset: async (req) => {
    return await self.page(req) * await self.limit(req);
  },
  page: async (req) => {
    return parseInt(req.param('page', 0), 10);
  },
  limitWithSession: async (req) => {
    let key = await sessionKey(req, 'limit');

    sails.log.verbose('=== req.session[key] ===', req.session[key]);
    sails.log.verbose('=== key ===', key);
    return req.session[key] =
      parseInt(req.param('limit', req.session[key] || self.defaultLimitValue(req)), 10);
  },
  offsetWithSession: async (req) => {
    return await self.pageWithSession(req) * await self.limitWithSession(req);
  },
  pageWithSession: async (req) => {
    let key = await sessionKey(req, 'page');
    return req.session[key] =
      parseInt(req.param('page', req.session[key] || 0), 10);
  },
  sessionKey: async (req, postfix) => {
    return req.options.controller + '.' + req.options.action + '.' + postfix;
  }
};
