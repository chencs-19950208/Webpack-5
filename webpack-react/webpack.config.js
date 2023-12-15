
module.exports = {
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-react"]
        }
      }
    ]
  },
}