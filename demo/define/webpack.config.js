const path = require("path");
let webpack = require("./node_modules/webpack");
const htmlWebpackPlugin = require("./node_modules/html-webpack-plugin");

module.exports = {
    mode:"development",
    entry:{
        home:"./src/index.js",
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
        new webpack.DefinePlugin({
            ENV: JSON.stringify("dev"),
            EXPRESSION: '1+1'
        }),
        new htmlWebpackPlugin({
            template:'./index.html',
            filename:'home.html',
            chunks:['home']
        }),
    ]
}
