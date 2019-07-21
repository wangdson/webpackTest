const path = require("path");
const htmlWebpackPlugin = require("./node_modules/html-webpack-plugin");

module.exports = {
    mode:"development",
    entry:{
        home:"./src/index.js",
        other:"./src/other.js"
    },
    output:{
        // publicPath:__dirname+"/dist/",//js引用路径
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
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'./index.html',
            filename:'home.html',
            chunks:['home']
        }),
        new htmlWebpackPlugin({
            template:'./index.html',
            filename:'other.html',
            chunks:['other']
        })
    ]
}
