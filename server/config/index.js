/**
 * @desc 基础配置信息
 * @author zhangyunling
 */

const tools = require('../utils/tools.js');

// 基础配置信息
const _baseConfig = {
	// 接收请求的地址
	path: 'vue-static-create',

	// 监听的端口
	prot : 3000,

	// clinet 端JOSN路径
	manifest: tools.resolve('dist/config/json/vue-ssr-client-manifest.json'),

	// ssr 端的bundle的JSON路径
	bundle: tools.resolve('dist/config/json/vue-ssr-server-bundle.json'),

	// html的模板路径
	tmpDir: tools.resolve('dist/config/tmp/index.tmp.html'),
	
};

// 自定义的配置信息，同名的会覆盖_baseConfig的接口；
let supConfig = {};

try {
	supConfig = require(tools.resolve('dist/config/config.js'));
} catch (e){
	supConfig = {};
}

module.exports = Object.assign(_baseConfig, supConfig);
