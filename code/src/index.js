import './base.less';// 导入样式文件
import img1 from './img/mm1.jpeg';
const a = require('./common1');
const b = require('./common2');

console.log(a+b);
let img = document.createElement('img');
img.src = img1;
document.body.appendChild(img);