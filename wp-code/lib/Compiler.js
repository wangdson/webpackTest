let path = require('path');
let fs = require('fs');
const babylon = require("babylon");
const babel = require("@babel/core");
const t = require("@babel/types");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
let ejs = require('ejs');
const {SyncHook} = require('tapable');

// var getStackTrace = function () {
//   var obj = {};
//   Error.captureStackTrace(obj, getStackTrace);
//   return obj.stack;
// };
// var log = console.log;
// console.log = function () {
//   var stack = getStackTrace() || ""
//   var matchResult = stack.match(/\(.*?\)/g) || []
//   var line = matchResult[1] || ""
//   for (var i in arguments) {
//   }
//   // if (typeof arguments[i] == 'object') {
//   //   arguments[i] = JSON.stringify(arguments[i])
//   // }
//   arguments[i] += '----' + line.replace("(", "").replace(")", "")
//   log.apply(console, arguments)
// };

// babylon 主要是把源码解析成AST
// @babel/traverse 遍历节点（遍历到对应的节点）
// @babel/types 替换遍历到的节点
// @babel/generator 替换好的结果生成
// (traverse和generator是es6模块 引用的时候要require('@babel/traverse').default 不然默认导出的是一个对象)
class Compiler{
  constructor(config){
    // 将当前的配置信息保存到this上下文
    this.config = config;
    // 保存当前的入口文件信息
    this.entryId;
    this.modules = {};// 当前的模块信息
    // 获取当前的入口文件
    this.entry = config.entry;
    this.root = process.cwd();
    this.hooks = {
      entryOptions: new SyncHook(), // 参数入口处钩子
      compile: new SyncHook(), // 编译时钩子
      afterCompile: new SyncHook(), // 编译完后钩子
      afterPlugins: new SyncHook(),
      run: new SyncHook(),
      emit: new SyncHook(), // 产出文件钩子
      done: new SyncHook(),
    }
    this.plugins = this.config.plugins;
    if(Array.isArray(this.plugins)) {
      this.plugins.forEach(plugin => {
        plugin.apply(this);
      });
    }
    this.hooks.afterPlugins.call();
  }

  /**
   * 替换require，替换依赖的路径，把修改后的模板放进sourceCode
   * 把依赖放进dependencies数组中
   * source 模块源文件内容
   * parentPath 父级目录
   */
  parse(source, parentPath){ // AST解析语法数
    // console.log(source,parentPath);
    let ast = babylon.parse(source, {
      sourceType: 'module'
    });
    // console.log(ast);
    let dependencies = [];
    // 遍历所有的dom节点
    traverse(ast,{
      //找到有 import语法 的对应节点
      // ImportDeclaration: ({ node }) => {
      //   //把当前依赖的模块加入到数组中，其实这存的是字符串，
      //   //例如 如果当前js文件 有一句 import './base.less'， 
      //   //'./base.less' === node.source.value
      //   // node.callee.name = '_webpack_require_';
      //   let moduleName = node.source.value;
      //   moduleName = moduleName + (path.extname(moduleName)?'':'.less');
      //   console.log(`1====${moduleName},${JSON.stringify(node.source)}`)
      //   moduleName = './'+path.join(parentPath,moduleName);
      //   dependencies.push(moduleName);
      //   node.source = t.stringLiteral(moduleName);
      // },
      CallExpression(p){
        let node = p && p.node; // 获取到当前的node
        if(node && node.callee.name === 'require') {
          node.callee.name = '_webpack_require_';
          let moduleName = node.arguments[0].value;
          // path.extname 获取后缀名
          moduleName = moduleName + (path.extname(moduleName)?'':'.js');
          console.log(`1====${moduleName}`)
          // 获取当前相对路径的模块名
          moduleName = './'+path.join(parentPath,moduleName);
          // console.log(`2====${moduleName}`)
          dependencies.push(moduleName);
          node.arguments = [t.stringLiteral(moduleName)];
        } 
      }
    });
    // 重新生成源码
    //这边主要把ES6 的代码转成 ES5
    // const { code } = babel.transformFromAstSync(ast, null, {
    //   presets: ["@babel/preset-env"]
    // });
    // let sourceCode = code;
    let sourceCode = generator(ast).code;
    return { sourceCode, dependencies };
  }

  /**
   * 编译当前的依赖模块 构建模块 生成模块的依赖关系
   * modulePath 模块地址
   * isEntry 是否是入口文件
   */
  buildModules(modulePath, isEntry){
    // 获取到模块内容
    //拿到模块内容  getSource只是读取文件的方法，拎出来写了
    const moduleContext = this.getSource(modulePath);
    //拿到模块id "./src/a.js"这样 是相对路径 其实就是modulePath-root路径
    const moduleName = './'+path.relative(this.root,modulePath);

    // console.log(moduleContext,moduleName);
    // 判断是否是入口文件
    if(isEntry){
      this.entryId = moduleName;
    }
    //接下来要把文件中的require替换成__webpack_require__ 把比如"./a.js"变成"./src/a.js"
    //解析源码进行改造 返回一个依赖列表（看继续有没有要遍历下去的）
    const {sourceCode,dependencies} = this.parse(moduleContext, path.dirname(moduleName));
    //获得改造后的源码 放进this.modules中 （把相对路径和模块中的内容对应起来）
    this.modules[moduleName] = sourceCode;
    //有依赖 继续递归
    dependencies.forEach(dep => {
      this.buildModules(path.resolve(this.root, dep),false);
    })
  }

  /**
   * 反射文件 输出
   */
  outputFile(){
    // 输出文件
    // let outputFile = path.join(this.config.output.path,this.config.output.filename);
    let outputFile = path.join(this.config.output.path,'main.min.js');
    let templateStr = this.getSource(path.resolve(__dirname,'template.ejs'));
    let code = ejs.render(templateStr,{entryId: this.entryId, modules: this.modules});
    this.assets = {};
    this.assets[outputFile] = code;
    // console.log(templateStr,code);
    fs.writeFileSync(outputFile,this.assets[outputFile]);
  }

  /**
   * 获取当前的文件信息
   */
  getSource(filePath){
    let context = fs.readFileSync(filePath,'utf8');
    // 处理loader处理
    const rules = this.config.module.rules;
    rules.forEach(rule=>{
      let { test, use} = rule;
      // console.log(`test:${test},use:${JSON.stringify(use)}`);
      !Array.isArray(use) ? use = [].push(use):'';
      let len = Array.isArray(use) && use.length-1;
      console.log(`====test-filePath:${filePath},test:${test},${test.test(filePath)}====`);
      // 规则匹配到则处理对应的loader
      if(test.test(filePath)) {
        console.log('====loader-start====');
        console.log(`====use:${JSON.stringify(use)},${len}====`);
        // loader 处理信息
        function normalLoader(){
          const num = len--;
          let useLoader = use[num].loader || use[num];
          console.log(`useLoader:${useLoader}`);
          let loader = require(useLoader);
          // console.log(`loader:${loader}`);
          context = loader(context);
          console.log(`context:${context}`);
          if(len >= 0){
            normalLoader();
          }
        } 
        normalLoader();
      }
    });
    return context;
  }

  // 执行文件
  run(){
    // console.log(0,path.resolve(this.root,this.entry));
    this.hooks.run.call();
    this.hooks.compile.call();
    // 编译当前的依赖模块
    this.buildModules(path.resolve(this.root,this.entry),true);
    this.hooks.afterCompile.call();

    // 反射文件 输出
    this.outputFile();
    this.hooks.emit.call();
    this.hooks.done.call();
  }
}

module.exports = Compiler;