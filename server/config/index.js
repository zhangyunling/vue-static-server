/**
 * @desc 基础配置信息
 * @author zhangyunling
 */

const env = require('../utils/env.js');


const config = {
	// 接收请求的地址
	path: 'vue-static-create',

	// 接收请求的类型
	// 线上接收post请求，本地开发接收get请求；
	type: env.isPro ? 'post' : 'get',
};

module.exports = config;