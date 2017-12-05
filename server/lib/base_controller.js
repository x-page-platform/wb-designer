const Ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const { isHtml, isJson, loadCss, loadJs } = require('./util');

class BaseController {
  constructor(ctx, name, action, format) {
    this.ctx = ctx;
    this.name = name;
    this.action = action;
    this.format = format;
  }

  async helper() {
    return {
      loadCss,
      loadJs
    };
  }

  async before_filters() {
    return true;
  }

  async global() {
    return {};
  }

  async after_filters() {
    return true;
  }

  async render(obj = {}) {
    let _obj = obj[this.format],
      tplPath = path.resolve(
        __dirname,
        `../views/${this.name}/${this.action}.${this.format}.ejs`
      ),
      tplContent;

    try {
      tplContent = fs.readFileSync(tplPath).toString();
    } catch (e) {
      this.ctx.throw(500, e.stack);
    }

    if (!tplContent) this.ctx.throw(500, `${tplPath} not found.`);

    let _content = Ejs.render(
      tplContent,
      isHtml(this.format)
        ? Object.assign(await this.global(), _obj, await this.helper())
        : Object.assign(await this.global(), _obj)
    );

    try {
      this.ctx.body = isJson(this.format) ? JSON.parse(_content) : _content;
    } catch (e) {
      this.ctx.throw(500, e.stack);
    }
  }

  async renderHTML(obj = {}) {
    let tplPath = path.resolve(
        __dirname,
        `../views/${this.name}/${this.action}.html.ejs`
      ),
      tplContent;

    try {
      tplContent = fs.readFileSync(tplPath).toString();
    } catch (e) {
      this.ctx.throw(500, e.stack);
    }

    if (!tplContent) this.ctx.throw(500, `${tplPath} not found.`);

    try {
      this.ctx.body = Ejs.render(
        tplContent,
        Object.assign(await this.global(), obj, await this.helper())
      );
    } catch (e) {
      this.ctx.status = 404;
      this.ctx.body = 'No Found';
    }
  }
}

BaseController._path = '';

module.exports = BaseController;
