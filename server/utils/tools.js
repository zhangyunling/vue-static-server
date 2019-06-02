/**
 * @desc 快捷操作相关的功能
 * @author zhangyunling
 */

const path = require('path');

// 跟路径
const _root = path.resolve(__dirname, '../../');

const tools = {
	// 获取文件绝对路径
	resolve: (_path) => {
		return path.resolve(_root, _path);
	},
};

module.exports = tools;