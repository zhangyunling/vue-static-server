
const {
	app,
	route,
	config,
	initStaticServer
} = require('./index.js');

// 静态化服务鉴权，合法性判定
app.use(route[config.type](`/${config.path}`, async (ctx, next) => {
  next();
}));


// 静态化服务主处理函数；
initStaticServer();
