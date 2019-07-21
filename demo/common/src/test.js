let button = document.createElement("button");
button.addEventListener("click",function(){
  // console.log("click");
  // import('./source').then(function(data){
  //   console.log(data);
  // })
  require.ensure([],function(){
    let foo = require("./source");
    console.log(foo.default);
  },"test1")
})
button.innerHTML="click me";
document.body.appendChild(button);