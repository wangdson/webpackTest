const { SyncLoopHook } = require("tapable");
// const { SyncLoopHook } = require('./tapbleHook');

let syncLoopHookTest = new SyncLoopHook(['name','age']);
let total1 = 0; 
let total2 = 0;

syncLoopHookTest.tap("game",(name,age)=>{
  console.log(name,age,'step1',total1);
  return total1++ < 2? true : undefined; 
});
syncLoopHookTest.tap("sing",(name,age)=>{
  console.log(name,age,'step2',total2);
  return total2++ < 2 ? true : undefined;
});
syncLoopHookTest.tap("jump",data=>{console.log(data,'step3');});

syncLoopHookTest.call("wp",28);