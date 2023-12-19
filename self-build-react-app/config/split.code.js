// 代码分割规则
module.exports = {
  splitChunks: {
    cacheGroups: {
      vendors: { // 依赖处理, 提取依赖
        test: /node_modules/, // 只匹配node_modules 模块
        name: 'vendors', // 提取出来的文件名
        minChunks: 1, // 只要使用过一次就提取
        chunks: 'initial', // 只提取初始化就能获取到，不管异步
        minSize: 0, // 提取代码体积大于0 就提取
        priority: 1, // 提取优先级为1
      },

      commons: { // 提取页面公共代码
        name: 'commons', // 提取的公共代码文件名叫commons 
        minChunks: 2, // 使用两次就提取
        chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
        minSize: 0, // 提取代码体积大于0，就提取
      },
    },
  },
}