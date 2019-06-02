/**
 * @desc vue静态化服务；
 * @author zhangyunling
 */

const env = require('./utils/env.js');

// 根据是否为线上环境，分别执行不同的脚本
if (env.isPro) {
  require('./service/pro.js');
} else {
  require('./service/dev.js');
}