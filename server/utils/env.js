/**
 * @desc 系统环境变量相关工具
 * @author zhangyunling
 */

const NODE_ENV = process.env.NODE_ENV;

const envEnum = {
	'local': 'local',
	'dev': 'dev',
	'pro': 'pro'
};

const evn = {
	// 环境支持的枚举值；
	evns: envEnum,

	// 当前环境
	env: NODE_ENV,

	// 本地开发环境
	isLocal: NODE_ENV === envEnum.local,

	// 测试环境
	isDev: NODE_ENV === envEnum.dev,

	// 线上环境
	isPro: NODE_ENV === envEnum.pro,
};

module.exports = evn;