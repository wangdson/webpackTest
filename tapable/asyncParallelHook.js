// AsyncParallelHook 钩子：tapAsync/callAsync 的使用
// const { AsyncParallelHook } = require("tapable");
const { AsyncParallelHook } = require("./tapbleHook");

// 创建实例
let asyncParallelHook = new AsyncParallelHook(["name", "age"]);

// 注册事件
console.time("time");
asyncParallelHook.tapAsync("step1",(name,age,done)=>{
  setTimeout(()=>{
    console.log("step1",name,age,new Date());
    done();
  },1000);
})

asyncParallelHook.tapAsync("step2",(name,age,done)=>{
  setTimeout(()=>{
    console.log("step2",name,age,new Date());
    done();
  },2000);
})

asyncParallelHook.tapAsync("step3",(name,age,done)=>{
  setTimeout(()=>{
    console.log("step3",name,age,new Date());
    done();
    console.timeEnd("time");
  },3000);
})

asyncParallelHook.callAsync('wp',28,()=>{
  console.log("complete");
});

// tapPromise
// 注册事件
// console.time("time");
// asyncParallelHook.tapPromise("promise1",(name,age)=>{
//   return new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//       console.log("promise1",name,age,new Date());
//       resolve("promise1");
//     },1000);
//   })
// })

// asyncParallelHook.tapPromise("promise2",(name,age)=>{
//   return new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//       console.log("promise2",name,age,new Date());
//       resolve("promise2");
//     },2000);
//   })
// })

// asyncParallelHook.tapPromise("promise3",(name,age)=>{
//   return new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//       console.log("promise3",name,age,new Date());
//       resolve("promise3");
//       console.timeEnd("time");
//     },3000);
//   })
// })

// asyncParallelHook.promise("gt",29).then(ret=>{
//   console.log(ret);
// });