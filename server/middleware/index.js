/**
 * @desc 根据环境，加载不同的中间件处理方法
 * @author zhangyunling
 */

// const tools = require('../utils/tools.js');
const env = require('../utils/env.js');
const wareName = env.evns[env.evn] || env.evns.local;

// 根据不同的环境，加载不同的组件；
const middleWare = require(`./${wareName}.js`);

module.exports = middleWare;

