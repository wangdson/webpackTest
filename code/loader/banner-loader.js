/**
 * banner-loader loader实现
 * @param {*} source 
 */
const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils');
const fs = require('fs');

function loader(source) {
  let options = loaderUtils.getOptions(this);
  // this.cacheable && this.cacheable(); // 启用缓存
  // this.cacheable(false); // 是否启用缓存
  let cb = this.async();
  let schema = {
    type:'object',
    properties:{
      text:{
        type:'string',
      },
      filename:{
        type:'string',
      }
    }
  }
  validateOptions(schema,options,'banner-loader');
  // 判断当前文件是否存在
  if(options.filename) {
    this.addDependency(options.filename);
    fs.readFile(options.filename,'utf8',(err,data)=>{
      if(!err && data) {
        cb(err,`/**${data}*/${source}`);
      }
    })
  } else {
    cb(null,`/**${options.text}*/${source}`);
  }
}
module.exports = loader;