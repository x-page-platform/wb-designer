const ApplicationController = require('./application');

module.exports = class HealthController extends ApplicationController {
  async memory() {
    this.ctx.body = 'full of memory';
  }

  async ping() {
    this.render({
      html: {
        current: Date.now()
      },
      json: {
        current: Date.now()
      }
    });
  }
};
