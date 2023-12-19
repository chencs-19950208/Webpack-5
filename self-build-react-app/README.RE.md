1. 在开发环境我们希望css嵌入在style标签里面,方便样式热替换,但打包时我们希望把css单独抽离出来,方便配置缓存策略。而插件mini-css-extract-plugin就是来帮我们做这件事的


2.借助css-minimizer-webpack-plugin来压缩css


3.设置mode为production时,webpack会使用内置插件terser-webpack-plugin压缩js文件,该插件默认支持多线程压缩,但是上面配置optimization.minimizer压缩css后,js压缩就失效了,需要手动再添加一下,webpack内部安装了该插件,由于pnpm解决了幽灵依赖问题,如果用的pnpm的话,需要手动再安装一下依赖


4.webpack提供了代码分隔功能, 需要我们手动在优化项optimization中手动配置下代码分隔splitChunks规则。


5.模式mode为production时就会默认开启tree-shaking功能以此来标记未引入js代码然后移除掉, 


6.css中也会有未被页面使用到的样式,可以通过purgecss-webpack-plugin插件打包的时候移除未使用到的css样式,这个插件是和mini-css-extract-plugin插件配合使用的,在上面已经安装过,还需要glob-all来选择要检测哪些文件里面的类名和id还有标签名称


7.预加载。。。。。


8.webpack可以借助compression-webpack-plugin 插件在打包时生成 gzip


9.css、less 模块化处理 [参照](https://github.com/webpack-contrib/css-loader/blob/master/README.md)