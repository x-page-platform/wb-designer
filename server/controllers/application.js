const BaseController = require('../lib/base_controller');

class ApplicationController extends BaseController {
  async global() {
    return {
      user: {
        name: 'lh'
      }
    }
  }
  async before_filters() {
    if (['index'].includes(this.action)) {
      this.ctx.body = '403....by filter';
      return false;
    }
    return true;
  }

  async after_filters() {
    this.ctx.body = this.ctx.body + ' append from after';
  }

}

module.exports = ApplicationController;
