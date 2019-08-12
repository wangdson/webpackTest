const babel = require('@babel/core');
const loaderUtils = require('loader-utils');

/**
 * babel loader的简易实现
 * @param {*} source 
 */
function loader(source) {
  let options = loaderUtils.getOptions(this)||{
    presets: ['@babel/preset-env'],
  };
  console.log(`----options:${JSON.stringify(options)}-----`);
  // console.log(`options:${JSON.stringify(options)}`);
  // 第一个参数: error, node 的回调规范
  // 第二个参数: 编译后的代码
  // 第三个参数, sourse map
  const {err,code,map} = babel.transformSync(source,{
    // 传入 webpack 配置的 options
    ...options,
    // 开启 sourceMap
    sourceMap: true,
    // filename: this.resourcePath && this.resourcePath.split('/').pop(),
  });
  console.log(`----code:${JSON.stringify(code)}-----`);
  return code;
}

module.exports = loader;