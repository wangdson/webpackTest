const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
module.exports={
    mode:"production",
    entry:{
        app:"./app.js",
    },
    output: {
        publicPath: "./",
        filename: "[name].min.js",
        path:path.resolve(__dirname,"dist")
    },
    // devtool: "eval-source-map",//开发调试可用
    resolve: {
        alias: {
            jQuery$:path.resolve(__dirname,"assets/js/jquery.min.js")
        }
    },
    module: {
        rules: [
            {
                test:/\.html$/,
                use:[
                    {
                        loader: "html-loader",
                        options: {
                            attrs:["img:src"]
                        }
                    }
                ]
            },
            {
                test:/\.js$/,
                exclude:/(node_modules)/,
                use:{
                    loader: "babel-loader"
                }
            },
            {
                test:/\.(png|jpg|jpeg|gif)$/,
                use:[
                    {
                        loader: "url-loader",
                        options: {
                            name:"[name]-[hash:5].min.[ext]",
                            limit:10000,//size<20K
                            publicPath:'static/',
                            outputPath:'static/'
                        }
                    },
                    // {
                    //     loader: "img-loader",
                    //     options: {
                    //         plugins:[
                    //             require('imagemin-pngquant')({
                    //                 quality:80,
                    //                 floyd: 0.5,
                    //                 speed: 2
                    //             })
                    //         ]
                    //     }
                    // }
                ]
            },
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename:"index.html",
            template:"./index.html",
            chunks:["app"],
            minify: {
                // 压缩选项
                collapseWhitespace: true
            }
        })
    ]
}
