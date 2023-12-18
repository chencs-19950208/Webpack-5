// 线上环境配置
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
  mode: 'production', // 生产环境，会开启 tree-shaking 和压缩代码，以及其他代码优化
  plugins: [
    // 复制文件插件
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'), // 复制public 下文件
          to: path.resolve(__dirname, '../dist'), // 复制dist目录下文件
          filter: source => {
            return !source.includes('index.html') // 忽略 index.html 文件
          }
        }
      ]
    })
  ]
})