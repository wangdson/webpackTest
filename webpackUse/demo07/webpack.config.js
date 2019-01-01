const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //w4不建议使用extract-text-webpack-plugin，建议使用mini-css-webpack-plugin

module.exports={
    mode:"development",
    entry:{
        // app:"./app.js",
        // lazyCss:"./lazyCss.js",
        change:"./change.js"
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
            // {
            //     test:/\.scss/,
            //     use:[
            //         {loader: "style-loader"},
            //         {
            //             loader: "css-loader",
            //             options: {
            //                 minimize:true
            //             }
            //         },
            //         {
            //             loader: "sass-loader"
            //         }
            //     ]
            // }
            {
                test:/\.css/,
                use:[
                    {
                        loader:"style-loader/useable"
                    },
                    {
                        loader:"css-loader",
                        options:{
                            minimize:true
                        }
                    }
                ]

            },
            {
                test:/\.scss$/,
                use:ExtractTextPlugin.extract({
                    fallback:{
                        loader:"style-loader/useable"
                    },
                    // fallback:{
                    //     loader:"style-loader",
                    // },
                    use:[
                        {
                            loader:"css-loader",
                            options:{
                                minimize:true
                            }
                        },
                        {
                            loader:"sass-loader"
                        }
                    ]
                })
                // use:[
                //     MiniCssExtractPlugin.loader,
                //     {loader:"style-loader"},
                //     {
                //         loader:"css-loader",
                //         options: {
                //             minimize:true
                //         }
                //     },
                //     {loader:"sass-loader"},
                // ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename:"[name].min.css",
            allChunks:false
        })
        // new MiniCssExtractPlugin({
        //     filename:"[name].min.css"
        // })
    ]
}
