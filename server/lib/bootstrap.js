const routerArr = require('../config/router');
const Application = require('./application');

module.exports = opts => {
  const app = new Application(routerArr);

  return app.run();
};
