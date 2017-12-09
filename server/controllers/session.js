const BaseController = require('../lib/base_controller');

class SessionsController extends BaseController {
  async new() {
    this.renderHTML();
  }

  async destroy() {
    this.ctx.cookies.set('sessionId', '');
    this.ctx.redirect('/login');
  }
}

module.exports = SessionsController;
