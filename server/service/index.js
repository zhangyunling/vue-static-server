/**
 * @desc 服务接收中心
 * @author zhangyunling
 */

const Koa = require('koa2');
const route = require('koa-route');
const bodyParser = require('koa-bodyparser')
const app = new Koa();
const tools = require('../utils/tools.js');

// 配置文件；
const config = require(tools.resolve('server/config/index.js'));
// 是否为本地环境；
const isLocal = require(tools.resolve('server/utils/env.js')).isLocal;
// 渲染出HTML的代码逻辑；
const renderHtml = require(tools.resolve('server/middleware/renderHtml.js'))

// 支持请求的类型
const routePath = `/${config.path}`;

// 根据是否为线上环境，分别执行不同的脚本
const middleware = require('../middleware/index.js');

// 渲染中间件的函数
function _rendMiddleWare(item) {
	app.use(route.post(routePath, item));
}

// 用于方便接收post请求；
app.use(bodyParser())

// 最前面的一个中间件，把所有的数据，挂载到config上；
app.use(route.post(routePath, async (ctx, next) => {
  // 把所有的配置信息，挂载到ctx上
  // 方便后面的中间件使用；
  ctx.staticInfo = {
  	config: config,
  	data: ctx.request.body,
  	html: '',
  };

  next();
}));

// 渲染before的中间件；
middleware.before.forEach(_rendMiddleWare);

// 根据前置的数据，做静态化输出；
app.use(route.post(routePath, async (ctx, next) => {
  // 把信息，根据staticInfo.data的信息；
  // 生成html，并且保存到staticInfo对象上；
  ctx.staticInfo.html = await renderHtml(ctx.staticInfo);
  next();
}));

// 渲染after的中间件；
middleware.after.forEach(_rendMiddleWare);

// 如果执行到最后，那么把最后的返回数据，直接返回给接口
app.use(route.post(routePath, async (ctx) => {
  ctx.body = ctx.staticInfo.html;
  console.log(ctx);
  // ctx.res.send(ctx.staticInfo.html);
}));

// 错误处理
app.on('error', err => {
	console.log(err);
  // log.error('server error', err)
});

// 本地环境时，直接一段特殊的代码
if (isLocal){
	middleware.proxyDemo(app, route, routePath);
}
app.listen(3000);

module.exports = {
	app,
	route,
	config
};