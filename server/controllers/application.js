const BaseController = require('../lib/base_controller');
const JWTService = require('../services/jwt');

class ApplicationController extends BaseController {
  async _before_filters() {
    try {
      let userInfo = await new JWTService(this.ctx).decode(
        this.ctx.cookies.get('sessionId')
      );
      if (!userInfo) this.ctx.redirect('/login');

      this.setGlobal({
        userInfo
      });
    } catch (e) {
      this.ctx.redirect('/login');
    }
    return true;
  }

  async _after_filters() {
    // this.ctx.body = this.ctx.body + ' append from after';
  }
}

module.exports = ApplicationController;
