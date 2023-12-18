// 开发环境
const isDEV = process.env.NODE_ENV === 'development';

module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        // 设置兼容浏览器版本
        "targets": {
          "chrome": 35,
          "ie": 9,
        },
        "useBuiltIns": 'usage', // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
        "corejs": 3 // 配置使用core-js使用的版本
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    isDEV && require.resolve('react-refresh/babel'), // 开发模式，开启react 热更新组件
  ].filter(Boolean) // 过滤空值
}