## [帮作者推广下](https://s.juejin.cn/ds/jvsuxw8/)

## 借助babel + typescript + Eslint 构建 js工程环境
  [快速进入](https://juejin.cn/book/7115598540721618944/section/7116188153064456205)

  #### 思考： Webpack 为何会将 babel, TS, Eslint 集成
  1. 通过webpack管理控制整个项目代码编译构建流程，简化多个独立工具操作的工作
  2. 通过webpack进行编译流程控制，传递 module 工具的编译结果，即使终止编译出错的编译流程
  3. 通过webpack控制根据规则 rules 对特定类型文件进行使用特定工具进行编译工作

  看到别的同学给的通俗的解释：
  - webpack 就像一个流水线，Babel、TS、Eslint 都是流水线上工作单元。单独的工作单元可以进行工作并产生指定的工件，有的时候可以单独工作（类似单独，外包的活）。处理些半成品，但是如果想要将原材料加工成工业成品，就需要webpack 来统- 筹、协作，调配完成，在不同的生民周期调用不通的工作单元，快加工，检查产物等等，他们互相依赖，但又可以拆解单独使用


## 如何借助预处理器、PostCss 等构建现代 CSS 工程环境
  [快速进入](https://juejin.cn/book/7115598540721618944/section/7116186197730263054)

  1. 如何使用 css-loader、style-loader(不会修改源文件内容，只是注入一些运行时代码)、mini-css-extract-plugin 处理原生css文件
  2. 如何使用 Less/Sass/Stylus 预处理器
  3. 如何使用 PostCss

  (1) css-loader 该Loader 等价将css代码转化为 module.exports = `${css}` 的 js 代码，使得 webpack 可以像处理js代码一样，处理css依赖以及内容。
  (2) style-loader 将在产物中注入 runtime 代码，这些代码会将 css 内容注入到页面的 <style>, 使得样式生效。
  (3) mini-css-extract-plugin 插件会单独抽离到单独 .css 文件，通过link标签的方式插入到页面中。

  ```
    PS：当 Webpack 版本低于 5.0 时，请使用 extract-text-webpack-plugin 代替 mini-css-extract-plugin
  ```

  三种组件各司其职：css-loader 让 Webpack 能够正确理解 CSS 代码、分析资源依赖；style-loader、mini-css-extract-plugin 则通过适当方式将 CSS 插入到页面，对页面样式产生影响：

  1. 开发环境：使用 style-loader 将样式代码注入到页面 <style> 标签.
  2. 生产环境：使用 mini-css-extract-plugin 将样式代码抽离到单独产物文件，并以 <link> 标签方式引入到页面中

  ```
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
    };

    PS：注意保持 style-loader 在前，css-loader 在后
    相当于： style-loader(css-loader(css)) 链式调用
  ```

  mini-css-extract-plugin: 
    1.mini-css-extract-plugin 库同时提供 Loader、Plugin 组件，需要同时使用
    2.mini-css-extract-plugin 不能与 style-loader 混用，否则报错，所以上述示例中第 9 行需要判断 process.env.NODE_ENV 环境变量决定使用那个 Loader
    3.mini-css-extract-plugin 需要与 html-webpack-plugin 同时使用，才能将产物路径以 link 标签方式插入到 html 中

  ```
  预处理器之于 CSS，就像 TypeScript 与 JavaScript 的关系；而 PostCSS 之于 CSS，则更像 Babel 与 JavaScript。
  ```