let str = "home";
console.log(`str:${str}`)

class Log{
  constructor(){
    console.log('出错了');
  }
}
let log = new Log();

let xhr = new XMLHttpRequest();

xhr.open('GET','/api/user',true);
xhr.onload = function(){
  console.log(xhr.response);
}
xhr.send();