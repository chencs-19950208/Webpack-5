import * as path from "path";
import * as ESlintPlugin from "eslint-webpack-plugin";

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
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-typescript']
          }
        }
      }
    ],
  },

  // 添加eslint-webpack-plugin 插件实例
  plugins: [new ESlintPlugin({
    extensions: ['.js', '.ts']
  })],
};