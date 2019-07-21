// SyncHook 为串行同步执行，不关心事件处理函数的返回值
class SyncHook{
  constructor(args){
    this.args = args;
    this.tasks = [];
  }
  tap(name,task){
    this.tasks.push(task);
  }
  call(...args){
    // 也可在参数不足时抛出异常
    if(args.length < this.args.length) throw new Error("参数不足");
    this.tasks.forEach(task=>task(...args));
  }
}

// SyncBailHook 同样为串行同步执行，如果事件处理函数执行时有一个返回值不为空（即返回值为 undefined），则跳过剩下未执行的事件处理函数（如类的名字，意义在于保险）。
class SyncBailHook{
  constructor(args){
    this.args = args;
    this.tasks = [];
  }
  tap(name,task){
    this.tasks.push(task);
  }
  call(...args){
    // 也可在参数不足时抛出异常
    if(args.length < this.args.length) throw new Error("参数不足");
    let res; // 返回信息
    let index = 0;
    do{
      res = this.tasks[index++](...args);
    }while(res === undefined && index < args.length )
  }
}

// SyncWaterfallHook 为串行同步执行，上一个事件处理函数的返回值作为参数传递给下一个事件处理函数
class SyncWaterfallHook{
  constructor(args){
    this.args = args;
    this.tasks = [];
  }
  tap(name,task){
    this.tasks.push(task);
  }
  call(...args){
    // 也可在参数不足时抛出异常
    if(args.length < this.args.length) throw new Error("参数不足");
    const [first,...others] = this.tasks;
    return others.reduce((ret,task) => task(ret), first(...args));
  }
}

// SyncLoopHook 为串行同步执行，事件处理函数返回 true 表示继续循环，即循环执行当前事件处理函数
class SyncLoopHook {
  constructor(args){
    this.args = args;
    this.tasks = [];
  }
  tap(name,task){
    this.tasks.push(task);
  }
  call(...args){
    // 也可在参数不足时抛出异常
    if(args.length < this.args.length) throw new Error("参数不足");
    // 依次执行事件处理函数，如果返回值为 true，则继续执行当前事件处理函数
    // 直到返回 undefined，则继续向下执行其他事件处理函数
    this.tasks.forEach(task=>{
      let res; // 返回结果
      do{
        res = task(...args);
      }while(res !== undefined)
    });
  }
}

// AsyncParallelHook
// AsyncParallelHook 为异步并行执行，
// 通过 tapAsync 注册的事件，通过 callAsync 触发，通过 tapPromise 注册的事件，通过 promise 触发（返回值可以调用 then 方法）。
class AsyncParallelHook{
  constructor(args){
    this.args = args;
    this.tasks = [];
  }
  tapAsync(name,task){
    this.tasks.push(task);
  }
  tapPromise(name,task){
    this.tasks.push(task);
  }
  
  callAsync(...args){
    // 先取出callback
    let _callback = args.pop();

    // 传入参数严格对应创建实例传入数组中的规定的参数，执行时多余的参数为 undefined
    args = args.slice(0,this.args.length);
    // 定义一个 index 变量和 done 函数，每次执行检测 index值和队列长度，决定是否执行 callAsync 的回调函数
    let i = 0;
    let done = ()=>{
      if(++i === this.tasks.length){
        _callback();
      }
    }
    this.tasks.forEach(task => {
      task(...args,done);
    });
  }

  promise(...args){
    // 传入参数严格对应创建实例传入数组中的规定的参数，执行时多余的参数为 undefined
    args = args.slice(0,this.args.length);
    return Promise.all(this.tasks.map(task => task(...args)));
  }
}

// AsyncSeriesHook
// AsyncSeriesHook 为异步并行执行，
// 通过 tapAsync 注册的事件，通过 callAsync 触发，通过 tapPromise 注册的事件，通过 promise 触发（返回值可以调用 then 方法）。
class AsyncSeriesHook{
  constructor(args){
    this.args = args;
    this.tasks = [];
  }

  tapAsync(name,task){
    this.tasks.push(task);
  }

  tapPromise(name,task){
    this.tasks.push(task);
  }
  
  callAsync(...args){
    // 先取出callback
    let _callback = args.pop();

    // 传入参数严格对应创建实例传入数组中的规定的参数，执行时多余的参数为 undefined
    args = args.slice(0,this.args.length);
    // 定义一个 index 变量和 done 函数，每次执行检测 index值和队列长度，决定是否执行 callAsync 的回调函数
    let i = 0;
    let next = ()=>{
      let task = this.tasks[i++];
      task ? task(...args,next) : _callback;
    }
    next();
  }

  promise(...args){
    // 传入参数严格对应创建实例传入数组中的规定的参数，执行时多余的参数为 undefined
    args = args.slice(0, this.args.length);

    // 将每个事件处理函数执行并调用返回 Promise 实例的 then 方法
    // 让下一个事件处理函数在 then 方法成功的回调中执行
    let [first, ...others] = this.tasks;
    return others.reduce((promise, task) => {
        return promise.then(() => task(...args));
    }, first(...args));
  }
}

module.exports = {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncSeriesHook
};