// const { SyncHook } = require("tapable");
const {SyncHook} = require("./tapbleHook");

let syncHookTest = new SyncHook(['name','age']);

syncHookTest.tap("game",(name,age)=>{console.log(name,age,'game')});
syncHookTest.tap("sing",(name,age)=>{console.log(name,age,'sing')});
syncHookTest.tap("jump",(name,age)=>{console.log(name,age,'jump')});

syncHookTest.call("wp",28);