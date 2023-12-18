/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const ESlintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: false,
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },

  // 模块处理规则
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-typescript"]
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          (process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader), 
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                // 添加 autoprefixer 插件
                plugins: [require('autoprefixer')]
              }
            }
          }
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ],
  },

  // 添加eslint-webpack-plugin 插件实例
  plugins: [
    new ESlintPlugin({
      extensions: ['.js', '.ts']
    }),
    new MiniCssExtractPlugin(),
    new HTMLWebpackPlugin()
  ],
};