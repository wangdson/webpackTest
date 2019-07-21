function loader(source){
  let regStr = /url\((.+?)\)/;
  let current;
  while(current = regStr.exec(source)) {
    let [match, url] = current;
    let last = regStr.lastIndex - match.length;
  }
  return source;
}

module.exports = loader;