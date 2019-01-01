let clicked = false;
const path = require("path");
window.addEventListener("click", function() {
   if(!clicked)
   {
       import("./css/base.css");
   }
});
// style-loader/useable：
// 可以直接使用use()或者unuse()方法来加载/卸载CSS样式

// import base from "./css/base.css"; // import cssObj from '...'
// var flag = false;
// setInterval(function () {
//     if(flag)
//     {
//         base.unuse();
//     }
//     else
//     {
//         base.use();
//     }
//     flag = !flag;
// },500)
