const http = require('http');
const querystring = require('querystring');

const tools = require('../utils/tools.js');
const mock = require(tools.resolve('server/json/mock.json'));
const postData = querystring.stringify(mock);

const reqOption = {
  host : '127.0.0.1',              //测试
  port : 3000,                     //端口     
  path : '',                       //主路径，不变的
  method : 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};
const getTestInfo = () => {
  return new Promise((resolve,reject) => {
    let req = http.request(reqOption, function(res) {
      let str = '';

      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        str += chunk;
      });
      
      res.on('end', function () {
        resolve(str);
      });
    }).on('error', function(e) {
      reject(e.message);
    });

    req.write(postData);
    req.end();
  });
}

const devService = {
  // 端口号
  port: reqOption.port,

  // 静态化渲染前，执行的中间件
  before: [],

  // 静态化之后，执行的中间件；
  after: [],

  // 本地时，要使用get请求，来触发默认的post请求；
  proxyDemo: function (app, route, routePath) {
    reqOption.path = routePath;

    app.use(route.get('/local-create', async (ctx) => {
      ctx.body = await getTestInfo();
    }));

    app.use(route.get('/local-create2', async (ctx) => {
      ctx.body = `<form method = 'post' action = '/vue-static-create'>
  <input name = "title" value = '这里是标题' />
  <button type = "submit">提交</button>
</form>`;
    }));
  }
};

module.exports = devService;
