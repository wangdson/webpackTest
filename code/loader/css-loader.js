function loader(source){
  let regStr = /url\((.+?)\)/g;
  let current;
  let pos = 0;
  let cssArr = [`let cssList = []`];
  // console.log(JSON.stringify(regStr.exec(source)));
  while(current = regStr.exec(source)) {
    let [match, url] = current;
    let last = regStr.lastIndex - match.length;
    console.log(match, url,regStr.lastIndex,match.length);
    cssArr.push(`cssList.push(${JSON.stringify(source.slice(pos,last))})`);
    pos = regStr.lastIndex;
    // 把url调换成require
    cssArr.push(`cssList.push('url('+require(${url})+')')`);
  }
  cssArr.push(`cssList.push(${JSON.stringify(source.slice(pos))})`);
  cssArr.push(`module.exports = cssList.join('')`);
  return cssArr.join('\r\n');
}

module.exports = loader;