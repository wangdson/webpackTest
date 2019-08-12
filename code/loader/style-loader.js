let loaderUtils = require('loader-utils');
function loader(source){
  let styleStr = `let style = document.createElement('style');
  style.innerHTML = ${JSON.stringify(source)};
  document.head.appendChild(style);`
  // styleStr = styleStr.replace('/\\n/g','\n')
  console.log(`styleStr:${styleStr}`);
  return styleStr;
}

// style-loader 上写pitch 显示剩余的 
// 可以让style-loader去处理css-loader!less-loader/*.less
loader.pitch = function(remainingRequest){
  console.log(remainingRequest);
  let styleStr = `let style = document.createElement('style');
  style.innerHTML = require(${loaderUtils.stringifyRequest(this,'!!'+remainingRequest)});
  document.head.appendChild(style);`
  // styleStr = styleStr.replace('/\\n/g','\n')
  console.log(`styleStr:${styleStr}`);
  return styleStr;
}

module.exports = loader;
