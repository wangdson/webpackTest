const path = require("path");

module.exports = {
    mode:"development",
    entry:{
        app:"./app.js"
    },
    output:{
        publicPath:__dirname+"/dist/",//js引用路径
        path:path.resolve(__dirname,"dist"),//打包文件的输出目录
        filename:'[name].min.js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude: /(node_modules)/,
                use:{
                    loader: "babel-loader"
                }
            }
        ]
    }
}
