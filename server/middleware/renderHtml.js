/**
 * @desc vue-server-renderer的转换中心
 * @author zhangyunling
 */

// 系统模块
const fs = require('fs');
const { createBundleRenderer } = require('vue-server-renderer');

// 工具
const tools = require('../utils/tools.js');
// 配置文件；
const config = require(tools.resolve('server/config/index.js'));

// 转换使用的模板和JSON
const tmpHtml = fs.readFileSync(config.tmpDir, 'utf-8');
const serverBundle = require(config.bundle);
const clientManifest = require(config.manifest);

// 时间戳
let _startSecs = Date.now();


const renderer = (data) => {
	return new Promise((resolve, reject) => {
		// 如果没有这两个文件，不做任何处理
		if (!serverBundle || !clientManifest) {
			reject('error: 缺少vue-ssr-server-bundle.json或者vue-ssr-client-manifest.json');
		  return;
		}

		// 如果data不是一个有效的对象，则直接抛错
		if (!data || (typeof data !== 'object')) {
			reject('error: 传入的data不是一个有效的对象；');
			return;
		}

		_startSecs = Date.now();

		const context = {
			title: data.title,
    	url: '/' + (data.path || ''),
    	data: data,
		};

		createBundleRenderer(serverBundle, {
	    template: tmpHtml,
	    clientManifest: clientManifest
	  }).renderToString(context, (err, html) => {
	    console.log('静态化耗费时间：'+(Date.now() - _startSecs)+'ms');

	    if (err) {
	    	reject(err);
	    } else {
	    	resolve(html);
	    }
	  });
	}) 
}


module.exports = renderer;
