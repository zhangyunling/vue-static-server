/**
 * @desc 系统环境变量相关工具
 * @author zhangyunling
 */

const NODE_ENV = process.env.NODE_ENV;

const evn = {
	// 是否为线上环境
	isPro: NODE_ENV === 'production',
};

module.exports = evn;