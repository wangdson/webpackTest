const path = require("path");
let webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");

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
    devServer:{
        port: 8081,
        host: 'localhost',
        publicPath: "http://localhost/dist/",
        hot: true,
        proxy:{
            '/api': {
                target: 'http://localhost/3000',
                pathRewrite: {'^/api' : '/api'},
                changeOrigin: true,
            }
            // '/api':'http://localhost/3000'
        }
    },
    // resolve:{ // 解析第三方包 // module: [path.resolve('../../node_modules') ]
        
    // },
    watch:true,
    watchOptions:{
        poll: 100, // 每秒问我多少次
        aggregateTimeout: 500, // 防抖
        ignored:/node_modules/,
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
