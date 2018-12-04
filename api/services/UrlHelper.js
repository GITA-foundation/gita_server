/**
 * UrlHelper
 */
var self = module.exports = {
  /**
   * Generate
   */
  resolve: (path, absolute = false) => {
    let result =
      absolute
        ? sails.config.domain || process.env.domain || 'http://localhost:1337/'
        : '';

    if (result.slice(1) != '/' && path.indexOf('/') !== 0) {
      result += '/';
    }

    result += path;

    return result;
  },
  resolveForApp: (path, absolute = false) => {
    let result =
      absolute
        ? sails.config.appDomain || process.env.appDomain || 'http://localhost:3000/'
        : '';

    if (result.slice(1) != '/' && path.indexOf('/') !== 0) {
      result += '/';
    }

    result += path;

    return result;
  }
};
