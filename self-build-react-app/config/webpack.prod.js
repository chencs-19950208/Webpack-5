// 线上环境配置
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
  mode: 'production', // 生产环境，会开启 tree-shaking 和压缩代码，以及其他代码优化
})