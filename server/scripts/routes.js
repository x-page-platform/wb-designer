const routerArr = require('../config/router');
const Application = require('../lib/application');

new Application(routerArr).routes();