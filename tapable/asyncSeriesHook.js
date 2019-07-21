/**
 * AsyncSeriesHook 为异步串行执行，与 AsyncParallelHook 相同，
 * 通过 tapAsync 注册的事件，通过 callAsync 触发，通过 tapPromise 注册的事件，通过 promise 触发，
 * 可以调用 then 方法
 */
// const { AsyncSeriesHook } = require("tapable");
const { AsyncSeriesHook } = require("./tapbleHook");

let asyncSeriesHook = new AsyncSeriesHook(["name","age"]);

// console.time("time");
// asyncSeriesHook.tapAsync("step1",(name,age,next)=>{
//   setTimeout(()=>{
//     console.log("step1",name,age,new Date());
//     next();
//   },1000);
// })

// asyncSeriesHook.tapAsync("step2",(name,age,next)=>{
//   setTimeout(()=>{
//     console.log("step2",name,age,new Date());
//     next();
//   },1000);
// })

// asyncSeriesHook.tapAsync("step3",(name,age,next)=>{
//   setTimeout(()=>{
//     console.log("step3",name,age,new Date());
//     next();
//     console.timeEnd("time");
//   },1000);
// })

// asyncSeriesHook.callAsync("wp",29,()=>{
//   console.log("complete");
// });

// tapPromise
// 注册事件
console.time("time");
asyncSeriesHook.tapPromise("promise1",(name,age)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log("promise1",name,age,new Date());
      resolve("promise1");
    },1000);
  })
})

asyncSeriesHook.tapPromise("promise2",(name,age)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log("promise2",name,age,new Date());
      resolve("promise2");
    },2000);
  })
})

asyncSeriesHook.tapPromise("promise3",(name,age)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log("promise3",name,age,new Date());
      resolve("promise3");
      console.timeEnd("time");
    },1000);
  })
})

asyncSeriesHook.promise("gt",29).then(ret=>{
  console.log(ret);
});