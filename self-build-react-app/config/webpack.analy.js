/**
 * 可以使用speed-measure-webpack-plugin 来分析，打包构建具体耗时再哪里
 */
const prodConfig = require('./webpack.prod.js');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const smp = new SpeedMeasureWebpackPlugin(); // 实例化分析插件

module.exports = smp.wrap(merge(prodConfig, {
  plugins: [
    new BundleAnalyzerPlugin(), // 配置分析打包结果插件 
  ]
}));