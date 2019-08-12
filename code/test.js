let obj = {
  token: '111',
  timestamp: '222',
}

let str = Object.keys(obj).sort().map(item => `${item}=${obj[item]}`).join('&');
console.log(str)