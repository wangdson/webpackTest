const socket = io('/');
let hotCurrentHash; // hot 热更新当前的hash值
let currentHash; // 当前的hash值

class HotEmitter{
  constructor(){
    this.listeners = [];
  }
  // 注册事件
  on(type,listener){
    this.listeners[type] = listener;
  }
  emit(type){
    this.listeners[type] && this.listeners[type]();
  }
}

let hotEmitter = new HotEmitter();
// 注册socket.on 监听hash变化
socket.on("hash",hash=>{
  currentHash = hash;
});
// 注册socket.on 监听ok变化,里面会实现reloadApp方法
socket.on("ok",()=>{
  reloadApp(true);
})
// 监听连接上状态
socket.on("connect",()=>{
  console.log("当前客户端连接上服务端");
});
hotEmitter.on("webpackHotUpdate",()=>{
  if(!hotCurrentHash || hotCurrentHash == currentHash){
    return hotCurrentHash = currentHash;
  }
  hotCheck();
});

// 热更新检查
function hotCheck(){
  hotDownloadMainfest().then(update=>{
    // 获取update中chunk数组和hash值
    const { c:chunks, h:hash } = update;
    Object.keys(chunks).forEach(chunkId=>{
      hotDownloadUpdateChunk(chunkId);
    })
  }).catch(e=>{
    console.log(`处理出错，错误信息${JSON.stringify(e)}`);
  });
}

// 此方法用来询问服务器歹毒这一次编译相对于上一次编译改变了哪些chunk,哪些模块
function hotDownloadMainfest(requestTimeout=10000){
  return new Promise((resolve,reject)=>{
    try{
      let xhr = new XMLHttpRequest();
      //hot-update.json文件里存放着从上一次编译到这一次的编译
      let reqPath = '/'+hotCurrentHash+".hot-update.json";
      xhr.open("GET",reqPath,true);
      xhr.timeout = requestTimeout;
      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4) {
          console.log(`responseText:${JSON.stringify(xhr.responseText)}`)
          let update = JSON.parse(xhr.responseText);
          resolve(update);
        }
      }
      xhr.send();
    }
    catch(e){
      return reject(e);
    }
  });
}

/**
 * 更新上次版本更新的chunk数据
 */
function hotDownloadUpdateChunk(chunkId){
  let script = document.createElement("script");
  script.charset = "utf-8";
  // jsonp的src地址是 /main.****.hot-update.js
  script.src="/"+chunkId+"."+hotCurrentHash+".hot-update.js";
  // if (null) script.crossOrigin = null;
  document.head.append(script);
}

// 判断当前是否是热更新，如果是热更新则执行热更新，否则的话则刷新页面
function reloadApp(hot){
  if(hot){
    hotEmitter.emit('webpackHotUpdate');
  } else {
    window.location.reload();
  } 
}

/**
 * 创建热更新对象
 */
window.createHotModule = function(){
  let hot = {
    // 依赖的对象
    _acceptedDependencies: {},
    dispose(){
      //销毁老的元素
    },
    // 接收参数
    accept: function(deps, callback) {
      // hot._acceptedDependencies ={'./title':render}
      !Array.isArray(deps) && (hot._acceptedDependencies[deps] = callback || function(){});
      Array.isArray(deps) && deps.forEach(dep=>{
        hot._acceptedDependencies[dep] = callback || function(){};
      })
    }
  };
  return hot;
}

/**
 * webpack 热更新 更新成最新的代码块
 * @param {*} chunkId 当前chunk
 * @param {*} moreModule 更多模块
 */
window.webpackHotUpdate = (chunkId,moreModules)=>{
  // 循环新拉来的模块
  moreModules && Object.keys(moreModules).forEach(moduleId=>{
    // 先获取老的模块定义获取到parents和children
    let oldChunk = __webpack_require__.c[moduleId];
    let {parents, children} = oldChunk;
    // 更新缓存为最新代码
    let newModule = __webpack_require__.c[moduleId] = {
      i: moduleId,
      l:false,
      exports:{},
      parents,
      children,
      hot: window.createHotModule(),
    }
    // 执行模块对应的模块内容
    moreModules[moduleId].call(newModule.exports,newModule,newModule.exports,__webpack_require__);
    // 加载模块完成之后将module信息置为已加载  给module.exports 赋值了
    newModule.l = true;
    // 热更新
    parents.forEach(parent=>{
      let parentModule = __webpack_require__.c[parent];
      parentModule && parentModule.hot && parentModule.hot._acceptedDependencies[moduleId] && parentModule.hot._acceptedDependencies[moduleId]();
    });
    hotCurrentHash = currentHash;
  })
}
