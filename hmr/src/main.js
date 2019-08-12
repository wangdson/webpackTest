import('../dev-client');
var root = document.getElementById("root");

function render(){
  let testStr = require('./test').default;
  console.log(`testStr:${testStr},${require('./test')}`);
  root.innerHTML = testStr;
}
render();

// 如果此模块支持热更新的话
if(module.hot) {
  // 如果此模块依赖的title模块发生变更的时候，就会调用render重新渲染
  module.hot.accept(['./test'],render);
}