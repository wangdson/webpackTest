import "@babel/polyfill"

let func = ()=>{}
const NUM = 1;
let arr = [1,2,3,4]
let arrB = arr.map(item => item*2);
console.log("constants常量:",NUM);
console.log(arrB.includes(8));
console.log("set B :"+new Set(arrB));
