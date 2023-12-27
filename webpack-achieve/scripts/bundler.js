/**
 * 1. 利用babel完成代码转化，并生成单个文件的依赖
 * 2. 生成依赖图谱
 * 3. 生成最后打包的代码
 */
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser') // code -> AST
const traverse = require('@babel/traverse').default // 遍历 AST
const babel = require('@babel/core'); // babel 工具集方法

/**
 * 转换代码，生成依赖
 * 1. 输出文件名 filename
 * 2. 依赖 dependenics
 * 3. 转换后的代码 code
 */
function assemblyCodeAndDependenics(filename) {
  const dependenics = {}; // 依赖
  // 读取文件内容
  const content = fs.readFileSync(filename, { encoding: 'utf-8' });

  // 转化 => AST
  const AST = parser.parse(content, {
    sourceType: 'module', //babel官方规定必须加这个参数，不然无法识别ES Module
  });

  // 遍历AST,提取依赖，存放在dependenics
  traverse(AST, {
    // 获取 AST 的 import 节点
    ImportDeclaration({ node }) {
      const dirname = path.dirname(filename); // 获取目录名称
      const newFile = './' + path.join(dirname, node.source.value);
      // 保存所有的依赖
      dependenics[node.source.value] = newFile;
    },
  });

  // @babel/core 工具函数，对代码进行转化，语法兼容@babel/preset-env 
  const code = babel.transformFromAst(AST, null, {
    presets: ['@babel/preset-env'],
  });

  return {
    filename,
    dependenics,
    code,
  }
};

// 以entry 为入口，解析 => 依赖图谱
function assemblyEntryToDependenice(entry) {
  // 获取entry 的数据
  const entryModule = assemblyCodeAndDependenics(entry);
  const graphArray = [entryModule]; // 所有依赖存放位置

  for(let i = 0; i < graphArray.length; i++) {
    const item = graphArray[i];
    const { dependenics } = item; // 拿到文件所有依赖集合 （键值对存储）

    for(let j in dependenics) {
      graphArray.push(
        assemblyCodeAndDependenics(dependenics[j]),
      ); // 以入口文件开始，将一层一层依赖，都放入数组中
    };

    // 接下来生成图谱
    const graphObject = {};
    graphArray.forEach(col => {
      graphObject[col.filename] = {
        dependenics: col.dependenics,
        code: item.code,
      }
    });

    return graphObject;
  }
};

// 生成代码
function genernateCode(entry) {
  const graph = JSON.stringify(assemblyEntryToDependenice(entry));

  console.log(graph, 'graph --- ');

  return `
    (function (graph) {
      //require函数的本质是执行一个模块的代码，然后将相应变量挂载到exports对象上
      function require(module) {
        function localRequire(relativePath) {
          return require(graph[module].dependenics[relativePath])
        };

        var exports = {};
        (function(require, exports, code) {
            eval(code);
        })(localRequire, exports, graph[module].code);
        return exports;//函数返回指向局部变量，形成闭包，exports变量在函数执行后不会被摧毁
      }

      require('${entry}')
    })(${graph})
  `
};

const code = genernateCode('../src/index.js');
console.log(code);


