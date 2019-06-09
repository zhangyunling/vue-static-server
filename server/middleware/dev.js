

// const tools = require('../utils/tools.js');

const devService = {
  // 端口号
  port: 3000,

  // 静态化渲染前，执行的中间件
  before: [
    // 本地开发，使用模拟的JSON来进行页面的渲染；
    async (ctx, next) => {
      // console.log('renderData', ctx.renderData);
      // console.log('config', ctx.config);
      next();
    },
  ],

  // 静态化之后，执行的中间件；
  after: []
};

module.exports = devService;
