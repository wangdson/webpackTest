// const { SyncWaterfallHook } = require("tapable");
const { SyncWaterfallHook } = require('./tapbleHook');

let syncWaterFallHookTest = new SyncWaterfallHook(['name','age']);

syncWaterFallHookTest.tap("game",(name,age)=>{console.log(name,age,'step1');return "sing"});
syncWaterFallHookTest.tap("sing",data=>{console.log(data,'step2');return "jump"});
syncWaterFallHookTest.tap("jump",data=>{console.log(data,'step3');return "check"});

syncWaterFallHookTest.call("wp",28);