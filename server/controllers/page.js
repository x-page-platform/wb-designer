const BaseController = require('../lib/base_controller');

class PageController extends BaseController {
  // async before_filters() {
  //   if (['index'].includes(this.action)) {
  //     this.ctx.body = '403....by filter';
  //     return false;
  //   }
  //   return true;
  // }
  //
  // async after_filters() {
  //   this.ctx.body = this.ctx.body + ' append from after';
  // }

  async index() {
    this.ctx.body = 'index all';
  }

  async show() {
    this.ctx.body = 'show 12313';
  }
}



module.exports = PageController;
