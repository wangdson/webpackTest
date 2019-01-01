import {a} from './elc/util';
console.log(a());

//引用lodash方法 js tree使用的是es的模块系统
// import {chunk} from "lodash";
// console.log(chunk([1,2,3],2));

//js tree shaking 利用的是 es 的模块系统。而 lodash.js 没有使用 CommonJS 或者 ES6 的写法。所以，安装库对应的模块系统即可
import {chunk} from "lodash-es";
console.log(chunk([1,2,3],2));
