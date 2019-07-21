// const { SyncBailHook } = require("tapable");
const { SyncBailHook } = require("./tapbleHook");

let syncBailHookTest = new SyncBailHook(['name','age']);

syncBailHookTest.tap("game",(name,age)=>{console.log(name,age,'game');return undefined;});
syncBailHookTest.tap("sing",(name,age)=>{console.log(name,age,'sing');return "1"});
syncBailHookTest.tap("jump",(name,age)=>{console.log(name,age,'jump')});

syncBailHookTest.call("wp",28);