const path = require("path");

module.exports={
    mode:"development",
    entry:{
        // page:"./page.js",
        app:"./app.js",
    },
    output: {
        publicPath: "dist/",
        filename: "[name].min.js",
        path:path.resolve(__dirname,"dist")
    },
    devtool: "eval-source-map",//开发调试可用
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude:/(node_modules)/,
                use:{
                    loader: "babel-loader"
                }
            },
            {
                test:/\.scss$/,
                use:[
                    {
                        loader: "style-loader",// 将 JS 字符串生成为 style 节点
                    },
                    {
                        loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
                    },
                    {
                        loader: "sass-loader",// 将 Sass 编译成 CSS
                    },
                ]
            }
        ]
    },
}
