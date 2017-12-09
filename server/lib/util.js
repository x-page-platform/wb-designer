const _ = require('lodash');
const config =
  require(`../config/environments/${process.env['NODE_ENV'] ||
    'development'}`) || {};

module.exports = {
  getConfig(key) {
    return config[key];
  },
  getController(entity) {
    return _.capitalize(_.camelCase(entity)) + 'Controller';
  },

  getService(entity) {
    return _.capitalize(_.camelCase(entity)) + 'Service';
  },

  getResponseFormat(ctx) {
    const DEFAULT_FORMAT = 'html';
    const LEGAL_FORMATS = ['html', 'json', 'xml'];

    let format = DEFAULT_FORMAT;
    let dotIndex = ctx.path.indexOf('.');
    if (dotIndex > -1) format = ctx.path.slice(dotIndex + 1);

    return LEGAL_FORMATS.includes(format) ? format : DEFAULT_FORMAT;
  },

  getLegalPath(path) {
    let dotIndex = path.indexOf('.');
    if (dotIndex > -1) path = path.slice(0, dotIndex);

    return path;
  },

  isHtml(format) {
    return format === 'html';
  },

  isJson(format) {
    return format === 'json';
  },

  loadJs(key) {
    let url = '';
    if (process.env === 'production') {
      url = `/static/build/js/${key}.js`;
    } else {
      url = `/static/local/js/${key}.js`;
    }

    return `<script src="${url}"></script>`;
  },

  loadCss(key) {
    let url = '';
    if (process.env === 'production') {
      url = `/static/build/css/${key}.css`;
    } else {
      url = `/static/local/css/${key}.css`;
    }

    return `<link rel="stylesheet" href="${url}">`;
  }
};
