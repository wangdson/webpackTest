const path = require("path");
let webpack = require("webpack");
let chalk = require("chalk");
let symbols = require("log-symbols");
const htmlWebpackPlugin = require("html-webpack-plugin");
const styleLoader = path.resolve(__dirname,'loader','style-loader.js');
const cssLoader = path.resolve(__dirname,'loader','css-loader.js');
const lessLoader = path.resolve(__dirname,'loader','less-loader.js');
const babelLoader = path.resolve(__dirname,'loader','babel-loader.js');
const fileLoader = path.resolve(__dirname,'loader','file-loader.js');

class CompilePlugin{
  apply(compiler){
    compiler.hooks.entryOptions.tap('entryOptions',()=>{
      console.log(symbols.success,chalk.greenBright('entryOptions'));
    }),
    compiler.hooks.compile.tap('compile',()=>{
      console.log(symbols.success,chalk.greenBright('compile'));
    }),
    compiler.hooks.run.tap('run',()=>{
      console.log(symbols.success,chalk.greenBright('run'))
    }),
    compiler.hooks.afterCompile.tap('afterCompile',()=>{
      console.log(symbols.success,chalk.greenBright('afterCompile'))
    }),
    compiler.hooks.afterPlugins.tap('afterPlugins',()=>{
      console.log(symbols.success,chalk.greenBright('afterPlugins'))
    }),
    compiler.hooks.done.tap('done',()=>{
      console.log(symbols.success,chalk.greenBright('done'))
    })
  }
}

module.exports = {
  mode: "development",
  entry: './src/index.js',
  // entry: {
  //   index: "./src/index.js",
  //   other: "./src/other.js",
  //   test: "./src/test.js",
  // },
  output: {
    publicPath: "./",
    // publicPath: "http://localhost:8081/",//js引用路径
    path: path.resolve(__dirname, "dist"),//打包文件的输出目录
    filename: 'main.min.js',
    // libraryTarget: "window"
  },
  devServer: {
    port: 8081,
    host: 'localhost',
    //指定打开浏览器显示的目录，默认为根目录（项目目录）
    contentBase: './dist',
    // publicPath: "./dist/",
    hot: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost/3000',
        pathRewrite: { '^/api': '/api' },
        changeOrigin: true,
      }
      // '/api':'http://localhost/3000'
    }
  },
  // resolve:{ // 解析第三方包 // module: [path.resolve('../../node_modules') ]

  // },
  optimization: {
    splitChunks: {
      cacheGroups: { // 缓存组 
        common:{ // 公共模块
          name:'common',
          minSize: 0,
          minChunks:2,
          chunks: 'all',
          // chunks: ['index','other'],
        }
      }
    }
  },
  watch: true,
  // watchOptions: {
  //   poll: 100, // 每秒问我多少次
  //   aggregateTimeout: 500, // 防抖
  //   ignored: /node_modules/,
  // },
  resolveLoader:{
    // modules: ['node_modules',path.resolve(__dirname,'loader')],
    //别名
    alias:{
      // 'wpLoader':path.resolve(__dirname,'loader','wpLoader.js'),
      'banner-loader':path.resolve(__dirname,'loader','banner-loader.js'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [{
          loader: babelLoader,
          // loader: 'babel-loader',
          options: {
            // data: '自定义的配置',
            presets: ['@babel/preset-env'],
            plugins:['@babel/plugin-syntax-dynamic-import'],
          }
        },
        { // 头部banner显示
          loader: 'banner-loader',
          options: {
            text:'wangpei',
            // filename: 1, // schema 校验不通过
            filename: path.resolve(__dirname,'banner','banner.txt'),
          }
        }]
      },
      {
        test: /\.jpeg$/,
        // exclude: /(node_modules)/,
        use: [fileLoader],
      },
      {
        test: /\.less$/,
        // exclude: /(node_modules)/,
        use: [styleLoader,cssLoader,lessLoader],
      }
    ],
  },
  plugins: [
    // new CompilePlugin(),
    // new htmlWebpackPlugin({
    //   template: './index.html',
    //   filename: 'index.html',
    //   // chunks: ['test']
    // }),
    // new webpack.NamedModulesPlugin(), // 打印变更的模块路径
    // new webpack.HotModuleReplacementPlugin(), // 热更新插件
  ] 
}
