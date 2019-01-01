const path = require("path");

module.exports={
    mode:"development",
    entry:{
        // page:"./page.js",
        app:"./src/app.js",
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
                test:/\.css$/,
                use:[
                    // css处理为link标签
                    // {
                    //     loader: "style-loader/url",
                    //     options: {
                    //         singleton:true,//处理为单个style标签
                    //     }
                    //     // options: {
                    //     //     transform:"./css.tranform.js",//处理为单个style标签
                    //     // }
                    // },
                    // {
                    //     loader: "file-loader",
                    //     query:{
                    //         name:"[name]-[hash:5].[ext]" //这里img是存放打包后图片文件夹，结合publicPath来看就是/webBlog/build/img文件夹中，后边接的是打包后图片的命名方式。
                    //     },
                    // },

                    // css卸载和加载样式(use与unuse方法)
                    // {
                    //     // css处理为link标签
                    //     loader: "style-loader/useable",
                    //     options: {
                    //         singleton:true,//处理为单个style标签
                    //     }
                    // },
                    // {
                    //     loader: "css-loader",
                    //     options: {
                    //         minimize:true,//css代码压缩
                    //     }
                    // },

                    //页面加载css前的transform
                    {
                        loader: "style-loader",
                        options: {
                            transform:"./css.tranform.js",//处理为单个style标签
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            minimize:true,//css代码压缩
                        }
                    },
                ]
            }
        ]
    },
}
