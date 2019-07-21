function loader(source){
  let styleStr = `let style = document.createElement('style');
  style.innerHTML = ${JSON.stringify(source)};
  document.head.appendChild(style);`
  // styleStr = styleStr.replace('/\\n/g','\n')
  console.log(`styleStr:${styleStr}`);
  return styleStr;
}

module.exports = loader;
