const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const happypack = require('happypack');

module.exports = {
  mode: "development",
  entry: {
    dll: path.resolve(__dirname, "src/dll.js"),
  },
  output: {
    publicPath: "./",
    // publicPath: "http://localhost:8081/",//js引用路径
    path: path.resolve(__dirname, "dist"),//打包文件的输出目录
    filename: '[name].min.js'
  },
  devServer: {
    port: 8082,
    host: 'localhost',
    //指定打开浏览器显示的目录，默认为根目录（项目目录）
    contentBase: path.resolve(__dirname, './dist'),
    // contentBase: './dist',
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
  // watch: true,
  // watchOptions: {
  //   poll: 100, // 每秒问我多少次
  //   aggregateTimeout: 500, // 防抖
  //   ignored: /node_modules/,
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        include:path.resolve(__dirname,'src'),
        // use:'happypack/loader?id=js'
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env','@babel/preset-react'],
            plugins:['@babel/plugin-syntax-dynamic-import'],
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/\.\/locale/,/moment/),
    new happypack({
      id:'js',
      use:[{
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env','@babel/preset-react'],
          plugins:['@babel/plugin-syntax-dynamic-import'],
        }
      }]
    }),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
      filename: 'index.html',
      chunks: ['dll']
    }),
    new webpack.NamedModulesPlugin(), // 打印变更的模块路径
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
  ] 
}
