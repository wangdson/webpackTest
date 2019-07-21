let loaderUtils = require('loader-utils')

function loader(source) {
  // loaderUtils 中的 interpolateName 方法，用于生成对应的文件名
  let filename = loaderUtils.interpolateName(this,'[hash:8].[ext]',{
    content: source
  })
  console.log(`filename:${filename}`);
  this.emitFile(filename, source); // 发射文件
  return `module.exports = '${filename}'`;
}
loader.raw = true // 开启二进制
module.exports = loader