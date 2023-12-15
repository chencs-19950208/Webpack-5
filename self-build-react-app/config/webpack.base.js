// webpack 基础配置
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

console.log(process.env.NODE_ENV, 'NODE_ENV');
console.log(process.env.BASE_ENV, 'BASE_ENV');

module.exports = {
  entry: path.join(__dirname, '../src/index.tsx'), // 编译的入口文件
  // 打包的出口文件
  output: {
    filename: 'js/[name].js', // 每个文件输出js的名称
    path: path.join(__dirname, '../dist'), // 打包结果输出路径
    clean: true, // webpack4 需要配置clear-webpack-plugin, webpack5内置了
    publicPath: '/', // 打包之后公共文件前缀路径
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // 匹配 ts tsx 类型文件
        use: 'babel-loader'
      }, 
      {
        test: /.(js|jsx)$/,
        use: 'babel-loader'
      },
      {
        test: /\.(css|less)$/, // 匹配css less文件
        use: [
          'style-loader', 
          'css-loader', 
          // 新增css3处理，主要针对低版本浏览器兼容问题，自动添加前缀
          'postcss-loader',
          'less-loader'
        ] // 从右往左执行，先解析css，然后再通过style-loader, 注入到模板中
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'], // 配置之后，这几种文件类型不需要带后缀
  },
  plugins: [
    // 打包资源注入模板
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'), // 取public 的模板文件
      inject: true, // 自动注入静态资源
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
    })
  ],
}