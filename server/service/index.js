/**
 * @desc 服务接收中心
 * @author zhangyunling
 */

const Koa = require('koa');
const route = require('koa-route');
const app = new Koa();
const config = require('../config/index.js');

// 静态化服务鉴权，合法性判定
app.use(route[config.type](`/${config.path}`, async (ctx, next) => {
  // 把所有的配置信息，挂载到ctx上
  // 方便后面的中间件使用；
  ctx.config = config;
  next();
}));

// 静态化的主函数
const staticServer = async (ctx) => {
	ctx.body = 'Hello World';
  console.log(2);
};
const initStaticServer = () => {
	app.use(route[config.type](`/${config.path}`, staticServer));
}

// 错误处理
app.on('error', err => {
	console.log(err);
  // log.error('server error', err)
});

app.listen(3000);

module.exports = {
	app,
	route,
	config,
	initStaticServer
};