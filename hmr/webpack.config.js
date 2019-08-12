const path = require('path');
const fs = require("fs");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");

// webpack 配置
module.exports={
  mode: "development",
  entry:'./src/main.js',
  output:{
    path: path.join(__dirname,"dist"),
    filename: 'main.min.js',
  },
  devServer:{
    hot: true,
    contentBase: path.join(__dirname,"dist"),
  },
  plugins:[
    new htmlWebpackPlugin({
      template:'./src/index.html',
      filename:'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}