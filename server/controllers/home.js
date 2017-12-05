const ApplicationController = require('./application');

module.exports = class HomeController extends ApplicationController {
  async index() {
    this.renderHTML();
  }
};
