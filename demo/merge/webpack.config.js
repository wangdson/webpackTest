const path = require("path");
let webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
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
                    loader: "babel-loader",
                    options:{
                        presets:['@babel/preset-env']
                    }
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
    ]
}
