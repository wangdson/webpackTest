const less = require('less');

function loader(source){
  console.log(`source:${source}`);
  let css = '';
  less.render(source,(err,code)=>{
    if(!err && code) {
      css = code.css;
    }
  });
  css = css.replace(/\n/g,'\\n');
  console.log(`css:${css}`);
  return css;
}

module.exports = loader;