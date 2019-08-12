const path = require("path");
const express = require("express");
const mime = require("mime");
const webpack = require("webpack");

const config = require("./webpack.config");
// compiler代表整个webpack的执行任务
const compiler = webpack(config);
const MemoryFileSystem = require("memory-fs");
const http = require("http");
const socketIO = require("socket.io");

/**
 * 步骤：
 * 1、启动webpack-dev-server服务器
 * 2、创建webpack实例
 * 3、创建sever实例
 * 4、添加webpack的done事件回调 编译完成之后向客户端发送消息
 * 5、创建express app
 * 6、添加webpack-dev-sever中间件 中间件负责返回生成的文件 启动webpack编译
 * 7、设置文件系统为内存文件系统
 * 8、创阿健http并启动服务
 * 9、使用socketjs在浏览器和服务端之间建立一个websokect长连接创建socket服务器
 */

// server类
class Server{
  constructor(compiler){
    this.compiler = compiler;
    // let {done} = compiler.hooks;
    let lastHash;
    let sockets = [];
    // 每次编译都会产生一个stats对象，hash值代表这一次编译结果hash
    compiler.hooks.done.tap("webpack-dev-server",(stats)=>{
      console.log(`done 钩子函数执行`);
      this._stats = stats;
      lastHash = stats.hash;
      // 每当新的一次编译完成之后都会向客户端发送消息
      console.log(`sockets:${sockets.length}`)
      sockets.forEach(socket=>{
        // 先向客户端发送最新的hash值
        // 热更新会产生2个补丁，描述了从上一次到这一次结果都有哪些chunk和模块发生变化
        socket.emit("hash",stats.hash);
        // 再向客户端发送一个ok
        socket.emit("ok");
      })
    });
    let app = new express();
    //以监控模块启动一次webpack编译，当编译成功之后执行回调
    compiler.watch({},err=>{
      console.log('完成一次编译操作');
    });
    let fileSystem = new MemoryFileSystem();
    // 如果你把compiler的输出文件系统改成了memoryFileSystem的话，则以后产出文件都打包到内存
    compiler.outputFileSystem = fileSystem;
    function middleware(req, res, next) {
      if(req.url === '/favicon.ico'){
        res.sendStatus(404);
      }
      let fileName = path.join(config.output.path,req.url === '/'? 'index.html':req.url.slice(1));
      console.log(`filename:${fileName}，req.url:${req.url}`);
      let stat = fileSystem.existsSync(fileName) && fileSystem.statSync(fileName);
      if(stat && stat.isFile()){
        // 判断是否存在这个文件，如果在的话直接把他这个读出来发给浏览器
        let content = fileSystem.readFileSync(fileName);
        let mineType = mime.getType(fileName);
        console.log(`mineType:${mineType}`);
        res.setHeader("Content-Type",mineType);
        res.statusCode = res.statusCode || 200;
        res.send(content);
      } else {
        // next();
        res.sendStatus(404);
      }
    }
    //express app 其实就是一个请求监听函数
    app.use(middleware);
    this.sever = http.createServer(app);
    let io = socketIO(this.sever);
    // 启动一个socket服务，然后等待客户端连接
    io.on("connection",(socket)=>{
      console.log(`当前连接的客户端`)
      sockets.push(socket);
      // 热更新会产生2个补丁，描述了从上一次到这一次结果都有哪些chunk和模块发生变化
      socket.emit("hash",lastHash);
      // 再向客户端发送一个ok
      socket.emit("ok");
    })
  }
  listen(port){
    this.sever.listen(port,()=>{
      console.log(`服务器已经启动，端口:${port}`)
    });
  }
}

let sever = new Server(compiler);
sever.listen(8000);