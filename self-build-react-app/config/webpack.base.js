// webpack 基础配置
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 标识是否是开发环境
const isDEV = process.env.NODE_ENV === 'development';

console.log(process.env.NODE_ENV, 'NODE_ENV');
console.log(process.env.BASE_ENV, 'BASE_ENV');

module.exports = {
  entry: path.join(__dirname, '../src/index.tsx'), // 编译的入口文件
  // 打包的出口文件
  output: {
    filename: 'js/[name].[chunkhash:8].js', // 每个文件输出js的名称
    path: path.join(__dirname, '../dist'), // 打包结果输出路径
    clean: true, // webpack4 需要配置clear-webpack-plugin, webpack5内置了
    publicPath: '/', // 打包之后公共文件前缀路径
  },
  cache: {
    /**
     * 在webpack5之前做缓存是使用babel-loader缓存解决js的解析结果,cache-loader缓存css等资源的解析结果,
     * 还有模块缓存插件hard-source-webpack-plugin,配置好缓存后第二次打包,
     * 通过对文件做哈希对比来验证文件前后是否一致,如果一致则采用上一次的缓存,可以极大地节省时间。
     */
    type: 'filesystem',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // 匹配 ts tsx 类型文件
        include: [path.resolve(__dirname, '../src')], // 只针对src 下的ts、tsx, 进行loader 解析
        use: 'babel-loader'
      }, 
      {
        test: /.(js|jsx)$/,
        include: [path.resolve(__dirname, '../src')],
        use: {
          loader: 'babel-loader',
          options: {
            sourceType: 'unambiguous'
          },
        }

      },
      {
        test: /\.css$/, // 匹配css less文件
        include: [path.resolve(__dirname, '../src')],
        use: [
          isDEV ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发模式使用style-loader, 打包的时候抽离css 
          { // 支持 css 模块化
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: "[local]_[hash:base64:5]",
                localIdentContext: path.resolve(__dirname, "src"),
              },
            }
          },
          // 新增css3处理，主要针对低版本浏览器兼容问题，自动添加前缀
          'postcss-loader',
        ] // 从右往左执行，先解析css，然后再通过style-loader, 注入到模板中
      },
      {
        test: /\.less$/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          isDEV ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发模式使用style-loader, 打包的时候抽离css
          { // 支持模块化
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: "[local]_[hash:base64:5]",
                localIdentContext: path.resolve(__dirname, "src"),
              },
            },
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        // 图片资源的处理
        test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: 'asset', // type 选择 asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于 10kb转 base64
          },
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]', // 文件输出目录和命名
        },
      },
      {
        // 字体图标文件
        test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: 'asset', 
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: 'static/fonts/[name].[contenthash:8][ext]',
        },
      },
      {
        // 媒体文件
        test: /.(mp4|wwebm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体资源文件
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
        generator: {
          filename: 'static/media/[name].[contenthash:8][ext]'
        },
      }
    ],
  },
  resolve: {
    alias: { // 别名设置
      '@': path.join(__dirname, '../src'),
    },
    modules: [path.resolve(__dirname, '../node_modules')], // 查找第三方模块，只在node_modules 中寻找
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