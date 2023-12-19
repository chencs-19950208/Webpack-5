// 线上环境配置
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const globAll = require('glob-all');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const SplitChunks = require('./split.code');
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
    }),
    // 打包的时候，抽离css
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css', // 抽离css 输出目录以及名称
    }),

    // 打包时生成gzip文件
    new CompressionWebpackPlugin({
      test: /.(js|css)$/, // 只生成css, js 压缩文件
      filename: '[path][base].gz', // 文件命名
      algorithm: 'gzip', // 压缩方式，默认是gzip
      test: /.(js|css)$/, 
      threshold: 10240, // 只有大小大于该值的才会被压缩处理，默认是 10kb 
      minRatio: 0.8, // 压缩率， 默认是0.8
    })
  ],
  optimization: {
    minimizer: [
      // 压缩css
      new CssMinimizerWebpackPlugin(),

      // 清理css 
      new PurgeCSSPlugin({
        // 检测src下所有tsx文件和public下index.html中使用的类名和id和标签名称
        // 只打包这些文件中用到的样式
        paths: globAll.sync([
          `${path.join(__dirname, '../src')}/**/*.tsx`,
          path.join(__dirname, '../public/index.html')
        ]),
        safelist: {
          standard: [/^ant-/], // 过滤以ant-开头的类名，哪怕没用到也不删除
        }
      }),

      // 压缩js
      new TerserWebpackPlugin({
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            pure_funcs: ['console.log'], // 删除 console.log
          }
        },
      }),
    ],
    // 分割代码
    ...SplitChunks,
  },
})