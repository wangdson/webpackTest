const fs = require('fs');

class FileEmitPlugin {
  constructor({filename}) {
    this.filename = filename;
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync("FileEmitPlugin",(res)=>{
      console.log(`=========FileEmitPlugin-start=========`)
      console.log(res.assets && Object.keys(res.assets));
      let content = '';
      res.assets && Object.keys(res.assets).forEach(item => content+= `${item}\r\n`);
      if(!fs.existsSync('dist')){
        fs.mkdir('dist',(err)=>{
          if(err) {
            console.log(err);
            return false;
          }
          console.log('目录新建完成');
          fs.writeFileSync(`dist/`+this.filename,content,(err,cb)=>{
            if(err) {
              console.log('写入文档失败');
              return;
            }
            cb();
          })
        });
      } else {
        fs.writeFileSync(`dist/`+this.filename,content,(err,cb)=>{
          if(err) {
            console.log('写入文档失败');
            return;
          }
          cb();
        })
      }
      console.log(`=========FileEmitPlugin-end=========`)
    });
  }
}

module.exports = FileEmitPlugin;