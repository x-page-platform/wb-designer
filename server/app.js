const Koa = require('koa');
const StaticServe = require('koa-static');
const Mount = require('koa-mount');
const Bootstrap = require('./lib/bootstrap');
const path = require('path');

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e)
    ctx.status = e.status || 500;
    ctx.body = e.message;
  }
});

app.use(Mount('/static/', StaticServe(path.resolve(__dirname, '../dist'))));

app.use(Bootstrap());

app.on('error', (err, ctx) => {
  console.log(err);
});

app.listen(9999, () => {
  console.log('listen 9999');
});
