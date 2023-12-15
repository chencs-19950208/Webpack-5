module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        // 设置兼容浏览器版本
        "target": {
          "chrome": 35,
          "ie": 9,
        },
        "useBuiltIns": 'usage', // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
        "corejs": 3 // 配置使用core-js使用的版本
      },
      "@babel/preset-react",
      "@babel/preset-typescript"
    ]
  ]
}