// 开发模式配置
const path = require('path');
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
  mode: 'development', // 开发模式，打包速度更快，省去代码优化步骤
  devtool: 'eval-cheap-module-source-map', // 源码调试模式
  plugins: [
    new ReactRefreshWebpackPlugin()
  ],
  devServer: {
    port: 3000, // 服务端口号
    compress: false, // gzip压缩，开发环境不开启，提升热更新效率
    hot: true, // 开启热更新，后面说react 热替换具体配置
    historyApiFallback: true, // 结局history 模式下路由 404问题
    static: {
      directory: path.join(__dirname, '../public'), // 托管静态资源 public 文件
    },
  },
})