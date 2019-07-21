#! /usr/local/bin/node
// console.log('start1');
let path = require('path');

// config 配置文件
let config = require(path.resolve("webpack.config.js"));

const Compiler = require('../lib/Compiler');
let complier = new Compiler(config);
complier.hooks.entryOptions.call();

// 编译代码执行 
complier.run();